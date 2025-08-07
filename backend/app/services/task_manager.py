from uuid import uuid4
from app.models.task import TaskRequest, TaskResult
from app.services.mcp_client import send_task_to_mcp
from upsonic import Task, Graph, Agent

# 간단한 인메모리 저장소
task_store = {}

async def handle_task_submission(task: TaskRequest) -> TaskResult:
    task_id = str(uuid4())
    task_store[task_id] = {"status": "submitted", "output": None}

    result = await send_task_to_mcp(task.agent_id, task.task_type, task.payload)
    task_store[task_id] = {"status": "completed", "output": result}

    return TaskResult(task_id=task_id, status="completed", output=result)

def create_agent():
    agent = Agent(name="mcp_agent")
    agent.add(Task(description="summarize", tool="summarize"))
    agent.add(Task(description="classify", tool="classify"))
    return agent

def run_graph(input_data):
    agent = create_agent()
    graph = Graph()
    graph.add(agent)
    result = graph.run(input_data)
    return result