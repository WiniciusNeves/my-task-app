'use client';

import styles from "./Header.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <header className={styles.header}>
            <Image
                src="/images/logo.png"
                alt="Logotipo da aplicação"
                width={150}
                height={36}
            />
            <h1>Bem-vindo de volta, {username}</h1>
            <time 
                dateTime={new Date().toISOString().split('T')[0]} 
                className={styles.date}
            >
                {new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}
            </time>
        </header>
    );
}
