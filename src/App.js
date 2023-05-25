import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gait from "./pages/gait";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path="/gait" element={<Gait/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
