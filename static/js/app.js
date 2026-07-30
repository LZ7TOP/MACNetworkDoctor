/* ============================================================
   MACNetworkDoctor — React 18 Single Page Application
   No-Emoji Pure SVG Icons, Unified Tab Selection & Complete Views
   ============================================================ */

const { useState, useEffect, useCallback, useMemo } = React;

const API = '/api';

// ── Pure SVG Icon Components (No Emojis) ────────────────────
const Icons = {
  Activity: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 14 22 10 2 6 12 2 12"/>
    </svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Cpu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/>
    </svg>
  ),
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Terminal: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  Copy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="copy-icon">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Loader: () => (
    <svg className="spin-loader" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Alert: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  Sliders: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  Sun: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Moon: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Monitor: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
};

// ── Theme Switcher Component ────────────────────────────────
function ThemeSwitcher() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('theme_mode') || 'system';
  });

  const applyTheme = useCallback((mode) => {
    let effectiveTheme = mode;
    if (mode === 'system') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = isSystemDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }, []);

  useEffect(() => {
    applyTheme(themeMode);
    localStorage.setItem('theme_mode', themeMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (themeMode === 'system') applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themeMode, applyTheme]);

  return (
    <div className="theme-switcher" title="切换浅色 / 深色 / 系统跟随主题">
      <button
        className={`theme-btn ${themeMode === 'light' ? 'active' : ''}`}
        onClick={() => setThemeMode('light')}
        title="浅色模式"
      >
        <Icons.Sun />
      </button>
      <button
        className={`theme-btn ${themeMode === 'dark' ? 'active' : ''}`}
        onClick={() => setThemeMode('dark')}
        title="深色模式"
      >
        <Icons.Moon />
      </button>
      <button
        className={`theme-btn ${themeMode === 'system' ? 'active' : ''}`}
        onClick={() => setThemeMode('system')}
        title="跟随系统"
      >
        <Icons.Monitor />
      </button>
    </div>
  );
}


// ── Status Badge Component ──────────────────────────────────
function StatusBadge({ status, text }) {
  let badgeClass = 'good';
  let icon = <Icons.Check />;

  if (status === 'bad') {
    badgeClass = 'bad';
    icon = <Icons.Alert />;
  } else if (status === 'warn') {
    badgeClass = 'warn';
    icon = <Icons.Alert />;
  } else if (status === 'info') {
    badgeClass = 'info';
    icon = <Icons.Sliders />;
  }

  return (
    <span className={`status-badge ${badgeClass}`}>
      {icon} <span>{text}</span>
    </span>
  );
}

