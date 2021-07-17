import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddTask from "./components/AddTask";
import About from "./components/About";

const App = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        console.log(data)
        return data
    }

    const [showAddTask, setShowAddTask] = useState(false)

    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        console.log(id)
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))

    }

    return (
        <Router>
            <div className="container">

                <Header title='Task Tracker'
                        onAdd={() => setShowAddTask(!showAddTask)}
                        showAdd={showAddTask}></Header>

                <Route path='/' exact render={(props) => (
                    <>
                        {showAddTask && <AddTask onAdd={addTask}></AddTask>}
                        {tasks.length > 0 ?
                            <Tasks tasks={tasks}
                                   onDelete={deleteTask}
                                   onToggle={toggleReminder}></Tasks>
                            : 'No Tasks To Show'}</>
                )}/>
                <Route path='/about' component={About}/>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
