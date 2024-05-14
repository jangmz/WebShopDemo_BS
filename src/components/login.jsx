import Input from "./input"

export default function Login() {
    return (
        <div id="login">
            <form>
                <Input label="username" type="text" />
                <Input label="password" type="password" />
                <button type="submit">Authenticate</button>
            </form>
        </div>
    )
}