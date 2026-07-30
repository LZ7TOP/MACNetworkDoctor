"""macOS Network Extension inspection."""

from diagnostics.utils import run

SUSPICIOUS_KEYWORDS = [
    "nekohasekai", "clashmi", "karing", "shadowrocket",
    "surge", "v2ray", "xray", "proxy", "tunnel", "sangfor",
]


async def check_extensions() -> dict:
    r = await run("systemextensionsctl list 2>/dev/null")
    lines = r.stdout.split("\n")

    in_ne = False
    extensions = []
    for line in lines:
        if "network_extension" in line:
            in_ne = True
            continue
        if in_ne and line.startswith("---"):
            break
        if in_ne and line.strip():
            text = line.strip()
            is_bad = any(kw in text.lower() for kw in SUSPICIOUS_KEYWORDS)
            is_active = "activated enabled" in text
            is_term = "terminated" in text
            extensions.append({
                "text": text,
                "suspicious": is_bad,
                "active": is_active,
                "terminated": is_term,
            })

    return {"extensions": extensions, "count": len(extensions)}
