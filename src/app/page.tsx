"use client";

import styles from "./login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const router = useRouter();

    const handleLogin = () => {
        if (!username) {
            return alert("Por favor, insira seu nome de usuário");
        }

        localStorage.setItem("username", username);
        router.push("/tasks");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles["logo-container"]}>
                <Image
                    src="/images/logo.png"
                    alt="Logotipo da aplicação"
                    width={150}
                    height={36}
                />
            </div>
            <div className={styles["form-container"]}>
                <h1>Bem-vindo de volta!</h1>
                <label htmlFor="username">Nome de usuário</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Insira seu nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={styles["button-container"]}>
                <button type="submit">Entrar</button>
            </div>
        </form>
    );
}
