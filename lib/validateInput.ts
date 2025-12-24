export function isLowQualityInput(text: string): boolean {
    const trimmed = text.trim();
  
    if (trimmed.length < 20) return true;
  
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount < 4) return true;
  
    const uniqueChars = new Set(trimmed).size;
    if (uniqueChars < 6) return true;
  
    return false;
  }
  