import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leads from "./pages/Leads";
import LeadList from "./pages/LeadList";
import AddNewLead from "./pages/AddNewLead";
import SalesAgent from "./pages/SalesAgent";
import AddNewSalesAgent from "./pages/AddNewSalesAgent";
import LeadsByStatus from "./pages/LeadsByStatus";
import LeadsBySalesAgent from "./pages/LeadsBySalesAgent";
import Reports from "./pages/Reports";
import ParticleBackground from "./components/ParticleBackground";
function App() {
  return (
    <Router>
      <ParticleBackground />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/leads/:id" element={<Leads />}></Route>
        <Route path="/leadList" element={<LeadList />}></Route>
        <Route path="/addLead" element={<AddNewLead />}></Route>
        <Route path="/salesAgent" element={<SalesAgent />}></Route>
        <Route path="/salesAgent/:id" element={<LeadsBySalesAgent />}></Route>
        <Route path="/addSalesAgent" element={<AddNewSalesAgent />}></Route>
        <Route path="/leadStatusView" element={<LeadsByStatus />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
