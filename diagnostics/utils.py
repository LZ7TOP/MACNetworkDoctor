"""Shared async shell runner with timeout, caching, and error handling."""

import asyncio
import hashlib
import json
import os
from functools import lru_cache

CACHE_TTL = 5  # seconds — diagnostics are point-in-time, short cache avoids stale data
_cache: dict[str, tuple[float, "ShellResult"]] = {}


class ShellResult:
    __slots__ = ("ok", "stdout", "stderr")

    def __init__(self, ok: bool, stdout: str, stderr: str):
        self.ok = ok
        self.stdout = stdout
        self.stderr = stderr

    def to_dict(self) -> dict:
        return {"ok": self.ok, "stdout": self.stdout, "stderr": self.stderr}


async def run(cmd: str, *, timeout: float = 12.0, cache: bool = False) -> ShellResult:
    """Execute a shell command asynchronously with a deadline.

    Args:
        cmd: Shell command string.
        timeout: Seconds before the subprocess is killed.
        cache: If True, cache the result for CACHE_TTL seconds.
    """
    if cache:
        key = hashlib.sha256(cmd.encode()).hexdigest()
        now = asyncio.get_event_loop().time()
        if key in _cache:
            ts, result = _cache[key]
            if now - ts < CACHE_TTL:
                return result
            del _cache[key]

    try:
        proc = await asyncio.wait_for(
            asyncio.create_subprocess_shell(
                cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            ),
            timeout=timeout,
        )
        stdout, stderr = await proc.communicate()
        result = ShellResult(
            ok=proc.returncode == 0,
            stdout=stdout.decode("utf-8", errors="replace").strip(),
            stderr=stderr.decode("utf-8", errors="replace").strip(),
        )
    except asyncio.TimeoutError:
        result = ShellResult(ok=False, stdout="", stderr="命令超时")
    except Exception as e:
        result = ShellResult(ok=False, stdout="", stderr=str(e))

    if cache:
        _cache[key] = (asyncio.get_event_loop().time(), result)

    return result


async def run_sudo(cmd: str, password: str = None, timeout: float = 12.0) -> ShellResult:
    """Execute a command with sudo, supplying password via pipe if provided."""
    if password:
        safe_pass = password.replace("'", "'\\''")
        full_cmd = f"echo '{safe_pass}' | sudo -S {cmd} 2>&1"
    else:
        full_cmd = f"sudo -n {cmd} 2>/dev/null || {cmd}"
    return await run(full_cmd, timeout=timeout)


def parse_kv(text: str) -> dict[str, str]:
    """Parse simple key: value lines into a dict."""
    out = {}
    for line in text.splitlines():
        line = line.strip()
        if ":" in line:
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip()
    return out
