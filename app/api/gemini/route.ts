import { errorLogger } from "@/lib/logger";
import { generateBookMetadata, handleServerError } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { image } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!image || !apiKey) {
    return NextResponse.json(
      { error: "Missing image data or API key." },
      { status: 400 }
    );
  }

  const useMockData = false; // Set true to bypass Gemini for testing

  if (useMockData) {
    const parsed = {
      title: "Harry Potter and the Goblet of Fire",
      author: "J.K. Rowling",
      grade: null,
      subject: "Fantasy",
      series: "Harry Potter",
    };

    return NextResponse.json({ parsed });
  }

  try {
    const { rawText, parsed } = await generateBookMetadata(image, apiKey);
    return NextResponse.json({ parsed, rawText });
  } catch (error) {
    errorLogger.customError(error, "Error fetching books from DB", "error");
    return handleServerError(error);
  }
}
