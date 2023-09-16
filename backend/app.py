from flask import Flask, render_template
from flask_socketio import SocketIO
import time

app = Flask(__name__)
socketio = SocketIO(app)

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
