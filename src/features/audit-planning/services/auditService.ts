/**
 * Audit Service
 * Single entry point for all audit-related API calls
 * Encapsulates mock data logic, error handling, and latency simulation
 */

import {
  AuditOverview,
  AuditArea,
  ProgressBreakdown,
  Deadline,
  ActivityItem,
} from "@/features/audit-planning/types";
import { getClientData } from "../constants/mockData";
import { MOCK_CONFIG } from "../constants";

interface ApiResponse<T> {
  data: T;
  timestamp: string;
}

// Generic request helper with error handling
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  // Simulate network latency
  await new Promise((resolve) =>
    setTimeout(resolve, MOCK_CONFIG.FETCH_LATENCY_MS)
  );

  // Simulate random failures (for testing error handling)
  if (Math.random() < MOCK_CONFIG.FETCH_ERROR_RATE) {
    throw new Error(`Network error: ${url}`);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`);
    }
    const json: ApiResponse<T> = await response.json();
    return json.data;
  } catch (error) {
    console.error(`Request failed: ${url}`, error);
    throw error;
  }
}

export const auditService = {
  /**
   * Fetch all audits for a client
   */
  async getAudits(client: string): Promise<AuditArea[]> {
    // In a real app, this would call: GET /api/v1/audits?client=:client
    // For now, we use mock data
    const { auditAreas } = getClientData(client);
    return request<AuditArea[]>(
      `/api/audit?client=${encodeURIComponent(client)}`
    ).catch(() => auditAreas);
  },

  /**
   * Fetch audit overview for a client
   */
  async getOverview(client: string): Promise<AuditOverview> {
    const { overview } = getClientData(client);
    // In a real app: GET /api/v1/audits/overview?client=:client
    return request<AuditOverview>(
      `/api/audit?client=${encodeURIComponent(client)}`
    ).catch(() => overview);
  },

  /**
   * Fetch progress breakdown for a client
   */
  async getProgress(): Promise<ProgressBreakdown> {
    return {
      planning: 15,
      evidence: 58,
      review: 27,
    };
  },

  /**
   * Fetch high-risk areas for a client
   */
  async getHighRiskAreas(client: string): Promise<AuditArea[]> {
    const { highRiskAreas } = getClientData(client);
    // In a real app: GET /api/v1/audits/high-risk?client=:client
    return request<AuditArea[]>(
      `/api/audit?client=${encodeURIComponent(client)}`
    ).catch(() => highRiskAreas);
  },

  /**
   * Fetch upcoming deadlines for a client
   */
  async getDeadlines(): Promise<Deadline[]> {
    // In a real app: GET /api/v1/deadlines?client=:client
    const mockDeadlines: Deadline[] = [
      {
        id: 1,
        title: "Revenue Planning",
        date: "2026-08-02",
        daysRemaining: 4,
      },
      {
        id: 2,
        title: "Inventory Review",
        date: "2026-08-04",
        daysRemaining: 6,
      },
      {
        id: 3,
        title: "Cash Confirmation",
        date: "2026-08-06",
        daysRemaining: 8,
      },
    ];
    return mockDeadlines;
  },

  /**
   * Fetch recent activity for a client
   */
  async getActivity(): Promise<ActivityItem[]> {
    return [];
  },

  /**
   * Update audit area status
   * In a real app: PATCH /api/v1/audits/:id
   */
  async updateAuditStatus(): Promise<AuditArea> {
    await new Promise((resolve) =>
      setTimeout(resolve, MOCK_CONFIG.FETCH_LATENCY_MS)
    );
    // In real app: would accept { areaId, status, client } and persist changes
    return {} as AuditArea;
  },

  /**
   * Assign auditor to area
   * In a real app: POST /api/v1/audits/:id/assign
   */
  async assignAuditor(): Promise<AuditArea> {
    await new Promise((resolve) =>
      setTimeout(resolve, MOCK_CONFIG.FETCH_LATENCY_MS)
    );
    // In real app: would accept { areaId, auditorId, client } and persist changes
    return {} as AuditArea;
  },
};

export default auditService;
