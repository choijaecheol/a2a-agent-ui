import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAgent, Agent } from '../api/agentApi';
import AgentCardViewer from '../components/AgentCardViewer';
import AgentTaskRunner from '../components/AgentTaskRunner';
import StreamViewer from '../components/StreamViewer';

const AgentDetail: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (!agentId) return;

    fetchAgent(agentId)
      .then(setAgent)
      .catch(() => setAgent(null));
  }, [agentId]);

  // Task 실행 시 Task ID를 전달받아 스트리밍 뷰어에 전달하는 콜백
  const handleTaskExecuted = (taskId: string) => {
    setCurrentTaskId(taskId);
  };

  if (!agentId) return <p>잘못된 접근입니다.</p>;
  if (!agent) return <p>에이전트 정보를 불러오는 중입니다...</p>;

  return (
    <div className="p-6">
      <AgentCardViewer agents={[agent]} onSelect={() => {}} />
      <AgentTaskRunner agentId={agentId} onTaskExecuted={handleTaskExecuted} />
      {currentTaskId && <StreamViewer taskId={currentTaskId} />}
    </div>
  );
};

export default AgentDetail;
