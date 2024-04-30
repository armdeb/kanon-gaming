import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  renderErrorContent() {
    // on dev, display the stack trace
    if (process.env.NODE_ENV === 'development') {
      return (
        <details className="whitespace-pre-wrap">
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.error?.stack}
        </details>
      );
    }
    // on prod, display a user-friendly message
    return (
      <p>
        Sorry, something went wrong. Our team has been notified, please click here to fill out a report.
      </p>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="px-4 py-8 text-center bg-white shadow-lg rounded-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Oops! Something went wrong.</h2>
            {this.renderErrorContent()}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
