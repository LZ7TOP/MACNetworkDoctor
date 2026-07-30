"""FastAPI application — async endpoints for the MACNetworkDoctor dashboard."""

import asyncio
import time

from typing import Optional

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from diagnostics import (
    check_chrome_dns,
    check_chrome_running,
    check_extensions,
    check_hosts,
    check_network,
    check_latency,
    benchmark_dns,
    check_port,
    check_proxy,
    fix_chrome_dns,
    flush_dns,
    disable_system_proxy,
    flush_arp,
    renew_dhcp,
)


app = FastAPI(title="MACNetworkDoctor", version="1.6.0", docs_url=None, redoc_url=None)


# ── Terminal Logger Middleware ──────────────────────────────
@app.middleware("http")
async def log_api_requests(request: Request, call_next):
    t0 = time.time()
    response = await call_next(request)
    dt = int((time.time() - t0) * 1000)
    # Only print API requests to keep terminal logs clean and insightful
    if request.url.path.startswith("/api"):
        now_str = time.strftime("%H:%M:%S")
        print(f"[{now_str}] API {request.method} {request.url.path} → {response.status_code} ({dt}ms)")
    return response



# ── Static files ──────────────────────────────────────────────
app.mount("/static", StaticFiles(directory="static", html=False), name="static")


@app.get("/")
async def index():
    return FileResponse("static/index.html")


# ── API: Full diagnosis — all checks run concurrently ──────────
@app.get("/api/diagnose")
async def api_diagnose():
    net, prx, ext, cdns, running, hosts = await asyncio.gather(
        check_network(),
        check_proxy(),
        check_extensions(),
        check_chrome_dns(),
        check_chrome_running(),
        check_hosts(),
    )
    return {
        "network": net,
        "proxy": prx,
        "extensions": ext,
        "chrome_dns": cdns,
        "chrome_running": running,
        "hosts": hosts,
    }


# ── API: Individual checks ────────────────────────────────────
@app.get("/api/check/network")
async def api_network():
    return await check_network()


@app.get("/api/check/latency")
async def api_latency():
    return await check_latency()


@app.get("/api/check/dns-benchmark")
async def api_dns_benchmark():
    return await benchmark_dns()



@app.get("/api/check/proxy")
async def api_proxy():
    return await check_proxy()


@app.get("/api/check/extensions")
async def api_extensions():
    return await check_extensions()


@app.get("/api/check/chrome")
async def api_chrome():
    cdns = await check_chrome_dns()
    cdns["chrome_running"] = await check_chrome_running()
    return cdns


@app.get("/api/check/hosts")
async def api_hosts():
    return await check_hosts()


async def _extract_password(request: Request) -> Optional[str]:
    try:
        body = await request.json()
        return body.get("password") if isinstance(body, dict) else None
    except Exception:
        return None


# ── API: Quick Fix Actions ────────────────────────────────────
@app.post("/api/fix-chrome")
@app.post("/api/fix/chrome-dns")
async def api_fix_chrome():
    return await fix_chrome_dns()


@app.post("/api/fix/flush-dns")
async def api_flush_dns(request: Request):
    pwd = await _extract_password(request)
    return await flush_dns(password=pwd)


@app.post("/api/fix/disable-proxy")
async def api_disable_proxy(request: Request):
    pwd = await _extract_password(request)
    return await disable_system_proxy(password=pwd)


@app.post("/api/fix/flush-arp")
async def api_flush_arp(request: Request):
    pwd = await _extract_password(request)
    return await flush_arp(password=pwd)


@app.post("/api/fix/renew-dhcp")
async def api_renew_dhcp(request: Request):
    pwd = await _extract_password(request)
    return await renew_dhcp(password=pwd)


@app.post("/api/check/port")
async def api_check_port(request: Request):
    try:
        body = await request.json()
        host = body.get("host", "127.0.0.1")
        port = int(body.get("port", 80))
        return await check_port(host, port)
    except Exception as e:
        return {"open": False, "error": str(e), "message": "请求格式错误"}



