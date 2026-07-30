from diagnostics.network import check_network, check_latency, benchmark_dns
from diagnostics.proxy import check_proxy
from diagnostics.extensions import check_extensions
from diagnostics.chrome import check_chrome_dns, check_chrome_running, fix_chrome_dns
from diagnostics.hosts import check_hosts
from diagnostics.fix import flush_dns, disable_system_proxy, flush_arp

__all__ = [
    "check_network",
    "check_latency",
    "benchmark_dns",
    "check_proxy",
    "check_extensions",
    "check_chrome_dns",
    "check_chrome_running",
    "fix_chrome_dns",
    "check_hosts",
    "flush_dns",
    "disable_system_proxy",
    "flush_arp",
]



