"""Fix actions: Flush DNS, disable system proxy, etc. with optional sudo password support."""

import asyncio
from diagnostics.utils import run, run_sudo


async def flush_dns(password: str = None) -> dict:
    """Flush macOS DNS cache with sudo password support."""
    await run("dscacheutil -flushcache")
    r = await run_sudo("killall -HUP mDNSResponder", password=password)
    
    if not r.ok and ("password" in r.stderr.lower() or "sorry" in r.stderr.lower() or "incorrect" in r.stderr.lower() or "permission" in r.stderr.lower()):
        return {
            "success": False,
            "need_sudo_password": True,
            "error": "刷新系统 DNS (mDNSResponder) 需要管理员权限，请输入密码" if not password else "macOS 管理员密码不正确"
        }
        
    return {"success": True, "message": "DNS 缓存已成功刷新"}


async def disable_system_proxy(password: str = None) -> dict:
    """Turn off HTTP, HTTPS, SOCKS, and PAC proxy for all active network services."""
    r_services = await run("networksetup -listallnetworkservices | grep -v '*' | grep -v '^An'")
    if not r_services.ok:
        return {"success": False, "error": "无法获取网络服务列表"}

    services = [s.strip() for s in r_services.stdout.splitlines() if s.strip()]
    modified = []

    for s in services:
        cmds = [
            f'networksetup -setwebproxystate "{s}" off',
            f'networksetup -setsecurewebproxystate "{s}" off',
            f'networksetup -setsocksfirewallproxystate "{s}" off',
            f'networksetup -setautoproxystate "{s}" off',
        ]
        for c in cmds:
            if password:
                r = await run_sudo(c, password=password)
            else:
                r = await run(f"{c} 2>/dev/null || true")
        modified.append(s)

    if not modified:
        return {"success": True, "services": [], "message": "所有网络接口均已处于无代理直连状态"}

    return {"success": True, "services": modified, "message": f"已成功强制关停 {len(modified)} 个活动网卡接口的系统代理"}


async def flush_arp(password: str = None) -> dict:
    """Flush macOS ARP cache table."""
    r = await run_sudo("arp -d -a", password=password)
    
    if not r.ok and ("password" in r.stderr.lower() or "sorry" in r.stderr.lower() or "incorrect" in r.stderr.lower() or "permission" in r.stderr.lower() or "not permitted" in r.stderr.lower()):
        return {
            "success": False,
            "need_sudo_password": True,
            "error": "清理 ARP 路由表需要 macOS 管理员权限，请输入密码" if not password else "macOS 管理员密码不正确"
        }

    return {"success": True, "message": "ARP 路由表缓存已清理"}


async def renew_dhcp(password: str = None) -> dict:
    """Renew DHCP lease on active Wi-Fi/Ethernet interface."""
    r_if = await run("route -n get default 2>/dev/null | grep 'interface:' | awk '{print $2}'")
    iface = r_if.stdout.strip() or "en0"
    r = await run_sudo(f"ipconfig set {iface} DHCP", password=password)

    if not r.ok and ("password" in r.stderr.lower() or "sorry" in r.stderr.lower() or "incorrect" in r.stderr.lower() or "permission" in r.stderr.lower()):
        return {
            "success": False,
            "need_sudo_password": True,
            "error": f"重置网卡 {iface} DHCP 租约需要管理员权限，请输入密码" if not password else "macOS 管理员密码不正确"
        }

    return {"success": True, "iface": iface, "message": f"网卡 {iface} DHCP 租约已成功重置"}
