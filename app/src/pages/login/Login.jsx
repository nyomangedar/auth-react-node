import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    async function submit(e) {
        e.preventDefault();
        console.log(JSON.stringify(formData));
        await fetch("http://localhost:9000/api/user/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((resData) => {
                console.log(resData);
                localStorage.setItem("role", resData.role);
                localStorage.setItem("id", resData._id);
                navigate("/");
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={submit}>
                <div>
                    <label>username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
}
