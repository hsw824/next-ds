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
    //shouldHandleError랑 shouldRethrow는 같은 역할이니까 사실 하나만 있어도 될것같다.
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
  //componentDidCatch -> 에러 로그를 쌓는것이 아니기 때문에 사실 지금 이게 안되는거랑 큰 연관성은 없다.

  render() {
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
