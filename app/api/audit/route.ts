import { NextRequest, NextResponse } from "next/server";
import {
  auditOverview,
  auditAreas,
  progressBreakdown,
  highRiskAreas,
  deadlines,
  activityItems,
} from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shouldFail = searchParams.get("fail") === "true";

  // Simulate artificial delay (600-1200ms)
  const delay = Math.random() * 600 + 600;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (shouldFail) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    auditOverview,
    auditAreas,
    progressBreakdown,
    highRiskAreas,
    deadlines,
    activityItems,
  });
}
