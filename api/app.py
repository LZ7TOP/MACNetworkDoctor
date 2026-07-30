"""FastAPI application — async endpoints for the network doctor dashboard."""

import asyncio

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from diagnostics import (
    check_chrome_dns,
    check_chrome_running,
    check_extensions,
    check_hosts,
    check_network,
    check_latency,
    check_proxy,
    fix_chrome_dns,
    flush_dns,
    disable_system_proxy,
    flush_arp,
)

app = FastAPI(title="Network Doctor", version="1.0.0", docs_url=None, redoc_url=None)


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


# ── API: Quick Fix Actions ────────────────────────────────────
@app.post("/api/fix-chrome")
@app.post("/api/fix/chrome-dns")
async def api_fix_chrome():
    return await fix_chrome_dns()


@app.post("/api/fix/flush-dns")
async def api_flush_dns():
    return await flush_dns()


@app.post("/api/fix/disable-proxy")
async def api_disable_proxy():
    return await disable_system_proxy()


@app.post("/api/fix/flush-arp")
async def api_flush_arp():
    return await flush_arp()


