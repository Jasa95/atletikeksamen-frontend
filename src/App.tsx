import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ParticipantsPage from "./pages/ParticipantsPage";
import DisciplinePage from "./pages/DisciplinesPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <div>
      <>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/disciplines" element={<DisciplinePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
      </>
    </div>
      )
}