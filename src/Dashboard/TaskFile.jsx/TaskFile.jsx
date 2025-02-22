import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AuthContext } from "../../Provider/AuthProver";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const TaskFile = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "", category: "To-Do" });
    const [editingTask, setEditingTask] = useState(null);
    const categories = ["To-Do", "In Progress", "Done"];

    // Fetch tasks only for the logged-in user
    useEffect(() => {
        if (!user) return;
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://to-do-website-server.vercel.app/tasks?email=${user.email}`);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    // Handle form submission (Add or Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) {
            Swal.fire("Warning!", "Task title is required!", "warning");
            return;
        }

        try {
            if (editingTask) {
                const response = await axios.put(`https://to-do-website-server.vercel.app/task/${editingTask._id}`, newTask);
                if (response.data.modifiedCount > 0) {
                    setTasks(tasks.map((task) => (task._id === editingTask._id ? { ...task, ...newTask } : task)));
                    Swal.fire("Updated!", "Task updated successfully.", "success");
                }
            } else {
                const response = await axios.post("https://to-do-website-server.vercel.app/task", { ...newTask, email: user.email });
                if (response.data.insertedId) {
                    setTasks([...tasks, { ...newTask, _id: response.data.insertedId, email: user.email }]);
                    Swal.fire("Added!", "Task added successfully.", "success");
                }
            }
            setNewTask({ title: "", description: "", category: "To-Do" });
            setEditingTask(null);
        } catch (error) {
            console.error("Error saving task:", error);
            Swal.fire("Error!", "Failed to save task.", "error");
        }
    };

    // Handle Delete with SweetAlert2
    const handleDelete = async (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://to-do-website-server.vercel.app/task/${taskId}`);
                    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
                    Swal.fire("Deleted!", "Your task has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting task:", error);
                    Swal.fire("Error!", "Failed to delete task.", "error");
                }
            }
        });
    };

    // Handle Edit Task
    const handleEdit = (task) => {
        setNewTask({ title: task.title, description: task.description, category: task.category });
        setEditingTask(task);
    };

    // Handle Drag and Drop
    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.category = result.destination.droppableId; // Update category when moving between columns
        updatedTasks.splice(result.destination.index, 0, movedTask);
        
        setTasks(updatedTasks);

        // Update category in the backend
        try {
            await axios.put(`https://to-do-website-server.vercel.app/task/${movedTask._id}`, { category: movedTask.category });
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-gray-500 text-lg font-medium">
                Please log in to manage tasks.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            {/* Task Form */}
            <form onSubmit={handleSubmit} className="text-black rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{editingTask ? "Edit Task" : "Add a New Task"}</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                        placeholder="Task Title"
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-white text-gray-800"
                        required
                    />
                    <textarea
                        name="description"
                        value={newTask.description}
                        onChange={handleChange}
                        placeholder="Task Description (optional)"
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-white text-gray-800 min-h-[100px]"
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <select
                            name="category"
                            value={newTask.category}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-lg border bg-white text-gray-700"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            {editingTask ? "Update Task" : "Add Task"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Task Columns */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Droppable key={category} droppableId={category} type="TASK">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white shadow-lg rounded-xl p-5 min-h-[200px]">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">{category}</h2>
                                    {tasks.filter(task => task.category === category).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                                                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                                                    <p className="text-gray-600 text-sm">{task.description}</p>
                                                    <div className="flex justify-between mt-4">
                                                        <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(task)}>
                                                            <FaEdit size={16} />
                                                        </button>
                                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(task._id)}>
                                                            <FaTrashAlt size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskFile;
