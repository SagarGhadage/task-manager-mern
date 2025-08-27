import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getAllTasks } from "../../api/api";
import { useSnackbar } from "notistack";
import useWindowSize from "../../utils/useWindowSize";
const Task = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { taskId } = useParams(); // Extract the parameter from the URL
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [isEdit, setIsEdit] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    if (window.location.pathname.includes('update')) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [taskId]);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response?.tasks || []);
      console.log("Tasks fetched successfully!",);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      enqueueSnackbar("Failed to fetch tasks.", { variant: "error" });
    }
  };

  useEffect(() => {
    // fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      enqueueSnackbar("Task deleted successfully!", { variant: "success" });
      navigate("/tasks");
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      enqueueSnackbar(
        "Failed to delete task." + error?.response?.data?.message,
        { variant: "error" }
      );
    }
  };
  const onView = async (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  const onEdit = async (taskId) => {
    navigate(`/tasks/update/${taskId}`);
    setIsEdit(true);
    // await fetchTasks();
  };
  // console.log(width, "width");
  
  return (
    <div style={{scrollbarWidth:'none'}} className="items-start w-full h-screen overflow-scroll p-6 bg-gray-100 dark:bg-gray-900 scrollbar-none">
      <Outlet
        context={{
          width,
          isEdit,
          setIsEdit,
          tasks: tasks?.length ? tasks : [],
          setTasks,
          handleDelete,
          onView,
          onEdit,
          fetchTasks,
        }}
      />{" "}
      {/* Renders the nested route components */}
    </div>
  );
};

export default Task;
