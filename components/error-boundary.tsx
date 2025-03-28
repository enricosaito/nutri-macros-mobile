import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, Button } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: "",
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
      errorInfo: error.toString(),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      errorInfo: errorInfo.componentStack || error.toString(),
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: "" });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Something went wrong.</Text>
          <Text style={{ marginBottom: 20 }}>{this.state.error?.toString()}</Text>
          <Text style={{ marginBottom: 20, fontSize: 12 }}>{this.state.errorInfo}</Text>
          <Button title="Try Again" onPress={this.resetError} />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
