import axios from "axios";
const API_URL_Local = "http://localhost:8082/v1/";
const API_URL_ONLINE = "https://task-management-app-7yzg.onrender.com/v1/";
const API_URL = API_URL_Local;
const generateHeader = (type) => {
  const header = {
    headers: {
      "Content-Type": `${
        type == "upload"
          ? "multipart/form-data"
          : type == "download"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/json"
      }`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  if (type == "download") {
    return {
      ...header,
      responseType: "blob",
    };
  }
  return header;
};

export async function loginApi(data) {
  try {
    const response = await axios.post(
      `${API_URL}auth/login`,
      data,
      generateHeader()
    );
    console.info("Api Login Res:",);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function registerApi(data) {
  try {
    const response = await axios.post(
      `${API_URL}auth/register`,
      data,
      generateHeader()
    );
    console.info("Api SignUp Res:");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser() {
  try {
    const response = await axios.get(`${API_URL}auth/user`, generateHeader());
    console.info("Api User Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTasks() {
  try {
    // console.log(localStorage.getItem("token"));
    // console.log(generateHeader());
    const response = await axios.get(`${API_URL}task`, generateHeader());
    console.table(response?.data?.tasks);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getTaskById(id) {
  try {
    const response = await axios.get(`${API_URL}task/${id}`, generateHeader());
    console.info("Api Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createTask(data) {
  try {
    console.log(data)
    const response = await axios.post(`${API_URL}task`, data, generateHeader());
    console.info("Api Create Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function updateTask(id, data) {
  try {
    console.log(data)
    const response = await axios.put(
      `${API_URL}task/${id}`,
      data,
      generateHeader()
    );
    console.info("Api Update Task Res:", response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function deleteTask(id) {
  try {
    const response = await axios.delete(
      `${API_URL}task/${id}`,
      generateHeader()
    );
    console.info("Api Delete Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function exportTasks(fileType) {
  try {
    const response = await axios.get(
      `${API_URL}task/export${fileType === "csv" ? "?format=csv" : ""}`,
      generateHeader("download")
    );
    console.info("Api Export Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function importTasks(data) {
  try {
    const response = await axios.post(
      `${API_URL}task/import`,
      data,
      generateHeader("upload")
    );
    console.info("Api Import Task Res:", response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
