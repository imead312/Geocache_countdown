#!/bin/bash

check_screen() {
    screen -S perthAppServer -X select .
    return $?
}

if check_screen; 
then
    echo "perthAppServer already running, switch using 'screen -r perthAppServer'"
else
    echo "Starting new screen session..."
    cd /Users/isaacmead/Code/JavaScript/perthCountdown/public || echo "Directory not found, no server created."
    screen -dmS perthAppServer python -m http.server || echo "Error creating HTTP server"
    echo "Server started successfully on port 8000. Use 'screen -r server' to reconnect."
fi