// ── API Service ─────────────────────────────────────────────
async function fetchApi(path, options = {}) {
  const t0 = performance.now();
  try {
    const res = await fetch(API + path, {
      headers: { 'Accept': 'application/json' },
      ...options,
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    data._latency = Math.round(performance.now() - t0);
    return data;
  } catch (err) {
    return { error: err.message, _latency: Math.round(performance.now() - t0) };
  }
}

// ── Main App Component ──────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('diagnose');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ text: '准备就绪 — 选择诊断项或执行一键修复', type: 'idle' });
  const [clock, setClock] = useState('');
  const [toast, setToast] = useState(null);

  // Calculate Health Score
  const healthScore = useMemo(() => {
    if (!data || activeTab !== 'diagnose' || data.error) return 100;
    let issuesCount = 0;
    if (data.network && (!data.network.ping_baidu && !data.network.http_baidu)) issuesCount++;
    if (data.proxy && (data.proxy.http_proxy || data.proxy.socks_proxy || data.proxy.pac_proxy)) issuesCount++;
    if (data.extensions && (data.extensions.extensions || []).some(e => e.active && e.suspicious)) issuesCount++;
    if (data.chrome_dns && data.chrome_dns.is_problem) issuesCount++;
    return Math.max(0, 100 - issuesCount * 25);
  }, [data, activeTab]);

  useEffect(() => {
    const updateTime = () => {
      setClock(new Date().toLocaleTimeString('zh-CN', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const runDiagnostic = useCallback(async (tabName) => {
    setActiveTab(tabName);
    setLoading(true);

    const labels = {
      diagnose: '正在分析系统代理、网卡连通性、VPN 及 Chrome 配置...',
      network: '正在分析物理网络与 DNS 连通性...',
      latency: '正在并发测试国内外主流节点 HTTP 响应延迟...',
      proxy: '正在检索全局代理设置、活动进程与监听端口...',
      extensions: '正在读取系统网络扩展状态...',
      chrome: '正在检索 Chrome Local State 与 DoH 规则...',
      hosts: '正在解析 /etc/hosts 重定向文件...',
    };

    setStatus({ text: labels[tabName] || '请求中...', type: 'warn' });
    let result = {};
    if (tabName === 'latency') {
      const [resLat, resDns] = await Promise.all([
        fetchApi('/check/latency'),
        fetchApi('/check/dns-benchmark')
      ]);
      result = { ...resLat, ...resDns };
    } else {
      result = await fetchApi(tabName === 'diagnose' ? '/diagnose' : '/check/' + tabName);
    }
    
    setData(result);
    setLoading(false);


    const hasError = result.error || (result.network && result.network.http_baidu === false);
    setStatus({ text: '检测完成', type: hasError ? 'warn' : 'ok' });
  }, []);

  const handleQuickFix = async (fixType) => {
    if (fixType === 'flush-dns') {
      setStatus({ text: '正在刷新系统 DNS 缓存...', type: 'warn' });
      setLoading(true);
      const res = await fetchApi('/fix/flush-dns', { method: 'POST' });
      setLoading(false);
      if (res.success) {
        showToast('DNS 缓存已成功刷新');
        setStatus({ text: 'DNS 缓存刷新完毕', type: 'ok' });
      } else {
        setStatus({ text: '刷新失败: ' + (res.error || '未知错误'), type: 'bad' });
      }
    } else if (fixType === 'disable-proxy') {
      if (!window.confirm('此操作将重置并关停所有活动网卡的系统代理设置，确定继续？')) return;
      setStatus({ text: '正在清理关停系统代理...', type: 'warn' });
      setLoading(true);
      const res = await fetchApi('/fix/disable-proxy', { method: 'POST' });
      setLoading(false);
      if (res.success) {
        showToast(res.message);
        setStatus({ text: '系统代理关停成功', type: 'ok' });
      } else {
        setStatus({ text: '操作失败: ' + (res.error || '未知错误'), type: 'bad' });
      }
    } else if (fixType === 'flush-arp') {
      setStatus({ text: '正在清理 ARP 缓存...', type: 'warn' });
      setLoading(true);
      const res = await fetchApi('/fix/flush-arp', { method: 'POST' });
      setLoading(false);
      if (res.success) {
        showToast('ARP 路由表缓存已重置清理');
        setStatus({ text: 'ARP 缓存清理成功', type: 'ok' });
      }
    } else if (fixType === 'renew-dhcp') {
      setStatus({ text: '正在重置网卡 DHCP 租约...', type: 'warn' });
      setLoading(true);
      const res = await fetchApi('/fix/renew-dhcp', { method: 'POST' });
      setLoading(false);
      if (res.success) {
        showToast(res.message);
        setStatus({ text: 'DHCP 重置成功', type: 'ok' });
      }
    } else if (fixType === 'chrome-dns') {
      if (!window.confirm('确定将 Chrome 安全 DNS 强制重置为 off？\n\n请确保已退出 Chrome (Cmd+Q)。')) return;
      setStatus({ text: '正在重置 Chrome DNS...', type: 'warn' });
      setLoading(true);
      const res = await fetchApi('/fix/chrome-dns', { method: 'POST' });
      setLoading(false);
      if (res.success) {
        showToast('Chrome 安全 DNS 已修复为 off');
        setStatus({ text: 'Chrome DNS 修复成功', type: 'ok' });
      } else {
        setStatus({ text: '修复失败: ' + (res.error || '未知错误'), type: 'bad' });
      }
    }
  };

  const exportReport = () => {
    if (!data) return;
    const timeStr = new Date().toLocaleString('zh-CN');
    let report = `# MACNetworkDoctor — 排错诊断报告\n\n> 导出时间: ${timeStr}\n> 健康评估指数: ${healthScore} / 100\n\n`;

    if (data.network) {
      report += `### 1. 基础网络连通性\n`;
      report += `- 活跃网卡接口: ${data.network.active_if || '未知'}\n`;
      report += `- 本机 IP: ${data.network.ip || '未知'}\n`;
      report += `- 默认网关: ${data.network.gateway || '未知'}\n`;
      report += `- DNS 服务器: ${(data.network.dns || []).join(', ')}\n`;
      report += `- 百度 Ping 状态: ${data.network.ping_baidu ? '可达' : '不可达'}\n\n`;
    }

    if (data.proxy) {
      report += `### 2. 系统代理与 VPN\n`;
      report += `- HTTP 代理: ${data.proxy.http_proxy ? '开启' : '关闭'}\n`;
      report += `- SOCKS 代理: ${data.proxy.socks_proxy ? '开启' : '关闭'}\n`;
      report += `- PAC 代理: ${data.proxy.pac_proxy ? '开启' : '关闭'}\n`;
      report += `- 活动代理进程: ${(data.proxy.processes || []).length} 个\n\n`;
    }

    if (data.chrome_dns) {
      report += `### 3. Chrome Secure DoH 配置\n`;
      report += `- DoH 模式: ${data.chrome_dns.mode || 'not_set'}\n\n`;
    }

    // Download .md file
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `MACNetworkDoctor-Report-${Date.now()}.md`;
    link.click();

    showToast('诊断报告 .md 已成功导出下载');
  };


  useEffect(() => {
    runDiagnostic('diagnose');
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleCopy = (text) => {
    if (!text || text === '?' || text.includes('未')) return;
    const cleanText = String(text).trim();
    navigator.clipboard.writeText(cleanText);
    showToast(`已复制: ${cleanText}`);
  };

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-section">
            <div className="brand-icon">
              <Icons.Activity />
            </div>
            <div className="brand-title">
              <h1>MACNetworkDoctor</h1>
              <p>Mac 专业级网络诊断控制台 · React Powered</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button className="action-btn" onClick={exportReport} title="生成并导出 Markdown 网络诊断报告">
              <Icons.Copy /> 导出诊断报告
            </button>
            <ThemeSwitcher />


            <div className="gauge-card">
              <div className="gauge-ring">
                <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="28" cy="28" r="22" stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="transparent" />
                  <circle
                    cx="28" cy="28" r="22"
                    stroke={healthScore < 60 ? 'var(--red)' : healthScore < 90 ? 'var(--yellow)' : 'var(--green)'}
                    strokeWidth="5" strokeLinecap="round" fill="transparent"
                    strokeDasharray="138.2"
                    strokeDashoffset={138.2 - (healthScore / 100) * 138.2}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                </svg>
                <span className="gauge-score" style={{ color: healthScore < 60 ? 'var(--red)' : healthScore < 90 ? 'var(--yellow)' : 'inherit' }}>
                  {healthScore}
                </span>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Health Index</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: healthScore === 100 ? 'var(--green)' : 'var(--yellow)' }}>
                  {healthScore === 100 ? '健康良好' : healthScore >= 75 ? '存在隐患' : '需重点排查'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* Status Bar */}
      <div className="status-banner">
        <div className="status-inner">
          <span className={`status-dot ${status.type}`}></span>
          <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {status.text}
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>{clock}</span>
        </div>
      </div>

      {/* Navigation Tabs (统一高亮样式) */}
      <div className="control-container">
        <div className="tabs-group">
          <button className={`tab-btn ${activeTab === 'diagnose' ? 'active' : ''}`} onClick={() => runDiagnostic('diagnose')}>
            <Icons.Activity /> 全面诊断
          </button>
          <button className={`tab-btn ${activeTab === 'network' ? 'active' : ''}`} onClick={() => runDiagnostic('network')}>
            <Icons.Globe /> 网络基础
          </button>
          <button className={`tab-btn ${activeTab === 'latency' ? 'active' : ''}`} onClick={() => runDiagnostic('latency')}>
            <Icons.Zap /> 节点测速
          </button>
          <button className={`tab-btn ${activeTab === 'proxy' ? 'active' : ''}`} onClick={() => runDiagnostic('proxy')}>
            <Icons.Shield /> 代理 & VPN
          </button>
          <button className={`tab-btn ${activeTab === 'extensions' ? 'active' : ''}`} onClick={() => runDiagnostic('extensions')}>
            <Icons.Cpu /> 网络扩展
          </button>
          <button className={`tab-btn ${activeTab === 'chrome' ? 'active' : ''}`} onClick={() => runDiagnostic('chrome')}>
            <Icons.Globe /> Chrome DNS
          </button>
          <button className={`tab-btn ${activeTab === 'hosts' ? 'active' : ''}`} onClick={() => runDiagnostic('hosts')}>
            <Icons.Terminal /> Hosts 条目
          </button>
        </div>

        {/* Quick Fix Panel */}
        <div className="quick-fix-panel">
          <span className="quick-fix-title">一键修复工具:</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="action-btn" onClick={() => handleQuickFix('flush-dns')}>
              <Icons.Zap /> 刷新 DNS 缓存
            </button>
            <button className="action-btn" onClick={() => handleQuickFix('disable-proxy')}>
              <Icons.Shield /> 关停系统代理
            </button>
            <button className="action-btn" onClick={() => handleQuickFix('flush-arp')}>
              <Icons.Refresh /> 清理 ARP 缓存
            </button>
            <button className="action-btn" onClick={() => handleQuickFix('renew-dhcp')}>
              <Icons.Refresh /> 重置 DHCP
            </button>
            <button className="action-btn danger-btn" onClick={() => handleQuickFix('chrome-dns')}>
              <Icons.Cpu /> 修复 Chrome DNS
            </button>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {loading ? (
          <div className="loading-box">
            <Icons.Loader />
            <span>正在调用 macOS 系统底层进行诊断...</span>
          </div>
        ) : (
          <DiagnosisView data={data} activeTab={activeTab} onCopy={handleCopy} />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        MACNetworkDoctor macOS Engine v1.6 · React SPA
      </footer>

      {/* Toast Notification */}
      {toast && <div className="toast-msg">{toast}</div>}
    </>
  );
}

// ── Complete Views Component for ALL Tabs ────────────────────
function DiagnosisView({ data, activeTab, onCopy }) {
  if (!data) return null;
  if (data.error) {
    return <div className="alert-box bad">诊断请求异常: {data.error}</div>;
  }

  // 1. 全面诊断 View
  if (activeTab === 'diagnose') {
    const issues = [];
    const net = data.network || {};
    const prx = data.proxy || {};
    const ext = data.extensions || {};
    const cdns = data.chrome_dns || {};

    if (!net.ping_baidu && !net.http_baidu) issues.push('基础物理网络阻断，请检查路由器或 Wi-Fi 连接');
    if (prx.http_proxy || prx.socks_proxy || prx.pac_proxy) issues.push('系统代理处于开启状态，软件关停后可能导致网页无法上网');
    if ((ext.extensions || []).some(e => e.active && e.suspicious)) issues.push('发现活跃可疑网络扩展残留');
    if (cdns.is_problem) issues.push('Chrome 安全 DNS 设置为 Secure DoH，加密节点通畅度影响域名解析');

    return (
      <>
        {issues.length > 0 ? (
          <div className="alert-box warn">
            <div style={{ fontWeight: 700, marginBottom: '6px' }}>检出 {issues.length} 项潜在异常因素:</div>
            <ul>{issues.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
          </div>
        ) : (
          <div className="alert-box ok">诊断完成！系统代理与基础网络环境健康良好</div>
        )}

        <div className="card-grid">
          {/* Network */}
          <GlassCard title="网络基础连通性" icon={<Icons.Globe />}>
            <InfoRow label="活跃网络接口" val={net.active_if || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="本机 IP 地址" val={net.ip || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="默认网关" val={net.gateway || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="DNS 服务器" val={(net.dns || []).join(', ') || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="百度 Ping" val={net.ping_baidu ? '可达' : '不可达'} status={net.ping_baidu ? 'good' : 'bad'} onCopy={onCopy} />
            <InfoRow label="百度 HTTPS" val={net.http_baidu ? '正常' : '失败'} status={net.http_baidu ? 'good' : 'bad'} onCopy={onCopy} />
          </GlassCard>

          {/* Proxy */}
          <GlassCard title="系统代理状态" icon={<Icons.Shield />}>
            <InfoRow label="HTTP / SOCKS 代理" val={prx.http_proxy || prx.socks_proxy ? '开启中' : '全部关闭'} status={prx.http_proxy || prx.socks_proxy ? 'bad' : 'good'} onCopy={onCopy} />
            <InfoRow label="代理进程" val={prx.processes?.length ? `发现 ${prx.processes.length} 个` : '无活动进程'} status={prx.processes?.length ? 'bad' : 'good'} onCopy={onCopy} />
            <InfoRow label="代理监听端口" val={prx.proxy_ports?.length ? `监听 ${prx.proxy_ports.length} 个` : '无'} status={prx.proxy_ports?.length ? 'warn' : 'good'} onCopy={onCopy} />
          </GlassCard>

          {/* Extensions */}
          <GlassCard title="系统网络扩展" icon={<Icons.Cpu />}>
            <InfoRow label="扩展总计" val={`${(ext.extensions || []).length} 个`} status="info" onCopy={onCopy} />
            <InfoRow label="活跃可疑项" val={(ext.extensions || []).some(e => e.active && e.suspicious) ? '发现异常项' : '纯净'} status={(ext.extensions || []).some(e => e.active && e.suspicious) ? 'bad' : 'good'} onCopy={onCopy} />
          </GlassCard>

          {/* Chrome DNS */}
          <GlassCard title="Chrome 安全 DNS" icon={<Icons.Globe />}>
            <InfoRow label="DoH 模式" val={cdns.mode === 'secure' ? 'secure (加密强制)' : cdns.mode || 'not_set'} status={cdns.mode === 'secure' ? 'bad' : 'good'} onCopy={onCopy} />
          </GlassCard>
        </div>

        {/* Process Detail */}
        {prx.processes?.length > 0 && (
          <div className="glass-card full-width" style={{ marginTop: '18px' }}>
            <div className="card-header"><Icons.Terminal /> 代理进程列表明细</div>
            <div className="code-wrapper">{prx.processes.map(p => `[${p.app}] ${p.detail}`).join('\n')}</div>
          </div>
        )}
      </>
    );
  }

// ── Port Probe Helper Component ─────────────────────────────
function PortProbe({ onCopy }) {
  const [host, setHost] = useState('127.0.0.1');
  const [port, setPort] = useState('8080');
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = async (e) => {
    e.preventDefault();
    if (!host || !port) return;
    setTesting(true);
    setResult(null);
    const res = await fetchApi('/check/port', {
      method: 'POST',
      body: JSON.stringify({ host, port: parseInt(port, 10) })
    });
    setTesting(false);
    setResult(res);
  };

  return (
    <div className="glass-card full-width" style={{ marginTop: '18px' }}>
      <div className="card-header"><Icons.Zap /> TCP 端口连通性握手测试器</div>
      <form onSubmit={handleTest} style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={host}
          onChange={e => setHost(e.target.value)}
          placeholder="Host (如 127.0.0.1 / localhost / baidu.com)"
          style={{ flex: 2, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.15)', color: 'inherit', fontFamily: 'var(--mono)', fontSize: '0.86rem' }}
        />
        <input
          type="number"
          value={port}
          onChange={e => setPort(e.target.value)}
          placeholder="Port (如 80 / 8080 / 6379)"
          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.15)', color: 'inherit', fontFamily: 'var(--mono)', fontSize: '0.86rem' }}
        />
        <button type="submit" className="action-btn" disabled={testing}>
          {testing ? <Icons.Loader /> : <Icons.Zap />} {testing ? '测试中...' : '检测端口'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '12px' }}>
          <InfoRow
            label={`Socket 握手 [${result.host}:${result.port}]`}
            val={result.open ? `${result.message}` : `握手失败: ${result.error || result.message}`}
            status={result.open ? 'good' : 'bad'}
            onCopy={onCopy}
          />
        </div>
      )}
    </div>
  );
}

// 2. 网络基础 View
  if (activeTab === 'network') {
    return (
      <>
        <div className="card-grid">
          <GlassCard title="网络基础连通性明细" icon={<Icons.Globe />}>
            <InfoRow label="活跃接口" val={data.active_if || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="本机 IP" val={data.ip || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="默认网关" val={data.gateway || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="DNS 服务器" val={(data.dns || []).join(', ') || '?'} status="good" onCopy={onCopy} />
            <InfoRow label="百度 Ping" val={data.ping_baidu ? '可达' : '不可达'} status={data.ping_baidu ? 'good' : 'bad'} onCopy={onCopy} />
            <InfoRow label="8.8.8.8 Ping" val={data.ping_google ? '可达' : '不可达'} status={data.ping_google ? 'good' : 'warn'} onCopy={onCopy} />
            <InfoRow label="百度 HTTPS 连接" val={data.http_baidu ? '正常' : '失败'} status={data.http_baidu ? 'good' : 'bad'} onCopy={onCopy} />
          </GlassCard>
        </div>

        <PortProbe onCopy={onCopy} />
      </>
    );
  }


  // 3. 节点 Latency & DNS Benchmark 测速 View
  if (activeTab === 'latency') {
    const targets = data.targets || [];
    const dnsServers = data.dns_servers || [];

    return (
      <div className="card-grid">
        <GlassCard title="国内外核心节点 HTTP 响应测速" icon={<Icons.Zap />}>
          {targets.map((t, idx) => (
            <InfoRow
              key={idx}
              label={t.name}
              val={t.ok ? `${t.latency} ms` : '超时/不可达'}
              status={!t.ok ? 'bad' : t.latency < 150 ? 'good' : t.latency < 400 ? 'warn' : 'bad'}
              onCopy={onCopy}
            />
          ))}
        </GlassCard>

        <GlassCard title="主流公共 DNS 解析耗时 Benchmark (dig)" icon={<Icons.Globe />}>
          {dnsServers.length > 0 ? (
            dnsServers.map((d, idx) => (
              <InfoRow
                key={idx}
                label={d.name}
                val={d.ok ? `${d.latency} ms (${d.ip_result || '解析正常'})` : '解析超时'}
                status={!d.ok ? 'bad' : d.latency < 50 ? 'good' : d.latency < 120 ? 'warn' : 'bad'}
                onCopy={onCopy}
              />
            ))
          ) : (
            <InfoRow label="DNS 竞速" val="正在并发评估 5 大公共 DNS..." status="info" onCopy={onCopy} />
          )}
        </GlassCard>
      </div>
    );
  }


  // 4. 代理 & VPN View
  if (activeTab === 'proxy') {
    const procs = data.processes || [];
    const ports = (data.proxy_ports || []).filter(Boolean);
    const vpns = data.vpn || [];

    // Extract first proxy port for terminal export helper
    let exportCmd = '';
    const matchPort = ports[0]?.match(/:(\d+)/);
    if (matchPort) {
      const portNum = matchPort[1];
      exportCmd = `export http_proxy=http://127.0.0.1:${portNum}; export https_proxy=http://127.0.0.1:${portNum}`;
    }

    return (
      <>
        <div className="card-grid">
          <GlassCard title="系统代理状态" icon={<Icons.Shield />}>
            <InfoRow label="HTTP 代理" val={data.http_proxy ? '开启' : '关闭'} status={data.http_proxy ? 'bad' : 'good'} onCopy={onCopy} />
            <InfoRow label="SOCKS 代理" val={data.socks_proxy ? '开启' : '关闭'} status={data.socks_proxy ? 'bad' : 'good'} onCopy={onCopy} />
            <InfoRow label="PAC 代理" val={data.pac_proxy ? '开启' : '关闭'} status={data.pac_proxy ? 'bad' : 'good'} onCopy={onCopy} />
            <InfoRow label="代理进程" val={procs.length ? `发现 ${procs.length} 个` : '无活动进程'} status={procs.length ? 'bad' : 'good'} onCopy={onCopy} />
          </GlassCard>

          <GlassCard title="VPN 连接状态" icon={<Icons.Shield />}>
            {vpns.length > 0 ? (
              vpns.map((v, i) => (
                <InfoRow key={i} label={v.text} val={v.connected ? '已连接' : '已断开'} status={v.connected ? 'bad' : 'good'} onCopy={onCopy} />
              ))
            ) : (
              <InfoRow label="VPN 接口" val="无活动 VPN" status="good" onCopy={onCopy} />
            )}
          </GlassCard>
        </div>

        {exportCmd && (
          <div className="glass-card full-width" style={{ marginTop: '18px' }}>
            <div className="card-header"><Icons.Terminal /> 终端 Terminal 一键代理命令</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '8px' }}>检测到监听代理端口，点击下方命令可直接复制到 macOS 终端生效：</div>
            <div className="code-wrapper" style={{ cursor: 'pointer' }} onClick={() => onCopy(exportCmd)}>
              {exportCmd}
            </div>
          </div>
        )}

        {procs.length > 0 && (
          <div className="glass-card full-width" style={{ marginTop: '18px' }}>
            <div className="card-header"><Icons.Terminal /> 活动代理进程明细</div>
            <div className="code-wrapper">{procs.map(p => `[${p.app}] ${p.detail}`).join('\n')}</div>
          </div>
        )}
        {ports.length > 0 && (
          <div className="glass-card full-width" style={{ marginTop: '18px' }}>
            <div className="card-header"><Icons.Terminal /> 代理端口监听明细</div>
            <div className="code-wrapper">{ports.join('\n')}</div>
          </div>
        )}
      </>
    );
  }

  // 5. 网络扩展 View
  if (activeTab === 'extensions') {
    const exts = data.extensions || [];
    const activeSuspicious = exts.filter(e => e.active && e.suspicious);

    return (
      <div className="glass-card full-width">
        <div className="card-header"><Icons.Cpu /> 系统网络扩展列表 ({exts.length} 个)</div>
        {activeSuspicious.length > 0 && (
          <div className="alert-box warn">
            检出 {activeSuspicious.length} 个活跃可疑网络扩展 (如网络异常，可在 macOS 系统设置 → 登录项与扩展 中关停)
          </div>
        )}
        {exts.length === 0 ? (
          <div style={{ color: 'var(--green)', padding: '12px 0' }}>未加载任何第三方网络扩展</div>
        ) : (
          <div className="code-wrapper">
            {exts.map(e => `[${e.active ? 'ACTIVE' : e.terminated ? 'TERMINATED' : 'INACTIVE'}] ${e.text}`).join('\n')}
          </div>
        )}
      </div>
    );
  }

  // 6. Chrome DNS View
  if (activeTab === 'chrome') {
    if (!data.exists) {
      return <div className="alert-box info">未安装 Google Chrome，无需解析 Chrome 配置文件</div>;
    }
    const isBad = data.mode === 'secure';

    return (
      <div className="card-grid">
        <GlassCard title="Chrome Secure DNS (DoH)" icon={<Icons.Globe />}>
          <InfoRow label="DoH 模式" val={data.mode || 'not_set'} status={isBad ? 'bad' : 'good'} onCopy={onCopy} />
          <InfoRow label=" DoH 模板 URL" val={data.templates || '无'} status={data.templates ? 'warn' : 'good'} onCopy={onCopy} />
          <InfoRow label="运行状态" val={data.chrome_running ? 'Chrome 运行中 (修复前请退出)' : 'Chrome 已完全退出'} status={data.chrome_running ? 'warn' : 'good'} onCopy={onCopy} />
        </GlassCard>
      </div>
    );
  }

  // 7. Hosts View
  if (activeTab === 'hosts') {
    const entries = data.entries || [];
    return (
      <div className="glass-card full-width">
        <div className="card-header"><Icons.Terminal /> /etc/hosts 自定义域名解析条目 ({entries.length} 条)</div>
        {entries.length === 0 ? (
          <div style={{ color: 'var(--green)', padding: '12px 0' }}>/etc/hosts 文件纯净，无自定义重定向解析记录</div>
        ) : (
          <div className="code-wrapper">{entries.map(e => `${e.ip}\t${e.hosts}`).join('\n')}</div>
        )}
      </div>
    );
  }

  return null;
}


// ── Card Helper Components ─────────────────────────────────
function GlassCard({ title, icon, children }) {
  return (
    <div className="glass-card">
      <div className="card-header">
        {icon} <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, val, status, onCopy }) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <StatusBadge status={status || 'good'} text={val} />
        <span onClick={() => onCopy(val)} style={{ cursor: 'pointer', display: 'inline-flex' }} title="点击复制">
          <Icons.Copy />
        </span>
      </div>
    </div>
  );
}

// Render React Root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}




