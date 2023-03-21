import React from "react";
import ReactDOM from "react-dom/client";
import { Link, Router } from "react-router-dom";

// import { useParams } from "react-router-dom";
export default function Test() {
    return <div>Test</div>;
}

if (document.getElementById("test")) {
    const Index = ReactDOM.createRoot(document.getElementById("test"));

    Index.render(
        
        <React.StrictMode>
            <Test />
        </React.StrictMode>
    );
}
