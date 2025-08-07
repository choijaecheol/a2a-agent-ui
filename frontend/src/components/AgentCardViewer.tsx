import React from 'react';
import { Agent } from '../api/agentApi';

interface Props {
  agents: Agent[];
  onSelect: (agentId: string) => void;
}

const AgentCardViewer: React.FC<Props> = ({ agents, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="bg-white rounded-xl shadow hover:shadow-md p-4 cursor-pointer transition-all"
          onClick={() => onSelect(agent.id)}
        >
          <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
          <p className="text-gray-600 text-sm">{agent.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AgentCardViewer;
