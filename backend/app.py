import subprocess
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# Fabian's routes
@app.route('/msfdeploy', methods=['GET'])
def msf_deploy():
    result = subprocess.check_output(["msfconsole"], universal_newlines=True)
    return jsonify({"command_output": result.strip()})

@app.route('/api/light-scan', methods=['POST'])
def light_scan():
    ip = request.json.get('ip', '').strip()
    if not ip.count('.') == 3 or not all(0 <= int(part) <= 255 for part in ip.split('.')):
        return jsonify({"error": "Invalid IP address"}), 400

    # Execute Nmap. This is a very simple scan. Customize as needed.
    result = subprocess.check_output(['nmap', '-Pn', '-sV', '-oA', "results-scan" , ip], universal_newlines=True) 
    
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
