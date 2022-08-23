import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import { StyledEngineProvider } from '@mui/material/styles';
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>

  );
}

export default App;
