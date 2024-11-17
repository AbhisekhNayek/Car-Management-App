import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import CarFormPage from "./pages/CarFormPage";
import SignUpPage from "./components/Auth/SignupForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cars" element={<CarListPage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/create-car" element={<CarFormPage />} />
        <Route path="/edit-car/:id" element={<CarFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;