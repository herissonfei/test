import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

export default function Entete() {
    const [admin, setadmin] = useState(false);

    useEffect(() => {
        axios.get("/verificationUser").then((res) => {
            console.log(res.data);
            if (res.data == "admin") {
                setadmin(true);
            }
        });
    }, []);
    return (
        <div>
            <h1>Un petit verre de vino ?</h1>
            <nav>
                <ul>
                    {admin && (
                        <li>
                            <a href="/listeUsager">Liste d'utilisateur</a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

if (document.getElementById("entete")) {
    const Index = ReactDOM.createRoot(document.getElementById("entete"));

    Index.render(
        <React.StrictMode>
            <Entete />
        </React.StrictMode>
    );
}
