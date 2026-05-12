const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

interface GroqChatCompletion {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export interface GeneratedAgendaItem {
  title: string;
  duration: number;
  description: string;
}

const getGroqApiKey = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY. Add it to your environment before using AI features.");
  }

  return apiKey;
};

const createChatCompletion = async (
  messages: Array<{ role: "system" | "user"; content: string }>,
  options?: { json?: boolean }
) => {
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getGroqApiKey()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.4,
      ...(options?.json ? { response_format: { type: "json_object" } } : {})
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Groq request failed (${response.status}): ${message}`);
  }

  const data = (await response.json()) as GroqChatCompletion;
  return data.choices?.[0]?.message?.content?.trim() || "";
};

export const generateAgenda = async (
  meetingTitle: string,
  context: string,
  duration: number
): Promise<GeneratedAgendaItem[]> => {
  try {
    const content = await createChatCompletion(
      [
        {
          role: "system",
          content:
            "You are an expert meeting facilitator. Return only valid JSON that matches the requested schema."
        },
        {
          role: "user",
          content: `Generate a structured agenda for the following meeting.

Meeting Title: ${meetingTitle}
Meeting Goal/Context: ${context}
Total Duration: ${duration} minutes

Create a focused agenda with clear objectives, discussion points, and time allocations.

Return JSON in this exact shape:
{
  "agenda": [
    {
      "title": "string",
      "duration": 10,
      "description": "string"
    }
  ]
}`
        }
      ],
      { json: true }
    );

    const result = JSON.parse(content || "{}") as { agenda?: GeneratedAgendaItem[] };
    return Array.isArray(result.agenda) ? result.agenda : [];
  } catch (error) {
    console.error("Error generating agenda:", error);
    throw error;
  }
};

export const analyzeAgenda = async (meetingTitle: string, agendaItems: any[]): Promise<string> => {
  try {
    const agendaText = agendaItems
      .map(i => `- ${i.title} (${i.duration}m): ${i.description || "No description"}`)
      .join("\n");

    const content = await createChatCompletion([
      {
        role: "system",
        content: "You are an expert meeting facilitator. Keep feedback concise and actionable."
      },
      {
        role: "user",
        content: `Review the following meeting agenda and suggest 3 specific improvements or missing topics that would make the meeting more effective.

Meeting Title: ${meetingTitle}
Current Agenda:
${agendaText}

Provide your feedback in short, actionable bullet points.`
      }
    ]);

    return content || "No suggestions at this time.";
  } catch (error) {
    console.error("Error analyzing agenda:", error);
    throw error;
  }
};
