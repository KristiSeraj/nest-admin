import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState({
        first_name: ''
    });
    
    const getUser = async () => {
        const { data } = await axios.get('/user')
        setUser(data);
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <>
            <Navbar />
        </>
    );
}
 
export default Dashboard;