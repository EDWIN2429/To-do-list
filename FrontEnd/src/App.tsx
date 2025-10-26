import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
