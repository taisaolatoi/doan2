import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testcomponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/api/data.php')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h2>Data from PHP:</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Testcomponent;