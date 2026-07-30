# Network Doctor — 网络诊断 Web 控制台
#
# 项目结构:
#   api/               FastAPI 后端
#     app.py             路由 & API 端点
#   diagnostics/       诊断引擎 (异步并发)
#     network.py          网络基础检查
#     proxy.py            代理 & VPN 检测
#     extensions.py       系统网络扩展检查
#     chrome.py           Chrome 安全 DNS 检查 & 修复
#     hosts.py            /etc/hosts 分析
#     utils.py            Shell 运行器 & 缓存
#   static/            前端 (纯 HTML/CSS/JS，无框架)
#     index.html
#     css/app.css
#     js/app.js
#   run.py             入口
#   start.sh           一键启动脚本
#   requirements.txt
#
# 技术选型:
#   - FastAPI + uvicorn: 异步 HTTP 服务
#   - asyncio.subprocess: 并发执行诊断命令
#   - 零前端依赖: 纯 vanilla JS
#   - 结果缓存: 5 秒 TTL 防重复命令
#
# 运行: ./start.sh 或 python3 run.py
