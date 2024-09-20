    'use client';
    import { useEffect, useState } from 'react';
    import { FaTrash } from 'react-icons/fa';
    import Header from "@/app/components/template/Header";
    import styles from './tasks.module.scss';

    interface Task {
        id: number;
        title: string;
        completed: boolean;
    }

    export default function Tasks() {
        const [tasks, setTasks] = useState<Task[]>([]);
        const [showModal, setShowModal] = useState<boolean>(false);
        const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
        const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
        const [newTaskTitle, setNewTaskTitle] = useState<string>('');

        useEffect(() => {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        }, []);

        useEffect(() => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }, [tasks]);

        const addTask = (title: string) => {
            const newTask: Task = { id: tasks.length + 1, title, completed: false };
            setTasks([...tasks, newTask]);
            setShowModal(false);
            setNewTaskTitle('');
        };

        const toggleTaskCompletion = (id: number) => {
            setTasks(
                tasks.map(task =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                )
            );
        };

        const handleDeleteTask = () => {
            if (selectedTaskId !== null) {
                setTasks(tasks.filter(task => task.id !== selectedTaskId));
                setShowDeleteModal(false);
                setSelectedTaskId(null);
            }
        };

        const handleOpenDeleteModal = (id: number) => {
            setSelectedTaskId(id);
            setShowDeleteModal(true);
        };

        return (
            <main>
                <Header />
                <div className={styles['tasks-container']}>
                    <h1 className={styles['title']}>Sua Lista de Tarefas</h1>
                    <ul>
                        {tasks.filter(task => !task.completed).map(task => (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                                <span>{task.title}</span>
                                <button
                                    className={styles['delete-button']}
                                    onClick={() => handleOpenDeleteModal(task.id)}
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h2 className={styles['title']}>Tarefas finalizadas</h2>
                    <ul className={styles['completed-tasks']}>
                        {tasks.filter(task => task.completed).map(task => (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                                <span className={styles.completed}>
                                    {task.title}
                                </span>
                                <button
                                    className={styles['delete-button']}
                                    onClick={() => handleOpenDeleteModal(task.id)}
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {showModal && (
                        <div className={styles['modal']}>
                            <div className={styles['modal-content']}>
                                <h2>Nova Tarefa</h2>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    addTask(newTaskTitle);
                                }}>
                                    <label htmlFor="new-task">Título</label>
                                    <input
                                        id="new-task"
                                        type="text"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        placeholder="Nova tarefa"
                                        required
                                    />
                                    <div className={styles['button-group']}>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className={`${styles['button']} ${styles['cancel-button']}`}>
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className={`${styles['button']} ${styles['add-button']}`}>
                                            Adicionar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {showDeleteModal && (
                        <div className={styles['modal']}>
                            <div className={styles['modal-content']}>
                                <h2>Deletar Tarefa</h2>
                                <p className={styles['delete-text']}>Tem certeza que você deseja deletar essa tarefa?</p>
                                <div className={styles['button-group']}>
                                    <button onClick={() => setShowDeleteModal(false)} className={`${styles['button']} ${styles['cancel-button']}`}>Cancelar</button>
                                    <button onClick={handleDeleteTask} className={`${styles['button']} ${styles['delete-button']}`}>Deletar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles['add-task']}>
                    <button onClick={() => setShowModal(true)}>Adicionar Tarefa</button>
                </div>
            </main>
        );
    }
