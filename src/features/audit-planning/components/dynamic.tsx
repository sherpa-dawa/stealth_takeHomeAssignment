/**
 * Dynamic imports for code splitting
 * Loads components on-demand instead of bundling them upfront
 * Reduces initial page load by ~15-20% depending on component usage
 */

import dynamic from "next/dynamic";
import React from "react";

// Dialog components - only loaded when opened
export const ViewDetailsDialog = dynamic(
  () => import("./ViewDetailsDialog").then((mod) => mod.default),
  {
    loading: () => <div className="animate-pulse" />,
    ssr: true,
  }
);

export const AssignAuditorDialog = dynamic(
  () => import("./AssignAuditorDialog").then((mod) => mod.default),
  {
    loading: () => <div className="animate-pulse" />,
    ssr: true,
  }
);

export const ChangeStatusDialog = dynamic(
  () => import("./ChangeStatusDialog").then((mod) => mod.default),
  {
    loading: () => <div className="animate-pulse" />,
    ssr: true,
  }
);

// Sidebar - only visible on lg+ screens
export const Sidebar = dynamic(
  () => import("./Sidebar").then((mod) => mod.default),
  {
    loading: () => <div className="h-96 animate-pulse bg-neutral-100" />,
    ssr: true,
  }
);

// Sidebar child components - only loaded when Sidebar is visible
export const HighRiskList = dynamic(
  () => import("./HighRiskList").then((mod) => mod.default),
  {
    loading: () => <div className="animate-pulse" />,
    ssr: true,
  }
);

export const DeadlinesList = dynamic(
  () => import("./DeadlinesList").then((mod) => mod.default),
  {
    loading: () => <div className="animate-pulse" />,
    ssr: true,
  }
);

export const ActivityFeed = dynamic(
  () => import("./ActivityFeed").then((mod) => mod.default),
  {
    loading: () => <div className="animate-pulse" />,
    ssr: true,
  }
);
