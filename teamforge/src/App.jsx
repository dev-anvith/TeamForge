import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamForgeLanding from "./Landing";
import ResultPage from "./Result"; // Ensure this path is correct
import TeamForgeDashboard from "./Dash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamForgeLanding />} />
        <Route path="/results/:teamId" element={<ResultPage />} />
        <Route path="/dashboard/:teamId" element={<TeamForgeDashboard />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
