import { Component } from "react";
// import '../../styles/trackorder.css'
// import '../pages/error.css'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
    console.log("logging", error, errorInfo);
  }

  render() {
    const refreshPage = () => {
      window.location.reload();
    };

    if (this.state.hasError) {
      return (
        <>
          <div className="error_container">
            <h1>
              Something's <br />
              Wrong ☹
            </h1>
            <button onClick={refreshPage}>Click to Reload</button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
