import { NextResponse } from "next/server";
import axios from "axios";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Invalid URL parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(url);
    const feedData = await parser.parseString(response.data);
    return NextResponse.json(feedData);
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return NextResponse.json(
      { error: "Error fetching RSS feed" },
      { status: 500 }
    );
  }
}
