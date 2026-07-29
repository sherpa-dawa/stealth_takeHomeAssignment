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
