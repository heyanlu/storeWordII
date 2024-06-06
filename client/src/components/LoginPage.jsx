import { useState } from "react";


function LoginPage({ onLogin }) {
    const [input, setInput] = useState(""); 

    function handleSubmit(e) {
        e.preventDefault(); 
        onLogin(input);
    }

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <label>Username: 
                <input 
                    className="input-username"
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                />
            </label>
            <button className="button-login" type="submit">
                Login
            </button>
        </form>
    )
}

export default LoginPage; 