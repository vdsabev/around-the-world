import React from 'react'

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { error }
  }

  state = {}

  render({ children } = this.props, { error } = this.state) {
    if (error) {
      return (
        <>
          <h1>An unexpected error has occurred!</h1>
          <details>
            <pre>{error.stack}</pre>
          </details>
        </>
      )
    }

    return children
  }
}

export default ErrorBoundary
