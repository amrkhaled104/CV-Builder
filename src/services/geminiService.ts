import { getAiKey } from "../utils/aiKeyStorage";
import { adaptJsonToCvData } from "../utils/schemaAdapter";
import type { CvSessionData } from "../utils/storage";

export type AiEnhanceResult = {
  improved: string | string[];
  tips: string[];
};

export type SectionType = "summary" | "experience" | "project" | "skills";

const SYSTEM_INSTRUCTION = `You are an elite Senior Technical Recruiter and FAANG Resume Coach strictly following Omar Shawky's Software Engineering Resume Guidelines and Google's XYZ Formula. Transform raw, informal, or non-English (e.g., Arabic) input into crisp, ATS-optimized US English resume content. RULES: 1. Remove all personal pronouns (I, me, my, we, our). 2. Use Google's XYZ Formula ('Accomplished [X] as measured by [Y] by doing [Z]') for experience and project bullets. 3. Start every bullet with a strong action verb (Engineered, Architected, Optimized, Automated, Reduced, Spearheaded, Refactored, Integrated). Never use weak openers like 'Worked on' or 'Responsible for'. 4. ZERO HALLUCINATION: Never invent fake percentages, metrics, or technologies not mentioned by the user. If metrics are missing, write a clean, strong bullet and add a brief suggestion in 'tips'. 5. Keep bullets concise (1–2 lines max) to fit a single-page CV. 6. Use standard ASCII punctuation, strict spacing after commas/periods, consistent trailing periods, and exact searchable tech keywords. 7. Section rules: 'summary' -> 2–3 focused lines; 'experience'/'project' -> array of 2–4 XYZ bullets; 'skills' -> categorized comma-separated groups. Return ONLY valid JSON with no markdown fences: { "improved": string | string[], "tips": string[] }`;

export async function callGeminiEnhancer({
  sectionType,
  rawContent,
  context,
  apiKey,
}: {
  sectionType: SectionType;
  rawContent: string;
  context?: string;
  apiKey?: string;
}): Promise<AiEnhanceResult> {
  const activeKey = (apiKey || getAiKey()).trim();

  if (!activeKey) {
    throw new Error(
      "Missing Gemini API Key. Please add your key in the AI Key settings.",
    );
  }

  const promptText = `Section: ${sectionType}
${context ? `Context/Role/Title: ${context}\n` : ""}
Raw User Input:
${rawContent.trim()}

Instructions: Rewrite the above raw input into professional, ATS-optimized resume content matching the system rules. Output strictly JSON.`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(activeKey)}`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });
  } catch {
    throw new Error(
      "Network connection failure. Check your internet connection and try again.",
    );
  }

  if (!response.ok) {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      throw new Error(
        "Invalid or unauthorized Gemini API key. Please check your key at Google AI Studio.",
      );
    }
    if (response.status === 429) {
      throw new Error(
        "Gemini API rate limit exceeded. Please wait a few seconds and try again.",
      );
    }
    throw new Error(
      `Gemini API request failed (${response.status}: ${response.statusText}).`,
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Unable to parse API response stream.");
  }

  const candidateText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  if (!candidateText) {
    throw new Error("Received an empty response from Gemini. Please try again.");
  }

  try {
    const parsed = JSON.parse(candidateText) as AiEnhanceResult;
    if (!parsed || typeof parsed !== "object" || !("improved" in parsed)) {
      throw new Error("Response schema did not match expected structure.");
    }

    return {
      improved: parsed.improved,
      tips: Array.isArray(parsed.tips) ? parsed.tips : [],
    };
  } catch {
    // If there were markdown fences accidentally
    const cleaned = candidateText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();
    try {
      const parsed = JSON.parse(cleaned) as AiEnhanceResult;
      return {
        improved: parsed.improved,
        tips: Array.isArray(parsed.tips) ? parsed.tips : [],
      };
    } catch {
      throw new Error("Failed to parse Gemini output as structured JSON.");
    }
  }
}

/**
 * Translates arbitrary non-standard resume JSON or plain text into standard CvSessionData using Gemini.
 */
export async function translateJsonWithGemini(
  rawContent: string,
  apiKey?: string,
): Promise<CvSessionData> {
  const activeKey = (apiKey || getAiKey()).trim();

  if (!activeKey) {
    throw new Error(
      "Missing Gemini API Key. Please add your key in the AI Key settings.",
    );
  }

  const promptText = `You are an expert CV Data Migration Specialist. The user uploaded raw resume data or non-standard JSON:
\`\`\`
${rawContent.slice(0, 15000)}
\`\`\`

Strictly map and transform the above data into this exact CV schema:
{
  "generalInfo": {
    "firstName": string,
    "lastName": string,
    "headline": string,
    "phone": string,
    "email": string,
    "location": string,
    "bio": string,
    "links": [ { "id": string, "title": string, "customTitle": string, "url": string } ]
  },
  "educationList": [
    {
      "id": string,
      "schoolName": string,
      "study": string,
      "place": string,
      "grade": string,
      "subTitle": string,
      "linkText": string,
      "linkUrl": string,
      "bullets": string,
      "durationType": "date",
      "startDate": string,
      "endDate": string,
      "customDuration": string,
      "isCurrent": boolean
    }
  ],
  "workList": [
    {
      "id": string,
      "companyName": string,
      "position": string,
      "responsibilities": string,
      "location": string,
      "companyDescription": string,
      "linkText": string,
      "linkUrl": string,
      "durationType": "date",
      "startDate": string,
      "endDate": string,
      "customDuration": string,
      "isCurrent": boolean
    }
  ],
  "projectList": [
    {
      "id": string,
      "title": string,
      "tagline": string,
      "description": string,
      "durationType": "date",
      "startDate": string,
      "endDate": string,
      "customDuration": string,
      "isCurrent": boolean,
      "links": [ { "id": string, "title": string, "customTitle": string, "url": string } ]
    }
  ],
  "skillList": [
    {
      "id": string,
      "category": string,
      "skills": [ { "id": string, "name": string } ]
    }
  ],
  "customSections": [],
  "sectionOrder": ["summary", "education", "experience", "projects", "skills"]
}

RULES:
1. Faithfully extract and map existing user data. Do not hallucinate or invent fake jobs or dates.
2. Join multiple bullet points or highlights with "\\n".
3. Return ONLY valid JSON matching this schema.`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(activeKey)}`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      }),
    });
  } catch {
    throw new Error("Network connection failure. Check your internet connection.");
  }

  if (!response.ok) {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      throw new Error("Invalid or unauthorized Gemini API key.");
    }
    if (response.status === 429) {
      throw new Error("Gemini API rate limit exceeded. Please wait a few seconds and try again.");
    }
    throw new Error(`Gemini translation request failed (${response.status}).`);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Unable to parse API response.");
  }

  const candidateText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  if (!candidateText) {
    throw new Error("Received an empty response from Gemini.");
  }

  const cleaned = candidateText
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse Gemini output as structured JSON.");
  }

  const adaptResult = adaptJsonToCvData(parsed);
  if (!adaptResult.success || !adaptResult.data) {
    throw new Error(adaptResult.error || "AI could not produce a valid CV structure.");
  }

  return adaptResult.data;
}
