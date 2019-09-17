import React, { useState, useEffect } from "react";
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './display.scss';
import axios from "axios";
import '../../styles.css';


function Display({ token }) {
    console.log(token);

    const [data, setData] = useState([]);

    useEffect(() => {
        let config = {
            headers: {
                // Authorization: token,
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            }
        }

        axios.get('http://localhost:5000/api/users', config)
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [token]);

    return (
        <div className="cards">
            {data.map(user => {
                return (
                    <Card key={user.id}>
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                            <Card.Meta>{`ID: ${user.id || 'N/A'}`}</Card.Meta>
                            <Card.Meta>{`Password length: ${user.password.length || 0}`}</Card.Meta>
                        </Card.Content>
                    </Card>)
            })}
        </div>
    )
}

export default Display;