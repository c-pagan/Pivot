import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import { StyledEngineProvider } from '@mui/material/styles';


function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>

  );
}

export default App;
