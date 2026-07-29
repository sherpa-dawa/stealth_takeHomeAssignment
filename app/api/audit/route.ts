import { NextRequest, NextResponse } from "next/server";
import {
  progressBreakdown,
  deadlines,
  activityItems,
  getClientData,
} from "@/features/audit-planning/constants/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shouldFail = searchParams.get("fail") === "true";
  const clientFilter = searchParams.get("client");

  if (shouldFail) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  // Get data based on client
  const { overview, areas } = getClientData(
    clientFilter || "ABC Manufacturing Ltd."
  );

  // Filter high-risk areas for this client
  const highRiskAreas = areas.filter((area) => area.risk === "High");

  return NextResponse.json({
    auditOverview: overview,
    auditAreas: areas,
    progressBreakdown,
    highRiskAreas,
    deadlines,
    activityItems,
  });
}
