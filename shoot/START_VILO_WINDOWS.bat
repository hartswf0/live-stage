@echo off
cd /d %~dp0
start "" http://localhost:8787/vilo_live_room_simple.html
py -m http.server 8787
