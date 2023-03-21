import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Button, Table, Modal, Space, Form, Input, Col, Row} from "antd";
import { 
    SearchOutlined,
    DeleteOutlined,
    EditOutlined, } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./Cellier.css";

// import '../theme.less'; // Import the theme file

export default function Cellier() {
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();
    const [modalAjouteBoutteilAuCellier, setModalAjouteBoutteilAuCellier] = useState(false);
    const [modalSupprimeBoutteilCellier, setModalSupprimeBoutteilCellier] = useState(false);
    const ajouteBoutteilAuCeliierForm = useRef(null);
    const [bouteilleSaq, setBouteilleSaq] = useState([]);
    const [boutSelectione, setBoutSelectione] = useState([]);

    
    useEffect(() => {
        axios.get("/getBouteillesSAQ").then((res) => {
            setBouteilleSaq(res.data);
        });
    }, []);


    const choisirVin = (elm) => {
        bouteilleSaq.forEach(bouteiile => {
            if(bouteiile.id == Number(elm.target.value)){
                setBoutSelectione(bouteiile)
            }
        })
    };

    useEffect(() => {
        // récupérer les bouteilles dans le cellier spécial
        axios.get(`/getCeillerBouteille/${id}`).then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, []);

    // Faire la recherche
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
            style={{
            padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
                marginBottom: 8,
                display: 'block',
            }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                width: 90,
                }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                width: 90,
                }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                confirm({
                    closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
                }}
            >
                Filter
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
            >
                close
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => (
        <SearchOutlined
            style={{
            color: filtered ? '#1890ff' : undefined,
            }}
        />
        ),
        onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
            highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
    });


  
    const columns = [
        {
            title: "Nom",
            dataIndex: "nom",
            key: 'nom',
            width: '30%',
            ...getColumnSearchProps('nom'),
            sorter: (a, b) => a.nom.localeCompare(b.nom),
        },
        {
            title: "Quantité",
            dataIndex: "quantite",
            key: 'quantite',
            width: '20%',
            ...getColumnSearchProps('quantite'),
            sorter: {
                compare: (a, b) => a.quantite - b.quantite,
            },
        },
        {
            title: "Pays",
            dataIndex: "pays",
            key: 'pays',
            width: '20%',
            ...getColumnSearchProps('pays'),
            sorter: (a, b) => a.pays.localeCompare(b.pays),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: 'type',
            width: '20%',
            ...getColumnSearchProps('type'),
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Prix",
            dataIndex: "prix",
            sorter: {
                compare: (a, b) => a.prix - b.prix,
            },
        },
        {
            title: "Fonctionnalité",
            render: (item) => {
                const supprimerBouteilleCellier = (idBouteille) => {
                    console.log("Rah",idBouteille);
                    confirm({
                        title: "Voulez-vous supprimer ce cellier ?",
                        icon: <ExclamationCircleFilled />,
                        onOk() {
                            deleteMethod(idBouteille);
                        },
                        onCancel() {},
                    });
                };
                const deleteMethod = (idBouteille) => {
                    // console.log(cellier);
            
                    axios.delete(`/supprimerBouteille/${idBouteille}`).then((res) => {
                        // Récupérer les données, actualiser la page
                        console.log(res.data);
                        axios.get("/getListeBouteilleCellier").then((res) => {
                            setData(res.data);
                        });
                    });
                };
                return (
                    <div>
                        <Button
                            className="userBtn"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => supprimerBouteilleCellier(item.id)}
                        ></Button>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => handleUpdate(item)}
                        ></Button>
                    </div>
                );
            },
        }
        
    ];

    const ajouterBoutteilAuCeliierFormOk = () => {

        ajouteBoutteilAuCeliierForm.current
             .validateFields()
             .then((value) => {
                console.log(value);

                let objBouteille = {
                    'bouteilles_id' : boutSelectione.id,
                    'celliers_id'   : id,
                    'data_achat'    : value.dateAchat,
                    'quantite'      : value.quantite
                }
                axios.post(`/ajouteBouteilleCellier/`,objBouteille).then((res) => {
                     console.log(res);   
                }).then((res) => {
                   axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                            setData(res.data);
                        });
                    });
            })
            setModalAjouteBoutteilAuCellier(false);
    };

    return (
        // <div style={{ width: "80%", margin: "auto" }}>
        <div>
            <div className="button-right">
                <span></span>
                <Button  type="primary" ghost>Retouner</Button>
            </div>
            <Table columns={columns} dataSource={data} />
            <div className="button-middle">
                <Button type="primary"
                    onClick={() =>
                        setModalAjouteBoutteilAuCellier(id)
                    }
                >
                Ajouter une nouvelle bouteil</Button>
            </div>
        

                {/* modal ajouter un boutteil au cellier */}
                <Modal
                open={modalAjouteBoutteilAuCellier}
                title= "Ajouter une nouvelle bouteil au cellier"
                okText="Ajouter"
                cancelText="Annuler"
                onOk={() => ajouterBoutteilAuCeliierFormOk()}
                onCancel={() => {
                    setModalAjouteBoutteilAuCellier(false);
                }}
            >
                {/* Rechercher l'utilisation de useRef */}
                <Form ref={ajouteBoutteilAuCeliierForm} layout="vertical">
                    <p>Séléctionnez une bouteiile : 
                        <select data-id="" className="nom_bouteille" onChange={choisirVin}>
                            <option value="0"><i class="select-titre">Selectionnez le vin</i></option>
                            {bouteilleSaq.map((bouteiile) => (
                                <option value={bouteiile.id}>{bouteiile.nom}</option>
                                ) )}
                        </select>
                    </p>
                    <div className="elmFormBoutteilCellier">
                        <Form.Item
                            name="quantite"
                            label="Quantite"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Veuillez entrer la quantité !",
                                },
                            ]}
                        >
                            <Input type="number" min="1" step="1"/>
                        </Form.Item>
                    </div>
                    <div className="elmFormBoutteilCellier">
                        <Form.Item
                            name="dateAchat"
                            label="Date d'achat"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Veuillez entrer la date d'achat !",
                                },
                            ]}
                        >
                            <Input type="date"/>

                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
        
    );
}

if (document.getElementById("cellier")) {
    const Index = ReactDOM.createRoot(document.getElementById("cellier"));

    Index.render(
        <React.StrictMode>
            <Cellier />
        </React.StrictMode>
    );
}
