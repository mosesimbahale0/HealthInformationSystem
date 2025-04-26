import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || "Something went wrong.";

      return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-8  bg-primary text-text2">
          <img alt="Logo" src="/logo-dark.png" className="h-20 w-20 mb-4" />
          <h1 className="text-xl text-red-500 mb-2">We encountered an error</h1>
          <p className="text-sm mb-4">{errorMessage}</p>
          <div className="flex gap-4">
            <a href="/" className="btn btn-primary">Go Home</a>
            <a href="/support" className="btn btn-secondary">Contact Support</a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
