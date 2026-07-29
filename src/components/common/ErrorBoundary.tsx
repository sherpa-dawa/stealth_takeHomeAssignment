"use client";

import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary
 * Catches React render-time errors and displays a fallback UI
 * Different from try/catch — this catches errors in child component render()
 */
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to observability service (Sentry) in production
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-neutral-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
              <h1 className="text-lg font-bold text-red-600 mb-2">
                Something went wrong
              </h1>
              <p className="text-sm text-neutral-600 mb-4">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Reload page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
