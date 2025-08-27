import React, { useState, useEffect } from "react";
import { createTask, getTaskById, updateTask } from "../../api/api";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import pick from "../../utils/pick";
import { useSnackbar } from "notistack";
import TasksUpload from "./TasksUpload";

const TaskForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { isEdit, setIsEdit } = useOutletContext();
  const navigate = useNavigate();
  const { taskId } = useParams(); // Extract the parameter from the URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    effortToComplete: "",
    dueDate: "",
  });

  // console.log(taskId, "taskId");
  // console.log(isEdit, "isEdit");
  // console.log(formData);
  useEffect(() => {
    if (isEdit && taskId) {
      // to get latest data instead to get real data
      const getTaskToEdit = async (id) => {
        try {
          const response = await getTaskById(id);
          console.log(response, "response");
          setFormData({
            ...response,
            dueDate: response?.dueDate?.split("T")[0],
          });
        } catch (error) {
          console.error(error, "error");
        }
      };
      getTaskToEdit(taskId);
    }
    // return ()=>setIsEdit(false)
  }, [isEdit, taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const dataToUpdate = pick(formData, [
          "title",
          "description",
          "effortToComplete",
          "dueDate",
        ]);
        // console.log(dataToUpdate, "dataToUpdate");
        const response = await updateTask(taskId, dataToUpdate);
        enqueueSnackbar("Task updated successfully", { variant: "success" });
        setIsEdit(false);
        navigate(-1)
      } else {
        await createTask(formData);
        enqueueSnackbar("Task created successfully", { variant: "success" });
        navigate("/tasks");
      }
      // fetchTasks()
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting task details:", error);
      enqueueSnackbar(
        "Error: " + error?.response?.data?.message ||
          `An Error while ${isEdit ? "Updating" : "Creating"} Task`,
        { variant: "error" }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-4 gap-4 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {isEdit ? "Update Task" : "Create New Task"}
      </h1>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData?.title}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={formData?.description}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="effortToComplete"
        placeholder="Effort (in days)"
        value={formData?.effortToComplete}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        name="dueDate"
        value={formData?.dueDate}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 mb-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isEdit ? "Update Task" : "Create Task"}
      </button>
      {!isEdit && (
        <Link to={'/tasks/import'} className="text-xl center font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Or Upload Bulk Task
        </Link>
      )}
      {/* {!isEdit && <TasksUpload />} */}
    </form>
  );
};

export default TaskForm;
