import React, { useEffect, useState } from 'react';
import { fetchAgents, Agent } from '../api/agentApi';
import AgentCardViewer from '../components/AgentCardViewer';

interface Props {
  onSelectAgent: (agentId: string) => void;
}

const Dashboard: React.FC<Props> = ({ onSelectAgent }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAgents() {
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (err) {
        setError('에이전트 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    loadAgents();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent 대시보드</h1>
      <AgentCardViewer agents={agents} onSelect={onSelectAgent} />
    </div>
  );
};

export default Dashboard;
