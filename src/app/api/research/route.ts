import { NextRequest, NextResponse } from "next/server";
import { searchYTJ } from "@/lib/services/ytj";
import { searchPRH } from "@/lib/services/prh";
import { searchNews } from "@/lib/services/news";

export async function POST(request: NextRequest) {
  console.log("=== Research API called ===");

  try {
    const body = await request.json();
    const { companyName } = body;

    console.log("Company name:", companyName);

    if (!companyName || typeof companyName !== "string") {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    // Search YTJ
    let ytjData = null;
    let ytjError = null;
    try {
      console.log("Starting YTJ search...");
      ytjData = await searchYTJ(companyName);
      console.log("YTJ result:", ytjData ? "Found" : "Not found");
    } catch (error) {
      console.error("YTJ error:", error);
      ytjError = error instanceof Error ? error.message : "YTJ-haku epäonnistui";
    }

    // Search news (always try)
    let newsData = null;
    let newsError = null;
    try {
      console.log("Starting news search...");
      newsData = await searchNews(companyName);
      console.log("News result:", newsData?.items?.length || 0, "items");
    } catch (error) {
      console.error("News error:", error);
      newsError = error instanceof Error ? error.message : "Uutishaku epäonnistui";
    }

    // Search PRH if YTJ found a company
    let prhData = null;
    let prhError = null;
    if (ytjData?.businessId) {
      try {
        console.log("Starting PRH search for:", ytjData.businessId);
        prhData = await searchPRH(ytjData.businessId);
        console.log("PRH result:", prhData?.dataAvailable ? "Data available" : "No data");
      } catch (error) {
        console.error("PRH error:", error);
        prhError = error instanceof Error ? error.message : "PRH-haku epäonnistui";
      }
    }

    const response = {
      ytj: ytjData,
      prh: prhData,
      news: newsData,
      errors: {
        ytj: ytjError,
        prh: prhError,
        news: newsError,
      },
    };

    console.log("=== Research API response ===");
    console.log("YTJ:", ytjData ? "OK" : ytjError || "Not found");
    console.log("PRH:", prhData ? "OK" : prhError || "N/A");
    console.log("News:", newsData ? "OK" : newsError || "N/A");

    return NextResponse.json(response);
  } catch (error) {
    console.error("Research API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
