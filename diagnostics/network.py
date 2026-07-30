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


async def check_latency() -> dict:
    """Measure HTTP latency for popular domestic and global sites."""
    targets = [
        ("百度 (Baidu)", "https://www.baidu.com"),
        ("淘宝 (Taobao)", "https://www.taobao.com"),
        ("腾讯 (QQ)", "https://www.qq.com"),
        ("GitHub", "https://github.com"),
        ("Cloudflare 1.1.1.1", "https://1.1.1.1"),
        ("Google DNS", "https://8.8.8.8"),
    ]

    async def _test_one(name, url):
        import time
        t0 = time.time()
        r = await run(f"curl -sI --connect-timeout 3 {url} 2>&1 | head -1")
        dt = int((time.time() - t0) * 1000)
        ok = r.ok and ("HTTP" in r.stdout or "200" in r.stdout or "301" in r.stdout or "302" in r.stdout)
        return {
            "name": name,
            "url": url,
            "latency": dt if ok else None,
            "ok": ok
        }

    import asyncio
    results = await asyncio.gather(*[_test_one(n, u) for n, u in targets])
    return {"targets": results}


async def benchmark_dns() -> dict:
    """Benchmark popular public DNS servers for resolution speed."""
    dns_servers = [
        ("阿里 DNS (223.5.5.5)", "223.5.5.5"),
        ("腾讯 DNSPod (119.29.29.29)", "119.29.29.29"),
        ("百度 DNS (180.76.76.76)", "180.76.76.76"),
        ("Cloudflare DNS (1.1.1.1)", "1.1.1.1"),
        ("Google DNS (8.8.8.8)", "8.8.8.8"),
    ]

    async def _test_dns(name, server):
        import time
        t0 = time.time()
        r = await run(f"dig @{server} baidu.com +time=2 +tries=1 +short 2>&1")
        dt = int((time.time() - t0) * 1000)
        ok = r.ok and bool(r.stdout.strip())
        return {
            "name": name,
            "server": server,
            "latency": dt if ok else None,
            "ip_result": r.stdout.splitlines()[0] if ok else None,
            "ok": ok
        }

    import asyncio
    results = await asyncio.gather(*[_test_dns(n, s) for n, s in dns_servers])
    return {"dns_servers": results}


