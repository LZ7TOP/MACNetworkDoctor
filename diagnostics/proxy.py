"""Proxy and VPN detection: system proxy, env vars, processes, listening ports."""

import asyncio
import os

from diagnostics.utils import run

PROXY_APPS = [
    "Shadowrocket", "Surge", "Clash", "ClashX", "Clash Verge", "Stash", "V2Ray", "Xray",
    "Trojan", "Quantumult", "karing", "mihomo", "SFM", "aTrust", "EasyConnect",
    "sing-box", "Hysteria", "NekoRay", "Nekoray", "WireGuard", "Tailscale", "ZeroTier", "OpenVPN",
]

PROXY_PORTS = ":(1080|1087|7890|7891|7897|8118|9090|2080|2333|2334) "


async def check_proxy() -> dict:
    sys_proxy, _env_vars, vpn_out, proc, ports = await asyncio.gather(
        run("scutil --proxy 2>/dev/null", cache=True),
        asyncio.to_thread(_read_env),
        run("scutil --nc list 2>/dev/null", cache=True),
        _scan_processes(),
        run(
            f"lsof -iTCP -sTCP:LISTEN -P 2>/dev/null | grep -E '{PROXY_PORTS}' || true",
            cache=True,
        ),
    )

    text = sys_proxy.stdout
    return {
        "http_proxy": "HTTPEnable : 1" in text,
        "socks_proxy": "SOCKSEnable : 1" in text,
        "pac_proxy": "ProxyAutoConfigEnable : 1" in text,
        "env_proxy": _env_vars,
        "vpn": _parse_vpn(vpn_out.stdout),
        "processes": proc,
        "proxy_ports": [x for x in ports.stdout.split("\n") if x.strip()],
    }


def _read_env() -> dict[str, str]:
    out = {}
    for var in ("HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "http_proxy", "https_proxy", "all_proxy"):
        val = os.environ.get(var, "")
        if val:
            out[var] = val
    return out


async def _scan_processes() -> list[dict]:
    async def find_one(app: str) -> list[dict]:
        r = await run(f"pgrep -fli '{app}' 2>/dev/null | grep -v grep || true")
        return [{"app": app, "detail": line.strip()} for line in r.stdout.split("\n") if line.strip()]

    tasks = [find_one(a) for a in PROXY_APPS]
    results = await asyncio.gather(*tasks)
    return [item for sublist in results for item in sublist]


def _parse_vpn(text: str) -> list[dict]:
    out = []
    for line in text.split("\n"):
        line = line.strip()
        if line:
            out.append({"text": line, "connected": "Connected" in line})
    return out
