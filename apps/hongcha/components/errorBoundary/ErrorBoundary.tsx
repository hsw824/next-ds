import React from 'react';
import FallbackComponent from './FallbackComponent';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  //componentDidCatch -> 에러 로그를 쌓는것이 아니기 때문에 사실 지금 이게 안되는거랑 큰 연관성은 없다.

  render() {
    if (this.state.hasError) {
      return <FallbackComponent error={this.state.error as Error} />;
    }
    return this.props.children;
  }
}
