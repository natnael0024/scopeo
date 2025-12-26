import { NextResponse } from "next/server";
import { isLowQualityInput } from "@/lib/validateInput";
import { ScopeSchema } from "@/lib/scopeSchema";



export async function POST(req: Request) {
  try {
    const { clientRequest } = await req.json();

    if (isLowQualityInput(clientRequest)) {
      return NextResponse.json({
        error: "LOW_QUALITY_INPUT",
        message:
          "The request is too vague or unclear to generate a reliable project scope.",
      }, { status: 400 });
    }

    if (!clientRequest) {
      return NextResponse.json(
        { error: "Missing clientRequest" },
        { status: 400 }
      );
    }


    //   const prompt = `
    // You are a senior product manager.
    // Analyze this client request and produce:
    // 1. Project summary
    // 2. Core features
    // 3. Timeline
    // 4. Cost estimate (low/medium/high)
    // 5. Risks / red flags
    // 6. Clarifying questions

    // Client request: "${clientRequest}"
    // `;

    // const prompt = `
    // You are a senior product manager.

    // Return ONLY valid JSON.
    // Do NOT include markdown.
    // Do NOT include explanations.
    // Do NOT wrap in backticks.

    // The JSON must strictly match this schema:

    // {
    //   "summary": string,
    //   "features": string[],
    //   "timeline": string,
    //   "costEstimate": "low" | "medium" | "high",
    //   "risks": [
    //     { "description": string, "severity": "low" | "medium" | "high" }
    //   ],
    //   "clarifyingQuestions": string[],
    //   "confidenceScore": number,
    //   "skills": {
    //     primary: string[];
    //     supporting: string[];
    //     optional: string[];
    //   }

    // }

    // Rules:
    // - summary must describe the project
    // - confidenceScore must be between 0 and 1
    // - risks must include at least one item
    // - clarifyingQuestions must include at least one question
    // - Set confidenceScore below 0.4 if the request lacks clear goals, features, or context
    // - Timeline must be at least 10 characters long
    
    // Client request:
    // """${clientRequest}"""
    // `;
    const prompt = `
      You are a senior product manager known for preventing scope creep and unrealistic delivery expectations.

      Your job is to CRITICALLY ANALYZE the client request, not just summarize it.

      Return ONLY valid JSON.
      Do NOT include markdown.
      Do NOT include explanations.
      Do NOT wrap in backticks.

      The JSON must strictly match this schema:

      {
        "summary": string,
        "mvpFeatures": string[],
        "futureFeatures": string[],
        "assumptions": string[],
        "outOfScope": string[],
        "timeline": string,
        "costEstimate": "low" | "medium" | "high",
        "risks": [
          { "description": string, "severity": "low" | "medium" | "high" }
        ],
        "clarifyingQuestions": string[],
        "confidenceScore": number,
        "skills": {
          "primary": string[],
          "supporting": string[],
          "optional": string[]
        }
      }

      Rules:
      - Be skeptical. If something is vague, CALL IT OUT.
      - Explicitly list assumptions you are making.
      - Explicitly list what is out of scope.
      - Do NOT invent features that were not requested.
      - Push back on unrealistic timelines or scope.
      - If mobile is mentioned, clarify whether this means responsive web or native apps.
      - If payments are mentioned, include compliance and refund considerations as risks.
      - If AI is mentioned, treat it as optional and high risk unless detailed requirements are provided.
      - Enforce zero contradictions between mvp features, assumptions, out-of-scope and clarifying questions

      Field rules:
      - summary must describe the project AND note major uncertainties
      - mvpFeatures must be limited to clearly implied MVP functionality
      - futureFeatures must include implied future functionality
      - assumptions must include at least 3 items if any ambiguity exists
      - outOfScope must include at least 3 items
      - risks must include at least one HIGH severity risk if payments, AI, or marketplaces are involved
      - clarifyingQuestions must include at least 5 items for marketplace products
      - confidenceScore must be between 0 and 1
      - Set confidenceScore below 0.5 if requirements, timelines, or success criteria are unclear
      - timeline must explain feasibility (not just duration) and be at least 20 characters long

      Client request:
      """${clientRequest}"""
      `;



    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
        //   "HTTP-Referer": "", 
        //   "X-Title": "<YOUR_SITE_NAME>", 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "tngtech/deepseek-r1t2-chimera:free",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

    console.log(response)

    const data = await response.json();
    console.log('AI RESPONSE:',data)

    const raw = data.choices[0].message.content;

    // let parsed;
    // try {
    //   parsed = JSON.parse(raw);
    // }  catch (error) {
    //   return NextResponse.json(
    //     { error: "Invalid JSON returned by AI" },
    //     { status: 500 }
    //   );
    // }
    // return NextResponse.json(parsed);
    let json;
    try {
      json = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }

    const result = ScopeSchema.safeParse(json);

    if (!result.success) {
      console.error("Zod validation error:", result.error.format());
    
      return NextResponse.json(
        {
          error: "AI response failed validation",
          details: result.error.errors.map(e => e.message),
        },
        { status: 500 }
      );
    }

return NextResponse.json(result.data);


  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}