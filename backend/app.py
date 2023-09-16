import subprocess, os, sys
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO
import time
import shutil

def is_tool(name):
    """Check whether `name` is on PATH and marked as executable."""
    return shutil.which(name) is not None

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# Fabian's routes
@app.route('/api/light-scan', methods=['POST'])
def nuclei_scan():
    ip = request.json.get('ip', '').strip()
    if not ip.count('.') == 3 or not all(0 <= int(part) <= 255 for part in ip.split('.')):
        return jsonify({"error": "Invalid IP address"}), 400
    tool = "nuclei"
    if not os.path.exists(tool):
        os.system("wget https://github.com/projectdiscovery/nuclei/releases/download/v2.9.15/nuclei_2.9.15_linux_amd64.zip")
        os.system("unzip nuclei_2.9.15_linux_amd64.zip")
        os.system("chmod +x nuclei")
    result = subprocess.check_output(['./nuclei',"-nc" , '-u', ip], universal_newlines=True)
    return jsonify({"result": result})

@app.route('/api/nmap-scan', methods=['POST'])
def nmap_scan():
    ip = request.json.get('ip', '').strip()
    if not ip.count('.') == 3 or not all(0 <= int(part) <= 255 for part in ip.split('.')):
        return jsonify({"error": "Invalid IP address"}), 400
    result = subprocess.check_output(['nmap',"-Pn","-sV" , "-sC", ip], universal_newlines=True)
    return jsonify({"result": result})

@app.route('/api/tls-scan', methods=['POST'])
def tls_scan():
    ip = request.json.get('ip', '').strip()
    if not ip.count('.') == 3 or not all(0 <= int(part) <= 255 for part in ip.split('.')):
        return jsonify({"error": "Invalid IP address"}), 400
    tool = "testssl.sh"
    if not os.path.exists(tool):
        os.system("wget https://github.com/drwetter/testssl.sh/blob/3.2/testssl.sh")
        os.system("chmod +x testssl.sh")
    result = subprocess.check_output(['./testssl.sh','-u', ip], universal_newlines=True)
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