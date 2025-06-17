import { db } from "@/entities/db/connection";
import { addBook } from "@/entities/queries/add-book";
import { errorLogger } from "@/lib/logger";
import { handleServerError } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, author, grade, subject, series } = await req.json();

    const result = await db.query(addBook, [
      title,
      author,
      grade || null,
      subject || null,
      series || null,
    ]);

    return NextResponse.json({
      success: true,
      message: "Book added to inventory",
    });
  } catch (error: any) {
    errorLogger.customError(error, "Error fetching books from DB", "error");
    return handleServerError(error);
  }
}
