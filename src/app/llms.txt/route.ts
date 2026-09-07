import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "llms.txt");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return new NextResponse("Aavya Boutique - Modern Women's Fashion, Kochi, Kerala. WhatsApp: +918594031993", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
