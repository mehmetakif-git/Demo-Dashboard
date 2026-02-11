import React from 'react';
import i18next from 'i18next';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
              <AlertOctagon className="h-10 w-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {i18next.t('error.general', { ns: 'common' })}
            </h2>
            <p className="text-text-secondary mb-6">
              {i18next.t('error.tryAgain', { ns: 'common' })}
            </p>
            {this.state.error && (
              <div className="mb-6 p-4 rounded-lg bg-white/[0.05] border border-white/[0.08] text-left">
                <p className="text-xs text-text-muted font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white hover:bg-border-hover transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                {i18next.t('buttons.retry', { ns: 'common' })}
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-background-primary hover:opacity-90 transition-colors"
              >
                <Home className="h-4 w-4" />
                {i18next.t('buttons.goHome', { ns: 'common' })}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
