import "../paragraph/Paragraph.scss";
import vector from "../../assets/images/Vector.svg";
import eternalChecked from "../../assets/images/eternalChecked.svg";
import checkMark from "../../assets/images/realcheckmark.svg";
import trashImg from "../../assets/images/trashImg.svg";
import React, { useState, useEffect } from "react";

function Paragraph() {
    const [time, setTime] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [eternalTime, setEternalTime] = useState(new Date());
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const publishTaskTime = eternalTime.toLocaleDateString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toLocaleUpperCase();
    const currentDay = `${days[time.getDay()]} ${time.getDate()}`;
    const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, checked: false, date: currentDay, time: currentTime }]);
            setNewTask("");
        } else {
            alert("Please fill the input <3 :)");
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleCheck = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, checked: !task.checked } : task
        ));
    };

    return (
        <>
            <div className="container">
                <div className="photo_div">
                    <div className="time_div">
                        <p className="current_day">{currentDay}</p>
                        <h1 className="current_time">{currentTime}</h1>
                    </div>
                </div>
                <div className="content_div">
                    <div className="input_div">
                        <div className="input_and_checkmark">
                            <img className="eternalChecked" src={eternalChecked} />
                            <input 
                                type="text" 
                                placeholder="Note" 
                                className="input"
                                value={newTask} 
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        addTask();
                                    }
                                }}
                            />
                        </div>
                        <button className="add_btn" onClick={addTask}>
                            <img src={vector} />
                        </button> 
                    </div>
                    <div className="real_content">
                        {tasks.map(task => (
                            <div className="task" key={task.id}>
                                <div className="taskName_and_time">
                                    <p className={`task_name ${task.checked ? "checked" : ""}`}>{task.text}</p>
                                    <p className="task_time">{publishTaskTime}</p>
                                </div>
                                <div className="check_and_trash">
                                    <button className={`mark_btn ${task.checked ? "checked" : ""}`}>
                                        <img 
                                            src={checkMark} 
                                            className="checkMark" 
                                            onClick={() => toggleCheck(task.id)} 
                                        />
                                    </button>
                                    <img 
                                        src={trashImg} 
                                        className="trash_img" 
                                        onClick={() => deleteTask(task.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Paragraph;
