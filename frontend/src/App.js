import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Task from "./pages/task/Task";
import Register from "./pages/auth/register/Register.jsx";
import { AuthProvider } from "./context/AuthContex.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import TaskForm from "./components/tasks/TaskForm.jsx";
import TasksList from "./components/tasks/TasksList.jsx";
import Login from "./pages/auth/login/Login.jsx";
import TasksUpload from "./components/tasks/TasksUpload.jsx";
import TaskExport from "./components/tasks/TaskExport.jsx";
import TaskCard from "./components/tasks/TaskCard.jsx";
import Home from '../src/pages/home/Home.jsx'
function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute >
                  <Task />
                </ProtectedRoute>
              }
            >
              <Route index element={<TasksList />} /> {/* Default route */}
              <Route path=":taskId" element={<TaskCard />} />
              <Route path="import" element={<TasksUpload />} />
              <Route path="export" element={<TaskExport />} />
              <Route path="create" element={<TaskForm />} />
              <Route path="update/:taskId" element={<TaskForm />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
