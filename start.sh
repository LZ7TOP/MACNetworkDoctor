#!/bin/bash
# MACNetworkDoctor — 一键启动与热更新控制脚本

cd "$(dirname "$0")"

PORT=19999
echo "正在检查端口 $PORT 占用情况..."

# Check if port is in use and kill previous instance
PID=$(lsof -ti:$PORT 2>/dev/null)
if [ -n "$PID" ]; then
  echo "发现旧控制台实例 (PID: $PID)，正在清理..."
  kill -9 $PID 2>/dev/null
  sleep 0.5
fi

echo "启动 MACNetworkDoctor Web 控制台 (已启用代码热更新)..."
python3 run.py

