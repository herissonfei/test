import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Table, Card, Button, Space, Modal, Input, Form, Select , Col, Row, List} from "antd";
import "./Cellier.css"
import { forEach } from "lodash";

const cellierDiv = document.getElementById('cellier');
const userPrivilege = cellierDiv.getAttribute('data-set-privilege');
const userId = cellierDiv.getAttribute('data-set-userId');
let codePrivilege = 0;
let unCellier = [];
let nomPlaceholder = "Au moins trois caractères"


export default function Cellier() {

    const [celliers , setCelliers] = useState([]);
    const [nomCellier, setNomCellier] = useState('');
    
    if(userPrivilege === "usager") {
        useEffect(() => {
            axios.get(`/getCelliersUsager/${userId}`).then((res) => {
                console.log(res.data);
                setCelliers(res.data);
            });
        }, []);
     
    }

    else if(userPrivilege === "admin") {
        codePrivilege = 1;
        useEffect(() => {
            axios.get('/getTousCelliers').then((res) => {
                setCelliers(res.data);
            });
        }, []);
    }
    
    const voirCellier = (idCellier) => {
        axios.get(`/getCellier/${idCellier}`).then((res) => {
            console.log(res.data);
            unCellier = res.data;
        });
    }

    const ajouteUnCellier= (userId) => {
        let codeErr = 0;
        console.log(codeErr);

        if(nomCellier == "") codeErr = 1;
        if(nomCellier != "") {
            const nomRegex = /^[A-Za-z0-9\s\-éèêëàâäôöûüùçîïœæÿ]{3,}$/;
            celliers.forEach(cellier =>{
                if(cellier.user_id == userId) {
                    if(cellier.nom == nomCellier) {
                        codeErr = 2;
                        console.log("Le nom est répété");
                    }
                    else if (!nomRegex.test(nomCellier)) codeErr = 3;
                }

            });
            if (!codeErr) {
                let objCellier = {
                    'nomCellier' : nomCellier,
                    'userId'     : userId
                }
                        
                axios.post(`/ajouteCellier/`,objCellier).then((res) => {
                    console.log(res);
                });
            }
        }
        if(!codeErr) console.log("Khata");
        console.log(codeErr);
        
    }
    
    
   
    return (
        <>
        <div className="divAjoutCellier">
            <input type="text" placeholder={nomPlaceholder} onChange={(event) => setNomCellier(event.target.value)} />
            
            <Button type="primary" name="ajouterBouteilleCellier" onClick={() => { ajouteUnCellier(userId); }}>Ajouter un cellier</Button>
        </div>
        <table className="tableCelliers">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Nom du cellier</th>
                    {codePrivilege ? (
                        <th>Nom d'usager</th>
                    ):(<></>)}
                    <th>Détail</th>
                </tr>
            </thead>
            <tbody>
                {celliers.map((item, index) => (
                    <tr>
                        <td key={index}>{index+1}</td>
                        <td key={index}>{item.nom}</td>
                        {codePrivilege ? (
                        <td key={index}>{item.name}</td>
                        ):(<></>)}

                        <td>
                            <Button
                                type="link"
                                name="voirCellier"
                                onClick={() => { voirCellier(item.id);}}
                            >Voir le cellier</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );

}

if (document.getElementById("cellier")) {
    const Index = ReactDOM.createRoot(document.getElementById("cellier"));

    Index.render(
        <React.StrictMode>
            <Cellier/>
        </React.StrictMode>
    );
    
}
