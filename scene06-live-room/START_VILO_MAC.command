#!/bin/bash
cd "$(dirname "$0")"
PORT=8765
python3 -m http.server "$PORT" >/tmp/vilo_scene06_server.log 2>&1 &
sleep 1
open "http://localhost:$PORT/vilo_scene06_monte_live_room.html"
