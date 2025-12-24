import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/splitOutput.ts
export interface Section {
  title: string;
  content: string;
}

export function splitSections(output: string): Section[] {
  const regex = /### \d+\.\s\*\*(.*?)\*\*\s+([\s\S]*?)(?=### \d+\.|\Z)/g;
  const sections: Section[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(output)) !== null) {
    const [, title, content] = match;
    sections.push({ title: title.trim(), content: content.trim() });
  }

  return sections;
}
