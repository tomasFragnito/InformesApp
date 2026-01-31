import React from 'react';
import { useState, useEffect } from 'react';

const DNS = "fragapp.duckdns.org";

export const CallBack = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://"+DNS+"/reports", {method: "GET"})
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);
}