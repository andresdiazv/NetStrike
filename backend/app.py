import subprocess, os, sys
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# Fabian's routes
@app.route('/api/light-scan', methods=['POST'])
def light_scan():
    ip = request.json.get('ip', '').strip()
    if not ip.count('.') == 3 or not all(0 <= int(part) <= 255 for part in ip.split('.')):
        return jsonify({"error": "Invalid IP address"}), 400
    os.system("wget https://github.com/projectdiscovery/nuclei/releases/download/v2.9.15/nuclei_2.9.15_linux_amd64.zip")
    os.system("unzip nuclei_2.9.15_linux_amd64.zip")
    os.system()
    # Execute Nmap. This is a very simple scan. Customize as needed.
    result = subprocess.check_output(['./nuclei','-u', ip], universal_newlines=True) 
    
    return jsonify({"result": result})

# Main's Socket.IO event
@socketio.on('start_scan')
def handle_start_scan(message):
    ip_address = message['ip']
    # Simulate a scan with progress updates
    for progress in range(0, 101, 10):
        scan_result = f"Scanning IP: {ip_address}, Progress: {progress}%"
        socketio.emit('scan_update', {'update': scan_result, 'progress': progress})
        time.sleep(1)  # Simulate time taken for scanning

if __name__ == '__main__':
    socketio.run(app, debug=True)
