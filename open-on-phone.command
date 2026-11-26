#!/bin/bash
# Double-click this file to put the site online and get a shareable link.
cd "$(dirname "$0")" || exit 1

PORT=8000
echo "Starting the site on port $PORT…"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!
sleep 1

echo
echo "Local:  http://127.0.0.1:$PORT/"
echo "On the same Wi-Fi: http://$(ipconfig getifaddr en0 2>/dev/null):$PORT/"
echo
echo "Making a public link (takes a few seconds)…"
echo "Keep this window open while you use it. Close it to go offline."
echo "---------------------------------------------------------------"

trap 'kill $SERVER_PID 2>/dev/null' EXIT
cloudflared tunnel --url "http://127.0.0.1:$PORT" --no-autoupdate 2>&1 | grep --line-buffered -E "trycloudflare.com|ERR"
