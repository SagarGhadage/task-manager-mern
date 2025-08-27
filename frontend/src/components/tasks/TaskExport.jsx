import React from "react";
import { exportTasks } from "../../api/api";

export default function TaskExport({ user, fileType, link }) {
  const handleExport = async () => {
    try {
      // console.log("Exporting tasks...");
      const response = await exportTasks(fileType);
      if (!response?.size) {
        throw new Error("Failed to export tasks");
      }
      console.log(response?.size, ": buffer size");
      let blob;
      if (fileType === "csv") {
        blob = new Blob([response], {
          type: "text/csv",
        });
      } else {
        blob = new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      if (fileType === "csv") {
        a.download = "task.csv";
      } else {
        a.download = "tasks.xlsx";
      }
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      console.log("Exported tasks successfully");
    } catch (error) {
      console.error("Error exporting tasks:", error);
      alert("An error occurred while exporting tasks.");
    }
  };

  if (link) {
    return (
      <span onClick={handleExport}>
        {fileType === "csv" ? "Export CSV" : "Export Excel"}
      </span>
    );
  } else
    return (
      <button
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        onClick={handleExport}
      >
        {fileType === "csv" ? "Export to CSV" : "Export to Excel"}
      </button>
    );
}
