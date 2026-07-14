#!/bin/bash
cd "$(dirname "$0")"
PORT=8787
python3 -m http.server "$PORT" >/tmp/vilo_live_room.log 2>&1 &
SERVER_PID=$!
sleep 1
open "http://localhost:$PORT/vilo_live_room_simple.html"
echo "Vilo Live Room is running. Keep this window open during the shoot."
echo "Press Control-C when finished."
trap 'kill $SERVER_PID 2>/dev/null' EXIT INT TERM
wait $SERVER_PID
