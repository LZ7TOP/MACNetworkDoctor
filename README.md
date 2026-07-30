<div align="center">

<img src="static/logo.svg" width="140" height="140" alt="MACNetworkDoctor Logo" />

# 🩺 MACNetworkDoctor

### Mac 专业级网络诊断与一键修复 Web 控制台

[![Version](https://img.shields.io/badge/Version-v1.6.0-2563EB)](https://github.com/LZ7TOP/MACNetworkDoctor)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: macOS](https://img.shields.io/badge/Platform-macOS-000000?logo=apple&logoColor=white)](https://www.apple.com/macos)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Author: LZ7工作室](https://img.shields.io/badge/Author-LZ7工作室-2563EB.svg)](https://github.com/LZ7TOP)

</div>

---

## 📖 项目介绍

`MACNetworkDoctor` 是一款专为 macOS 开发者、运维人员与系统管理员打造的高性能网络排错与一键修复控制台。通过 Python 异步并发诊断引擎与现代 **React 18** 响应式单页应用 (SPA)，全面排查与自动修复日常开发测试中常见的系统代理残留、VPN 断流、DNS 解析污染、Chrome Secure DoH 阻断、TCP 端口握手超时以及 `/etc/hosts` 自定义重定向异常。

无论是在日常办公网、代理加速环境还是纯隔离无网局域网下，`MACNetworkDoctor` 均能实现**毫秒级并发排查**并提供**一键快捷修复**与 **Markdown 诊断报告导出**功能。

---

## ✨ 核心特性亮点

- ⚡ **React 18 现代化控制台**：纯正 React 18 Component + Hooks 状态流驱动，搭配 Linear / Vercel 风格 Glassmorphism 拟态界面与全矢量 SVG 图标。
- 🎨 **三模极速主题引擎**：内置 **纯黑深色 (OLED Dark)**、**浅色 (Light)** 与 **系统跟随 (System)** 3 种主题无缝切换，高对比度色彩适配，极致视觉体验。
- 📦 **纯离线 / 零 CDN 依赖**：前端 React 18、ReactDOM 18 与 Babel 依赖全量静态本地化（放置于 `static/vendor/`），在无网或局域网隔离环境下依旧完美渲染运行。
- 📄 **Markdown 诊断报告导出**：一键导出并生成标准 Markdown 格式的网络诊断报告，清晰汇总系统健康分、网络接口状态、DNS 延迟竞速等数据，方便排障记录与分享。
- 🩺 **全维度异步并发诊断**：内置 macOS 原生 CLI 诊断引擎（`ifconfig`, `scutil`, `networksetup`, `lsof`, `dig`, `ping`, `curl`），支持 6 大核心模块毫秒级并发排查。
- 🔌 **TCP 端口握手探测**：支持自定义指定 Host 与 Port 进行 TCP 三次握手测试与延迟毫秒级测量，精准检测端口开放状态。
- 🔐 **Web 端 Sudo 提权密码认证**：当一键修复指令需要 macOS 管理员 (`sudo`) 权限时，控制台自动唤起 `SudoPasswordModal` 认证窗口，支持在浏览器中直接输入密码安全提权与自动重试。
- 💬 **全自定义高颜值 Modal 弹窗**：彻底弃用原生丑陋的浏览器 `window.confirm()` / `window.alert()` 提示，全量换用项目中封装的 Glassmorphism 暗黑拟态二次确认对话框。
- 🔧 **一键修复工具箱 (Quick-Fix Toolbox)**：
  - **刷新系统 DNS 缓存**：调用 `dscacheutil` 与 `mDNSResponder` 彻底更新域名解析记录。
  - **一键关停系统代理**：自动扫描所有活动网卡并强制关闭 HTTP/HTTPS/SOCKS/PAC 代理。
  - **重置 Chrome 安全 DNS (DoH)**：解析并自动修复 Chrome `Local State` 中强制 Secure DoH 造成的域名卡顿。
  - **清理 ARP 路由表缓存**：快速重置 ARP 缓存，解决路由器更换或局域网 MAC 地址碰撞问题。
  - **重置网卡 DHCP 动态租约**：自动触发主网卡 DHCP 租约重置，快速恢复 IP 地址分配。
- 🛡️ **广域代理与多协议 VPN 检索**：实时检索包含 Surge、Clash、Stash、WireGuard、Tailscale、ZeroTier、OpenVPN 在内的代理软件与虚拟网络扩展。
- 📊 **节点响应与 DNS 竞速测试 (Benchmark)**：
  - 并发测速国内外主流 HTTP 站点 (百度, 淘宝, GitHub, Cloudflare 1.1.1.1, Google 8.8.8.8)。
  - 并发测速 5 大主流公共 DNS 解析延迟并实时推荐最优服务器。
- 💻 **Terminal 终端代理 export 命令生成**：自动检测 Clash / Surge 等本地代理监听端口，生成一键复制命令供终端一键启用代理。
- 🔄 **代码热更新 (Hot Reload Enabled)**：服务继承 Uvicorn 热更新引擎，内置端口冲突检测与优雅清理中间件。

---

## 🛠️ 技术栈 (Tech Stack)

| 层级 | 技术方案 | 描述与主要用途 |
| :--- | :--- | :--- |
| **Backend** | **Python 3.8+** | 底层核心开发语言，提供系统级 CLI 管道交互与并发处理能力 |
| | **FastAPI (≥ 0.115.0)** | 高性能 RESTful 异步 API 框架，内置自动类型校验与轻量 JSON 响应 |
| | **Uvicorn (≥ 0.32.0)** | 基于 `asyncio` 的 ASGI 服务器，集成极速代码热重载 (Hot Reload) 与请求日志中间件 |
| | **aiofiles (≥ 24.0.0)** | 异步非阻塞文件 I/O 读写库，用于安全解析与修改 Chrome 配置及本地文件 |
| | **asyncio** | 原生并发任务调度器，利用 `asyncio.gather` 实现多维度网络诊断毫秒级并发探测 |
| **Frontend** | **React 18** | Component & Hooks 驱动的单页应用 (SPA)，全状态流无缝交互 |
| | **Babel Standalone (v7)** | 本地化实时 JSX 渲染解析引擎（位于 `static/vendor/`） |
| | **Vanilla Modern CSS** | 自定义 Pure Black Glassmorphism 拟态与浅色双模设计，结合 CSS 自定义变量与 Grid 响应式布局 |
| | **Lucide Vector Icons** | 全矢量现代 SVG 图标集，提供无损高清晰度 UI 元素表现 |
| | **Zero CDN / Offline Ready** | 前端静态资源全量本地化，完全脱离外部网络 CDN 限制，支持纯离线隔离环境部署 |
| **Engine** | **macOS Native CLI Core** | 深度集成 `ifconfig`, `scutil`, `networksetup`, `lsof`, `dig`, `ping`, `curl`, `arp`, `dscacheutil` |

---

## 📁 目录结构

```text
MACNetworkDoctor/
├── api/                   # FastAPI 后端路由 & API 端点
│   ├── __init__.py
│   └── app.py             # 路由注册与 HTTP 实时日志中间件
├── diagnostics/           # 异步 CLI 诊断引擎
│   ├── __init__.py        # 引擎统一导出
│   ├── network.py         # 物理网络、Ping、HTTP & DNS 竞速测速与 TCP 端口探测
│   ├── proxy.py           # 系统代理、活动代理进程与 VPN 状态
│   ├── extensions.py      # 系统网络扩展分析
│   ├── chrome.py          # Chrome Secure DoH 配置解析与修复
│   ├── hosts.py           # /etc/hosts 自定义解析条目分析
│   ├── fix.py             # 快捷修复工具 (DNS/Proxy/ARP/Chrome/DHCP)
│   └── utils.py           # 异步 Shell 运行器与 TTL 缓存机制
├── static/                # React 18 前端静态资源
│   ├── logo.svg           # 矢量 SVG 专属品牌 Logo 图标
│   ├── index.html         # 单页应用挂载入口
│   ├── css/app.css        # Pure Black 纯黑 Glassmorphism 与多主题 CSS 规则
│   ├── js/app.js          # React 18 组件化 SPA 逻辑与报告导出
│   └── vendor/            # React 18, ReactDOM 18, Babel 本地依赖
├── run.py                 # Python 启动入口 (支持自动依赖安装与 Hot Reload)
├── start.sh               # macOS 一键启动与端口清理脚本
├── requirements.txt       # 项目 Python 依赖
├── README.md              # 项目说明文档
├── LICENSE                # MIT 开源授权许可
└── .gitignore             # Git 忽略配置
```

---

## 🚀 快速开始

### 依赖环境

- **操作系统**：macOS (推荐 macOS 12+)
- **Python**：Python 3.8+
- **浏览器**：Chrome / Safari / Firefox / Edge

### 启动步骤

1. **直接运行一键启动脚本 (推荐)**：

   ```bash
   chmod +x start.sh
   ./start.sh
   ```

   _脚本会自动检查并释放 `19999` 端口占用，并开启 Web 控制台。_

2. **或使用 Python 手动启动**：

   ```bash
   # 安装依赖
   pip install -r requirements.txt

   # 启动热更新服务
   python3 run.py
   ```

3. 打开浏览器访问控制台：
   👉 **`http://localhost:19999`**

---

## 📡 API 路由规范

后端基于 FastAPI 提供高效的 RESTful JSON 接口：

### 诊断数据接口 (GET / POST)

| 接口地址                       | 请求方式 | 说明             | 诊断内容                                   |
| :----------------------------- | :------- | :--------------- | :----------------------------------------- |
| `GET /api/diagnose`            | GET      | **全面并发诊断** | 并发执行所有模块检查并计算系统健康指数     |
| `GET /api/check/network`       | GET      | 网络基础检查     | 活跃接口、IP 地址、默认网关与连通性        |
| `GET /api/check/latency`       | GET      | 核心节点测速     | 国内外主流 HTTP 站点响应耗时               |
| `GET /api/check/dns-benchmark` | GET      | 公共 DNS 竞速    | 阿里、腾讯、Cloudflare 等 DNS 解析速度对比 |
| `POST /api/check/port`         | POST     | 端口 Socket 探测 | 测试指定 Host 与 Port 的 TCP 握手与延迟    |
| `GET /api/check/proxy`         | GET      | 代理与 VPN 检测  | 系统代理状态、活动代理进程与监听端口       |
| `GET /api/check/extensions`    | GET      | 网络扩展检查     | 系统网络扩展及其可疑状态检测               |
| `GET /api/check/chrome`        | GET      | Chrome DoH 检查  | Chrome Secure DoH 设置及运行状态           |
| `GET /api/check/hosts`         | GET      | Hosts 条目分析   | `/etc/hosts` 中非默认域名重定向解析        |

### 一键修复接口 (POST)

| 接口地址                      | 说明                     | 底层操作命令                                                       |
| :---------------------------- | :----------------------- | :----------------------------------------------------------------- |
| `POST /api/fix/flush-dns`     | 刷新 macOS 系统 DNS 缓存 | `dscacheutil -flushcache; killall -HUP mDNSResponder`              |
| `POST /api/fix/disable-proxy` | 强制关停活动接口系统代理 | `networksetup -setwebproxystate / -setsecurewebproxystate ... off` |
| `POST /api/fix/flush-arp`     | 清理 ARP 路由表缓存      | `sudo arp -d -a`                                                   |
| `POST /api/fix/renew-dhcp`    | 重置网卡 DHCP 动态租约   | `ipconfig set en0 DHCP`                                            |
| `POST /api/fix/chrome-dns`    | 修复 Chrome 安全 DNS     | 修改 Chrome `Local State` 文件中 `dns_over_https.mode` 为 `"off"`  |

---

## ❓ 常见问题 (FAQ)

### Q: 部分快捷修复功能（如清理 ARP 缓存）提示权限不足？

**A**: 清理系统级 ARP 缓存命令 (`arp -d -a`) 需要 macOS 管理员权限。如果当前运行 `python3 run.py` 的用户账号未使用 `sudo` 启动，可直接在终端中手动执行返回命令，或以 `sudo python3 run.py` 方式启动服务。

### Q: 应用启动时提示端口 19999 被占用？

**A**: 项目自带端口检测与自动释放机制。推荐直接运行 `./start.sh`，脚本会自动寻找并终止旧的进程，释放端口后重新拉起 Web 控制台。

### Q: 是否支持在 Linux 或 Windows 系统上运行？

**A**: `MACNetworkDoctor` 的诊断引擎深度集成了 macOS 系统原生 CLI 指令（如 `networksetup`, `scutil`, `dscacheutil` 等）。目前为 macOS 平台专属工具。

---

## 📝 Git 提交规范 (Commit Standards)

为保持项目代码提交记录的清晰干净，请遵循统一的中文 Commit 提交标准：

- `feat`: 新增功能（如 `feat: 增加 DNS 竞速测试`）
- `fix`: 修复问题（如 `fix: 修复 Tab 页面渲染与统一选中高亮`）
- `style`: 样式或日志格式调整（如 `style: 优化终端 API 访问日志中间件`）
- `docs`: 文档变更（如 `docs: 完善 README 说明文档`）

---

## 📄 开源许可与作者信息

本项目由 **[LZ7工作室](https://github.com/LZ7TOP)** 维护与开发，遵循 [MIT License](LICENSE) 协议开源。
