import Input from "./input"
import { useState } from "react";

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
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
            const response = await fetch("https://cors-anywhere.herokuapp.com/http://webshopdemo.devweb.b-s.si/api/WebShopDemo/Account/Authenticate", {    
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
            console.log("Response data:");
            console.log(data);
            // handle data
        } catch (error) {
            console.error("Error: " + error);
            // handle error
        }
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