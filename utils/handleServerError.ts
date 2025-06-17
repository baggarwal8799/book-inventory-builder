import { NextResponse } from "next/server";

export function handleServerError(error: unknown): NextResponse {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { error: "Internal Server Error. Please try again later." },
    { status: 500 }
  );
}
