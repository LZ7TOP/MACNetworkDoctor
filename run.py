#!/usr/bin/env python3
"""Network Doctor — 启动入口（支持开发热更新）"""

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
    print("╔══════════════════════════════════════════════════════╗")
    print("║        Network Doctor — Web 控制台 v1.6 (热更新)     ║")
    print("║        http://localhost:19999                        ║")
    print("║        按 Ctrl+C 停止                               ║")
    print("╚══════════════════════════════════════════════════════╝")
    print()

    uvicorn.run(
        "api.app:app",
        host="127.0.0.1",
        port=19999,
        reload=True,
        reload_dirs=["api", "diagnostics", "static"],
        log_level="info",
    )


if __name__ == "__main__":
    main()

