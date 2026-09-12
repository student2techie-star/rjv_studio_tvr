// src/components/common/ErrorBoundary.jsx
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-brand-50 px-6 text-center">
          <p className="eyebrow text-brand-400">Something went wrong</p>
          <h1 className="text-section !text-brand-900">
            A glitch interrupted the page.
          </h1>
          <p className="text-body max-w-md text-brand-700">
            Your photos are safe. Reload to keep going.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="btn-dark"
            >
              Try again
            </button>
            <Link to="/" className="btn-primary">
              Go to Home
            </Link>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}