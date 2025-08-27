import React, { useEffect, useState } from "react";
import {  getTaskById } from "../../api/api";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function TaskCard({ taskDetails }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const { onView, onEdit, handleDelete } = useOutletContext();
  const {handleDelete,onEdit} = useOutletContext();

  const [task, setTask] = useState({
    id: taskDetails?.id || "",
    title: taskDetails?.title || "",
    description: taskDetails?.description || "",
    effortToComplete: taskDetails?.effortToComplete,
    dueDate: taskDetails?.dueDate,
  });

  const { taskId } = useParams();

  useEffect(() => {
    if (!taskDetails?.id) {
      const getTaskDetails = async (id) => {
        try {
          const response = await getTaskById(id);
          console.log(response, "response");
          setTask({ ...response, dueDate: response?.dueDate?.split("T")[0] });
        } catch (error) {
          console.error(error, "error");
          enqueueSnackbar("Failed to fetch task details", { variant: "error" });
        }
      };
      getTaskDetails(taskId);
    }
  }, []);

  return (
    <div
      className={`bg-white w-[90%] m-auto dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform ${!taskId?"hover:scale-105":""} duration-300`}
      onClick={() =>{if(!taskId){ navigate(`/tasks/${task?.id}`)}}}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Task: {task?.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span>Description : </span>
        {task?.description}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span className="font-medium">Due Date:</span> {task?.dueDate}
      </p>

      <p className=" text-sm text-gray-600 dark:text-gray-400 mt-1">
        Efforts To Complete: {task?.effortToComplete}
      </p>
      <div className="flex justify-end space-x-3">
        <button
          id={task?.id}
          onClick={(e) => {e.stopPropagation();onEdit(task?.id);}}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          Edit
        </button>
        <button
          id={task?.id}
          onClick={() => {
            handleDelete(task?.id);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
