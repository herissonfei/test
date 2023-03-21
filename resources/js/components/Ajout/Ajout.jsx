import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Card, Button, Space, Modal, Input, Form, Select , Col, Row, List} from "antd";
import "./Ajout.css"



export default function Ajout() {

    const [bouteilleSaq, setBouteilleSaq] = useState([]);
    const [vinSelectioné, setVinSelectioné] = useState([]);
    const [quantite, setQuantite] = useState([]);
    const [dateAchat, setDateAchat] = useState([]);
    
    useEffect(() => {
        axios.get("/getBouteillesSAQ").then((res) => {
            setBouteilleSaq(res.data);
        });
    }, []);


    const choisirVin = (elm) => {
        bouteilleSaq.forEach(bouteiile => {
            if(bouteiile.id == Number(elm.target.value)){
                setVinSelectioné(bouteiile)
            }
        })
    };

    const quantiteChange = (elm) => {
        setQuantite(Number(elm.target.value))
    };


    const dateAchatChange = (elm) => {
        //setDateAchat(Date(elm.target.value));
        setDateAchat(elm.target.value);
    };




    const ajouteBouteille = (btId, cellID, dateAj, quant) => {

        let objBouteille = {
            'bouteilles_id' : btId,
            'celliers_id'   : cellID,
            'data_achat'    : dateAj,
            'quantite'      : quant,
        }

        axios.post(`/ajouteBouteilleCellier/`,objBouteille).then((res) => {
           console.log(res);
         });
        
    };


    return (
        <div className="nouvelleBouteille" vertical layout>
            <Row gutter={[0, 16]}>
                
                <div>
                    <h2>Veuillez séléctionner </h2>
                    <p>
                        Nom 
                        <select data-id="" className="nom_bouteille" onChange={choisirVin}>
                            <option value="0"><i class="select-titre">Selectionnez le vin</i></option>
                            {bouteilleSaq.map((bouteiile) => (
                                <option value={bouteiile.id}>{bouteiile.nom}</option>
                                ) )}
                        </select>
                    </p>

                    <p>Pays : <b>{vinSelectioné.pays}</b></p>
                    <p>Millesime : <input name="millesime" value={vinSelectioné.millesime}/></p>
                    <p>Quantite : <input name="quantite" placeholder="0" type="number" min="1" step="1" onChange={quantiteChange}/></p>
                    <p>Date achat : <input name="date_achat" type="date" onChange={dateAchatChange}/></p>
                    <p>Prix : {vinSelectioné.prix} $</p>
                    <p>Notes <input name="notes" value={vinSelectioné.note}/></p>
                    <p><input type="hidden" name="cellier_id" value="1"/> </p>
                    <Button
                        type="primary"
                        name="ajouterBouteilleCellier"
                        onClick={() => { ajouteBouteille(vinSelectioné.id, 1, dateAchat ,quantite );}}

                    >Ajouter la bouteille</Button>
                </div>
            </Row>
            <>
                {vinSelectioné.id ? <div>
                    <img src="https://cdn.shopify.com/s/files/1/1057/2942/products/3-frontenac_720x.jpg?v=1631750927" alt="Bouteille" />
                    <img src="/projet2/public/image/vin/01.jpg" alt=""/>
                    <h3>Description:</h3>
                    <p>{vinSelectioné.description}</p>
                </div>: <p>Choisissez une bouteiile S.V.P</p>}
            </>
        </div>
    );
}

if (document.getElementById("ajout")) {
    const Index = ReactDOM.createRoot(document.getElementById("ajout"));

    Index.render(
        <React.StrictMode>
            <Ajout />
        </React.StrictMode>
    );
    
}
