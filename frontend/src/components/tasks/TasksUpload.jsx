import React, { useState } from "react";
import { importTasks } from "../../api/api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const TasksUpload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // console.log(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy"; //show copy txt
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      enqueueSnackbar("Please select a file first.", { variant: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await importTasks(formData);

      if (response?.status === 201) {
        enqueueSnackbar("File uploaded successfully!", { variant: "success" });
        setFile(null);
        navigate("/tasks");
      } else if (response?.data?.error) {
        enqueueSnackbar(`Error uploading file: ${response?.data?.error}`, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Failed to upload file.", { variant: "error" });
      }
    } catch (error) {
      // console.error('Error uploading file:', error);
      enqueueSnackbar(
        "An error occurred while uploading the file." +
          error?.response?.data?.message || "Network Error",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <form className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Upload CSV or Excel File
      </h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 mb-4 cursor-pointer hover:border-gray-600 dark:hover:border-gray-500"
      >
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          {file ? "Select other" : "Chose file"}
        </label>
        {file ? (
          <span className="text-gray-600 dark:text-gray-300">
            Selected File: {file.name}
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Drag and drop your file here or click to select [Excel or CSV]
          </span>
        )}
      </div>

      <button
        type="submit"
        onClick={handleUpload}
        className="mt-4 px-6 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700"
      >
        Upload
      </button>
    </form>
  );
};

export default TasksUpload;
