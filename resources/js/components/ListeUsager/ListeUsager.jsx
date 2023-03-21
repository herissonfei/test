import React, { useEffect, useState, useRef } from "react";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import ReactDOM from "react-dom/client";
import { Table, Button, Modal, Switch } from "antd";
// import { Space, Table, Tag } from "antd";
import "./ListeUsager.css";

export default function ListeUsager() {
    const [user, setuser] = useState([]);

    useEffect(() => {
        // obtenir les celliers personnels d'utilisateur connecté
        axios.get("/getTousUser").then((res) => {
            console.log(res.data);

            setuser(res.data);
        });
    }, []);
    const columns = [
        {
            title: "Nom",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Courriel",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "privilege",
        },

        {
            title: "Fonctionnalité",
            render: (item) => {
                return (
                    <div>
                        <Button
                            className="userBtn"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => confirmMethod(item)}
                            disabled={item.privilege === "admin" ? true : false}
                        ></Button>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            disabled={item.privilege === "admin" ? true : false}
                            onClick={() => handleUpdate(item)}
                        ></Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={user}
                pagination={{ pageSize: 5 }}
                rowKey={(item) => item.id}
            />
        </div>
    );
}

if (document.getElementById("listeUsager")) {
    const Index = ReactDOM.createRoot(document.getElementById("listeUsager"));

    Index.render(
        <React.StrictMode>
            <ListeUsager />
        </React.StrictMode>
    );
}
