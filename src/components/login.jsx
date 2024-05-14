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

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit")
        console.log(user);
    }
    return (
        <div id="login">
            <form onSubmit={handleSubmit} method="POST">
                <Input 
                    label="username" 
                    type="text" 
                    value={user.username}
                    onChange={handleUsernameChange} 
                />
                <Input 
                    label="password" 
                    type="password" 
                    value={user.password}
                    onChange={handlePasswordChange} 
                />
                <button>Authenticate</button>
            </form>
        </div>
    )
}