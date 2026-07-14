@echo off
cd /d %~dp0
start "VILO SERVER" python -m http.server 8765
timeout /t 2 /nobreak >nul
start "" http://localhost:8765/vilo_scene06_monte_live_room.html
