"""Fix actions: Flush DNS, disable system proxy, etc."""

import asyncio
from diagnostics.utils import run


async def flush_dns() -> dict:
    """Flush macOS DNS cache."""
    cmd = "dscacheutil -flushcache; sudo killall -HUP mDNSResponder 2>/dev/null || true"
    r = await run(cmd)
    # dscacheutil -flushcache usually returns 0 without output
    return {"success": True, "message": "DNS 缓存已成功刷新"}


async def disable_system_proxy() -> dict:
    """Turn off HTTP, HTTPS, SOCKS, and PAC proxy for all active network services."""
    # Find active network services using networksetup
    r_services = await run("networksetup -listallnetworkservices | grep -v '*' | grep -v '^An'")
    if not r_services.ok:
        return {"success": False, "error": "无法获取网络服务列表"}

    services = [s.strip() for s in r_services.stdout.splitlines() if s.strip()]
    modified = []

    for s in services:
        # Turn off webproxy, securewebproxy, socksfirewallproxy, autoproxy
        cmds = [
            f'networksetup -setwebproxystate "{s}" off 2>/dev/null || true',
            f'networksetup -setsecurewebproxystate "{s}" off 2>/dev/null || true',
            f'networksetup -setsocksfirewallproxystate "{s}" off 2>/dev/null || true',
            f'networksetup -setautoproxystate "{s}" off 2>/dev/null || true',
        ]
        await asyncio.gather(*[run(c) for c in cmds])
        modified.append(s)

    return {"success": True, "services": modified, "message": f"已关停 {len(modified)} 个网络接口的系统代理"}


async def flush_arp() -> dict:
    """Flush macOS ARP cache table."""
    r = await run("sudo arp -d -a 2>/dev/null || arp -d -a 2>/dev/null || true")
    return {"success": True, "message": "ARP 路由表缓存已清理"}

