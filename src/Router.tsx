import { Routes, Route } from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Prompt from './pages/Prompt';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Join from './pages/Join';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/prompt" element={<Prompt />} />

        <Route path="/join" element={<Join />} />

        <Route path="/create" element={<Create />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default Router