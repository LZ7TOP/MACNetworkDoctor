"""Chrome Secure DNS (DoH) inspection and repair."""

import json
import os

from diagnostics.utils import run


def _chrome_state_path() -> str:
    return os.path.expanduser(
        "~/Library/Application Support/Google/Chrome/Local State"
    )


async def check_chrome_dns() -> dict:
    path = _chrome_state_path()
    if not os.path.exists(path):
        return {"exists": False}

    try:
        content = await _read_json(path)
        doh = content.get("dns_over_https", {})
        return {
            "exists": True,
            "mode": doh.get("mode", "not_set"),
            "templates": doh.get("templates", ""),
            "is_problem": doh.get("mode") == "secure",
        }
    except Exception:
        return {"exists": True, "error": "读取失败"}


async def check_chrome_running() -> bool:
    r = await run("pgrep -l 'Google Chrome$' 2>/dev/null || true")
    return bool(r.stdout.strip())


async def fix_chrome_dns() -> dict:
    running = await check_chrome_running()
    if running:
        return {"success": False, "error": "Chrome 正在运行，请先完全退出 Chrome (Cmd+Q)"}

    path = _chrome_state_path()
    if not os.path.exists(path):
        return {"success": False, "error": "未找到 Chrome 配置"}

    try:
        content = await _read_json(path)
        old = content.get("dns_over_https", {}).get("mode", "not_set")
        content["dns_over_https"] = {"mode": "off"}
        await _write_json(path, content)
        return {"success": True, "old_mode": old, "new_mode": "off"}
    except Exception as e:
        return {"success": False, "error": str(e)}


async def _read_json(path: str) -> dict:
    def _read():
        with open(path) as f:
            return json.load(f)
    return await __import__("asyncio").to_thread(_read)


async def _write_json(path: str, data: dict) -> None:
    def _write():
        with open(path, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    return await __import__("asyncio").to_thread(_write)
