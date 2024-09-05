import React, { useState,useEffect } from "react";
import Header from "./Header";
import './AdminPortal.css';

const AdminPortal=()=>{
    const [tasks,setTasks]=useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/tasks');
                const data = await response.json();

               
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    console.error('Expected an array, but received:', data);
                    setTasks([]);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);


    return(
        <div>
            <Header/>
            <h1 className="admin-title">Admin Portal</h1>
            <div className="tablebox">
            <table className="top">
                    <tr>
                        <thead className="thead">
                            <th className="ths">Id</th>
                            <th className="ths">Subject</th>
                            <th className="ths">StartTime</th>
                            <th className="ths">EndTime</th>

                        </thead>
                        <tbody>
                        {tasks.map((task) => (
                            <tr key={task._id}>
                                <td>{task.subject}</td>  
                                <td>{new Date(task.startTime).toLocaleDateString()}</td>  
                                <td>{new Date(task.startTime).toLocaleTimeString()}</td>  
                                <td>{new Date(task.endTime).toLocaleTimeString()}</td> 
                            </tr>
                        ))}
                        </tbody>
                        
                        
                    </tr>
                </table>

            </div>
        </div>
    )
}
export default AdminPortal