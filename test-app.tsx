import React from 'react';
import ReactDOM from 'react-dom/client';

// Minimal test to see if React renders
const TestApp = () => {
  return (
    <div style={{ padding: '20px', background: 'white' }}>
      <h1>Test App</h1>
      <p>If you see this, React is working.</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TestApp />);
}
