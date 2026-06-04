// importamo sve komponente i stranice te ih preko routera slazemo

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";


// voditi racuna o tome da bez autentikacije korisnika i uspjesnog logina nema daljnjeg pristupa

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;