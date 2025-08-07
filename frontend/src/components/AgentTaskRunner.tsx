import React, { useState } from 'react';

interface AgentTaskRunnerProps {
  agentId: string;
  onTaskExecuted: (taskId: string) => void;
}

const AgentTaskRunner: React.FC<AgentTaskRunnerProps> = ({ agentId, onTaskExecuted }) => {
  const [loading, setLoading] = useState(false);

  const handleRunTask = async () => {
    try {
      setLoading(true);
      // TODO: API 호출로 태스크 실행
      // const response = await executeAgentTask(agentId);
      // onTaskExecuted(response.taskId);
      
      // 임시로 테스트용 태스크 ID 생성
      const mockTaskId = `task-${Date.now()}`;
      onTaskExecuted(mockTaskId);
    } catch (error) {
      console.error('Task execution failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleRunTask}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Running...' : 'Run Task'}
      </button>
    </div>
  );
};

export default AgentTaskRunner;
