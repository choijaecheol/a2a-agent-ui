# a2a-agent-ui

```bash
a2a-agent-ui/
├── backend/                        # FastAPI 백엔드
│   ├── app/
│   │   ├── main.py                 # FastAPI 진입점
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── agents.py       # /agents 엔드포인트 (AgentCard 등)
│   │   │   │   ├── tasks.py        # /tasks/send 등 A2A 핵심 기능
│   │   │   │   ├── events.py       # SSE/Stream 처리
│   │   │   │   └── webhooks.py     # Webhook 수신 처리
│   │   ├── core/
│   │   │   ├── config.py           # 설정 및 환경 변수 로딩
│   │   │   └── a2a_protocol.py     # A2A 표준 처리 (메시지 포맷 등)
│   │   ├── models/
│   │   │   ├── agent_card.py       # AgentCard 스키마
│   │   │   ├── task.py             # Task 실행 및 상태 추적 모델
│   │   ├── services/
│   │   │   ├── task_manager.py     # 실행 흐름 및 상태 관리
│   │   │   ├── mcp_client.py       # FastMCP 또는 자체 MCP 연동
│   │   └── utils/
│   │       └── json_rpc.py         # JSON-RPC 2.0 메시지 처리 도우미
│   └── requirements.txt
│
├── frontend/                       # React (Vite 기반) 프론트엔드
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── api/
│   │   │   └── agentApi.ts         # 백엔드 API 연동
│   │   ├── components/
│   │   │   ├── AgentCardViewer.tsx # AgentCard 시각화 컴포넌트
│   │   │   ├── TaskExecutor.tsx    # Task 실행 컨트롤 UI
│   │   │   └── StreamViewer.tsx    # SSE 스트림 뷰어
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx       # 전체 실행 현황 대시보드
│   │   │   └── AgentDetail.tsx     # 단일 에이전트 상세
│   └── vite.config.ts
│
├── docker/
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── docker-compose.yml
│
├── .env                            # 환경 변수 설정
├── README.md
└── Makefile                        # 통합 빌드 및 실행 명령어
```
