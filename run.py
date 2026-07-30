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
    print("┌──────────────────────────────────────────────────────────┐")
    print("│             Network Doctor — Web 控制台 v1.6             │")
    print("├──────────────────────────────────────────────────────────┤")
    print("│  本地访问: http://localhost:19999                         │")
    print("│  开发状态: 代码热更新 (Hot Reload Enabled)               │")
    print("│  退出控制: 按 Ctrl+C 终止运行                             │")
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

