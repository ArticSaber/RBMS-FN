import React from "react";

function error405() {
  return (
    <div className="app-container">
      <div className="app-content">
        <h1>405</h1>
        <h2>Method Not Allowed</h2>
        <p>
          The request method is not supported by the server and cannot be
          handled. The only methods that servers are required to support (and
          therefore that must not return this code) are GET and HEAD.
        </p>
      </div>
    </div>
  );
}

export default error405;