import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AgentDetail from './pages/AgentDetail';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DashboardWrapper />} />
          <Route path="/agent/:agentId" element={<AgentDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function DashboardWrapper() {
  const navigate = useNavigate();

  const handleSelectAgent = (agentId: string) => {
    navigate(`/agent/${agentId}`);
  };

  return <Dashboard onSelectAgent={handleSelectAgent} />;
}

export default App;
