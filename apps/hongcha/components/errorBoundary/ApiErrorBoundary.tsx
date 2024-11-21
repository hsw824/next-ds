import React from 'react';

import { AuthError } from 'models/CustomErrorClass';

interface ApiErrorBoundaryState {
  shouldHandleError: boolean;
  shouldRethrow: boolean;
  error: Error | null;
}
interface PropsType {
  children: React.ReactNode;
}

export class ApiErrorBoundary extends React.Component<PropsType, ApiErrorBoundaryState> {
  state = {
    shouldHandleError: false,
    shouldRethrow: false,
    error: null,
  };
  static getDerivedStateFromError(error: Error) {
    if (error instanceof AuthError) {
      return {
        shouldHandleError: true,
        shouldRethrow: false,
        error,
      };
    }
    return {
      shouldHandleError: false,
      shouldRethrow: true,
      error,
    };
  }

  render() {
    console.log('this', this.state);
    if (this.state.shouldRethrow) {
      throw this.state.error;
    }

    if (!this.state.shouldHandleError) {
      return this.props.children;
    }

    if (this.state.error && (this.state.error as Error) instanceof AuthError) {
      return <div>auth 오류</div>;
    }

    return this.props.children;
  }
}
