"""/etc/hosts custom entries."""

from diagnostics.utils import run

SKIP_IPS = {"127.0.0.1", "255.255.255.255", "::1"}
SKIP_HOSTS = {"localhost", "broadcasthost"}


async def check_hosts() -> dict:
    r = await run("cat /etc/hosts 2>/dev/null", cache=True)
    entries: list[dict] = []
    for line in r.stdout.split("\n"):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        parts = stripped.split()
        if len(parts) < 2:
            continue
        ip, *hosts = parts
        if ip in SKIP_IPS and all(h in SKIP_HOSTS for h in hosts):
            continue
        entries.append({"ip": ip, "hosts": " ".join(hosts)})
    return {"entries": entries}
