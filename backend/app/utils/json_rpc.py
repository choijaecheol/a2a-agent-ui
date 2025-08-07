def validate_json_rpc_request(data: dict):
    if "jsonrpc" not in data or data["jsonrpc"] != "2.0":
        raise ValueError("Invalid JSON-RPC version")
    if "method" not in data:
        raise ValueError("Method is required")
