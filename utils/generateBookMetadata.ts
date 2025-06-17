export const generateBookMetadata = async (
  base64Image: string,
  apiKey: string
): Promise<{
  rawText: string;
  parsed: {
    title?: string;
    author?: string;
    grade?: string;
    subject?: string;
    series?: string;
  };
}> => {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Extract the following details from the book cover image: 
                    {
            "title": string,
            "author": string,
            "grade": string | null,
            "subject": string | null,
            "series": string | null
          }
                Respond with only a plain JSON string. Do not wrap in markdown or code blocks. Do not include any explanation.`,
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(",")[1], // Remove base64 prefix
            },
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let parsed = {};
    try {
      const cleanedText = text
        .replace(/^```json\s*/, "") // remove ```json
        .replace(/^```\s*/, "") // or just ```
        .replace(/```$/, "") // remove trailing ```
        .trim();
      parsed = JSON.parse(cleanedText);
    } catch {
      throw new Error("❗ Could not parse Gemini response as JSON");
    }

    return {
      rawText: text,
      parsed,
    };
  } catch (err) {
    throw err;
  }
};
