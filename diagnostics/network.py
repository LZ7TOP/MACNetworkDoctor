"""Network basics: interfaces, IP, gateway, DNS, connectivity."""

from diagnostics.utils import run


async def check_network() -> dict:
    """Run all network checks concurrently."""
    tasks = {
        "active_if": run("ifconfig | grep -B1 'status: active' | grep '^[a-z]' | cut -d: -f1"),
        "ip": run("ifconfig en0 2>/dev/null | grep 'inet ' | awk '{print $2}'"),
        "gateway": run("netstat -rn -f inet 2>/dev/null | grep '^default' | awk '{print $2}'"),
        "dns_raw": run("scutil --dns 2>/dev/null | grep 'nameserver' | sed 's/.*: //' | head -5"),
        "ping_baidu": run("ping -c 2 -t 2 www.baidu.com 2>&1"),
        "ping_google": run("ping -c 2 -t 2 8.8.8.8 2>&1"),
        "http_baidu": run("curl -sI --connect-timeout 4 https://www.baidu.com 2>&1 | head -1"),
    }

    import asyncio
    results = dict(zip(tasks.keys(), await asyncio.gather(*tasks.values())))

    dns_list = [x for x in results["dns_raw"].stdout.split("\n") if x] if results["dns_raw"].ok else []

    return {
        "active_if": results["active_if"].stdout.replace("\n", ", ") or "未检测到",
        "ip": results["ip"].stdout or "未获取到",
        "gateway": results["gateway"].stdout or "未获取到",
        "dns": dns_list,
        "ping_baidu": results["ping_baidu"].ok,
        "ping_google": results["ping_google"].ok,
        "http_baidu": "200" in results["http_baidu"].stdout or "HTTP" in results["http_baidu"].stdout,
    }
