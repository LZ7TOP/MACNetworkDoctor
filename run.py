#!/usr/bin/env python3
"""MACNetworkDoctor — 启动入口（支持开发热更新）"""

import subprocess
import sys


def main():
    # Ensure deps exist
    try:
        import fastapi
        import uvicorn
    except ImportError:
        print("正在安装依赖...")
        subprocess.run(
            [sys.executable, "-m", "pip", "install", "-r", "requirements.txt", "-q"],
            check=True,
        )

    import uvicorn

    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│         MACNetworkDoctor — macOS 网络诊断控制台 v1.6       │")
    print("├──────────────────────────────────────────────────────────┤")
    print("│  Web 控制台访问地址: http://localhost:19999              │")
    print("│  运行模式: 极速热重载 (Hot Reload Enabled)               │")
    print("│  终止运行: 终端按 Ctrl+C 退出控制台                       │")
    print("└──────────────────────────────────────────────────────────┘")
    print()

    uvicorn.run(
        "api.app:app",
        host="127.0.0.1",
        port=19999,
        reload=True,
        reload_dirs=["api", "diagnostics", "static"],
        log_level="warning",
    )



if __name__ == "__main__":
    main()

