import React, { useEffect, useState } from "react";
import Table from "../Table.jsx/Table";
import TaskExport from "./TaskExport";
import { useSnackbar } from "notistack";
import { useNavigate, useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";

const TaskList = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const { tasks, setTasks, handleDelete, onView, onEdit, width, fetchTasks } =
    useOutletContext();
  const [isTable, setIsTable] = useState(width > 768);
  console.log(width, "width");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    console.log('mounted')
  }, []);

  useEffect(() => {
    if (width > 768) {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  }, [width]);

  const headers = ["Title", "Description", "Effort (days)", "Due Date"];
  const rows = tasks?.map((task) => ({
    title: task.title,
    description: task.description,
    effortToComplete: task.effortToComplete,
    dueDate: task.dueDate,
    id: task.id,
  }));

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-row col-rev items-center justify-between mb-4 gap-4 flex-wrap">
        <button
          onClick={() => navigate("/tasks/create")}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          Create Task
        </button>
        <button
          onClick={() => navigate("/tasks/import")}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          Import Tasks
        </button>
        <TaskExport />
        <TaskExport fileType={"csv"} />
        <button
          onClick={() => setIsTable((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 hover:scale-110 dark:hover:text-[#ffb600]"
        >
          {!isTable ? "Table View" : "Grid View"}
        </button>{" "}
      </div>
      {isTable && (
        <Table
          headers={headers}
          list={tasks || []}
          rows={rows}
          onEdit={onEdit}
          onDelete={handleDelete}
          onView={onView}
        />
      )}
      {!isTable && (
        <div style={{overflow:'scroll',scrollbarWidth:'none'}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          {tasks?.map((task) => (
            <TaskCard
              key={task?.id}
              taskDetails={task}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
