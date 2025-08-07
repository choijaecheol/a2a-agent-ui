import React, { useEffect, useState } from 'react';

interface Props {
  taskId: string;
}

const StreamViewer: React.FC<Props> = ({ taskId }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;

    const eventSource = new EventSource(`/api/tasks/${taskId}/stream`);

    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    eventSource.onerror = (e) => {
      setError('스트리밍 연결이 종료되었습니다.');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [taskId]);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded shadow max-h-60 overflow-auto text-sm font-mono whitespace-pre-wrap">
      <h3 className="font-semibold mb-2">실시간 실행 로그</h3>
      {messages.length === 0 && !error && <p>로그를 기다리는 중...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {messages.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
};

export default StreamViewer;
