import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamForgeLanding from "./Landing";
import ResultPage from "./Result"; // Ensure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamForgeLanding />} />
        <Route path="/results/:teamId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
