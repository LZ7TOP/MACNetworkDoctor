#!/bin/bash
# 一键启动 Network Doctor
cd "$(dirname "$0")"
python3 run.py &
sleep 1.5
open http://localhost:19999
wait
