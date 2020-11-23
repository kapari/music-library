import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: null
  }

  static getDerivedStateFromError(error) {
    return { error: error }
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return <p>Something went wrong on our end. Check the console or refresh the page.</p>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
