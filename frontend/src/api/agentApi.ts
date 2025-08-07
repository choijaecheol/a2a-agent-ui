export interface Agent {
  id: string;
  name: string;
  description?: string;
}

export interface TaskRequest {
  agentId: string;
  input: string;
}

export const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:8000';

export async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_BASE}/agents`);
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
}

export const fetchAgent = async (agentId: string): Promise<Agent> => {
  const response = await fetch(`/api/agents/${agentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch agent');
  }
  return response.json();
};

export async function sendTask(task: TaskRequest): Promise<{ taskId: string }> {
  const res = await fetch(`${API_BASE}/tasks/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to send task');
  return res.json();
}

export function streamTaskResult(taskId: string, onMessage: (msg: string) => void, onError?: () => void) {
  const eventSource = new EventSource(`${API_BASE}/tasks/${taskId}/stream`);

  eventSource.onmessage = (e) => {
    onMessage(e.data);
  };

  eventSource.onerror = (e) => {
    console.error('SSE connection error:', e);
    eventSource.close();
    if (onError) onError();
  };

  return () => eventSource.close(); // 반환된 함수는 cleanup 용도
}

export async function runAgentTask(agentId: string, input: string): Promise<{ result?: string; taskId?: string }> {
  const res = await fetch(`/api/agents/${agentId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task: input }),
  });

  if (!res.ok) {
    throw new Error('Failed to run agent task');
  }

  return res.json();
}

export const executeAgentTask = async (agentId: string) => {
  const response = await fetch(`/api/agents/${agentId}/tasks`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to execute task');
  }
  
  return response.json();
};
