import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import { CATEGORIES, TASKS } from "../data";

function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [filteredTasks, setFilteredTasks] = useState(TASKS);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.category === category));
    }
  };

  const handleDelete = (taskToDelete) => {
    const updatedTasks = tasks.filter(task => task !== taskToDelete);
    setTasks(updatedTasks);
    if (selectedCategory === "All") {
      setFilteredTasks(updatedTasks);
    } else {
      setFilteredTasks(updatedTasks.filter(task => task.category === selectedCategory));
    }
  };

  const handleTaskFormSubmit = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    if (selectedCategory === "All") {
      setFilteredTasks(updatedTasks);
    } else {
      setFilteredTasks(updatedTasks.filter(task => task.category === selectedCategory));
    }
  };

  return (
    <div className="App">
      <h2>My tasks</h2>
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <NewTaskForm onTaskFormSubmit={handleTaskFormSubmit} />
      <TaskList tasks={filteredTasks} onDelete={handleDelete} />
    </div>
  );
}

export default App;
