"use client"; // Adicione esta linha no topo do arquivo

import styles from "./login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (username) {
            localStorage.setItem("username", username);
            router.push("/tasks");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Digite seu nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
            />
            <button onClick={handleLogin} className={styles.button}>
                Entrar
            </button>
        </div>
    );
}
