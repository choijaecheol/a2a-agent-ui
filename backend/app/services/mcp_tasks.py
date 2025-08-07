from mcp.server.fastmcp import FastMCP

app = FastMCP()

def summarize_tool(context):
    return {"summary": "dummy"}  # 단순 반환으로 우선 테스트

def classify_tool(context):
    text = context.get("input", "")
    return {"category": "AI" if "Upsonic" in text else "General"}

# 함수 객체를 직접 전달
app.add_tool(summarize_tool)
app.add_tool(classify_tool)
