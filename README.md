# Network Doctor — Mac 专业级网络诊断 Web 控制台

`Network Doctor` 是一款专为 macOS 开发者与系统管理员打造的高性能网络排错与一键修复控制台。通过 Python 异步并发诊断引擎与现代 **React 18** 暗黑拟态单页应用 (SPA)，快速排查系统代理遗留、VPN 断流、DNS 解析污染、Chrome Secure DoH 阻断以及 `/etc/hosts` 重定向异常。

---

## 核心特性亮点

- ⚡ **React 18 现代化控制台**：纯正 React 18 Component + Hooks 状态流驱动，搭配 Linear / Vercel 风格暗黑 Glassmorphism 拟态界面与全矢量 SVG 图标（零 Emoji 干扰）。
- 🩺 **全维度异步并发诊断**：内置 macOS 原生 CLI 诊断引擎（`ifconfig`, `scutil`, `networksetup`, `lsof`, `dig`, `ping`, `curl`），支持 6 大核心模块毫秒级全量排查。
- 🔧 **一键修复工具箱 (Quick-Fix Toolbox)**：
  - **刷新系统 DNS 缓存**：调用 `dscacheutil` 与 `mDNSResponder` 彻底更新域名解析记录。
  - **一键关停系统代理**：自动扫描所有活动网卡并强制关闭 HTTP/HTTPS/SOCKS/PAC 代理。
  - **重置 Chrome 安全 DNS (DoH)**：解析并自动修复 Chrome `Local State` 中强制 Secure DoH 造成的域名卡顿。
  - **清理 ARP 路由表缓存**：快速重置 ARP 缓存，解决路由器更换或局域网 MAC 地址碰撞问题。
- 📊 **节点响应与 DNS 竞速测试 (Benchmark)**：
  - 并发测速国内外主流 HTTP 站点 (百度, 淘宝, GitHub, Cloudflare 1.1.1.1, Google 8.8.8.8)。
  - 并发测速 5 大主流公共 DNS 解析延迟并实时推荐最优服务器。
- 💻 **Terminal 终端代理 export 命令生成**：自动检测 Clash / Surge 等本地代理监听端口，生成一键复制命令供终端一键启用代理。
- 🔄 **代码热更新 (Hot Reload Enabled)**：服务继承 Uvicorn 热更新引擎，任何代码修改即刻无感重载；内置优雅的端口清理与控制台日志中间件。

---

## 目录结构

```text
network-doctor/
├── api/                   # FastAPI 后端路由 & API 端点
│   ├── __init__.py
│   └── app.py             # 路由注册与 HTTP 实时日志中间件
├── diagnostics/           # 异步 CLI 诊断引擎
│   ├── __init__.py        # 引擎导出
│   ├── network.py         # 物理网络、Ping、HTTP & DNS 竞速测速
│   ├── proxy.py           # 系统代理、活动代理进程与 VPN 状态
│   ├── extensions.py      # 系统网络扩展分析
│   ├── chrome.py          # Chrome Secure DoH 配置解析与修复
│   ├── hosts.py           # /etc/hosts 自定义解析条目分析
│   ├── fix.py             # 快捷修复工具 (DNS/Proxy/ARP/Chrome)
│   └── utils.py           # 异步 Shell 运行器与 TTL 缓存机制
├── static/                # React 18 前端静态资源
│   ├── index.html         # 单页应用挂载入口
│   ├── css/app.css        # Linear 暗黑风格 Glassmorphism CSS 规则
│   └── js/app.js          # React 18 组件化 SPA 逻辑
├── run.py                 # Python 启动入口 (已支持 Hot Reload)
├── start.sh               # macOS 一键启动与端口清理脚本
├── requirements.txt       # 项目 Python 依赖
├── README.md              # 项目完整说明文档
└── .gitignore             # Git 忽略配置
```

---

## 快速开始

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
   *脚本会自动检查并释放 19999 端口占用，并开启 Web 控制台。*

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

## API 路由规范

后端基于 FastAPI 提供高效的 RESTful JSON 接口：

### 诊断数据接口 (GET)

| 接口地址 | 说明 | 诊断内容 |
| :--- | :--- | :--- |
| `GET /api/diagnose` | **全面并发诊断** | 并发执行所有模块检查并计算系统健康指数 |
| `GET /api/check/network` | 网络基础检查 | 活跃接口、IP 地址、默认网关与连通性 |
| `GET /api/check/latency` | 核心节点测速 | 国内外主流 HTTP 站点响应耗时 |
| `GET /api/check/dns-benchmark` | 公共 DNS 竞速 | 阿里、腾讯、Cloudflare 等 DNS 解析速度对比 |
| `GET /api/check/proxy` | 代理与 VPN 检测 | 系统代理状态、活动代理进程与监听端口 |
| `GET /api/check/extensions` | 网络扩展检查 | 系统网络扩展及其可疑状态检测 |
| `GET /api/check/chrome` | Chrome DoH 检查 | Chrome Secure DoH 设置及运行状态 |
| `GET /api/check/hosts` | Hosts 条目分析 | `/etc/hosts` 中非默认域名重定向解析 |

### 一键修复接口 (POST)

| 接口地址 | 说明 | 底层操作命令 |
| :--- | :--- | :--- |
| `POST /api/fix/flush-dns` | 刷新 macOS 系统 DNS 缓存 | `dscacheutil -flushcache; killall -HUP mDNSResponder` |
| `POST /api/fix/disable-proxy` | 强制关停活动接口系统代理 | `networksetup -setwebproxystate / -setsecurewebproxystate ... off` |
| `POST /api/fix/flush-arp` | 清理 ARP 路由表缓存 | `sudo arp -d -a` |
| `POST /api/fix/chrome-dns` | 修复 Chrome 安全 DNS | 修改 Chrome `Local State` 文件中 `dns_over_https.mode` 为 `"off"` |

---


## Git 提交规范 (Commit Standards)

为保持项目代码提交记录的清晰干净，请遵循统一的中文 Commit 提交标准：

- `feat`: 新增功能（如 `feat: 增加 DNS 竞速测试`）
- `fix`: 修复问题（如 `fix: 修复 Tab 页面渲染与统一选中高亮`）
- `style`: 样式或日志格式调整（如 `style: 优化终端 API 访问日志中间件`）
- `docs`: 文档变更（如 `docs: 完善 README 说明文档`）

---

## 开源许可

[MIT License](LICENSE)
