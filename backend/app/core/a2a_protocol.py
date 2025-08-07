from typing import Any, Dict

def build_json_rpc_request(method: str, params: Dict[str, Any], id: int = 1):
    return {
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": id
    }
