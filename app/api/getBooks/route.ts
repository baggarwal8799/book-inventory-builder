import { NextResponse } from "next/server";
import { db } from "@/entities/db/connection";
import { getBook } from "@/entities/queries/getBooks";
import { errorLogger } from "@/lib/logger"; // ✅ Correct usage
import { handleServerError } from "@/utils";

export async function GET() {
  try {
    const [rows] = await db.query(getBook);
    return NextResponse.json({ data: rows });
  } catch (error: any) {
    errorLogger.customError(error, "Error fetching books from DB", "error");
    return handleServerError(error);
  }
}
