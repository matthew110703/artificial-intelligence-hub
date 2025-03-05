import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center p-4">
          <span className="font-primary text-4xl font-black">500</span>
          <h1 className="font-primary text-xl font-bold lg:text-2xl">
            Internal Server Error
          </h1>
          <p>{this.state.error.toString()}</p>
          <p className="text-sm lg:text-base">
            Please refresh the page or contact the administrator if the problem
            persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
