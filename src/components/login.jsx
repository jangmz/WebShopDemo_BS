import Input from "./input";
import { TokenContext } from "../App";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { setToken } = useContext(TokenContext);
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState({
        username: "demo@local",
        password: "localDemo1234!",
    });
    

    function handleUsernameChange(e) {
        setUser({ ...user, username: e.target.value });
    }

    function handlePasswordChange(e) {
        setUser({ ...user, password: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("submit")
        console.log(user);

        try {
            const response = await fetch("http://webshopdemo.devweb.b-s.si/api/WebShopDemo/Account/Authenticate", {    
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": user.username,
                    "password": user.password
                })
            });

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            console.log("Response token: " + data.token);
            setToken(data.token);
            setRedirect(true);
        } catch (error) {
            console.error("Error: " + error);
        }
    }

    if(redirect) {
        navigate("/shop");
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit} method="POST">
                <Input 
                    label="username" 
                    type="text" 
                    onChange={handleUsernameChange} 
                />
                <Input 
                    label="password" 
                    type="password" 
                    onChange={handlePasswordChange} 
                />
                <button>Authenticate</button>
            </form>
        </div>
    )
}