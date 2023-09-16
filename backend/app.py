import subprocess
import os
import sys
import json
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO
from xml.etree import ElementTree as ET
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# Check if the required tools are installed


def is_tool_installed(tool):
    if os.name == 'posix':  # UNIX, Linux, macOS
        return subprocess.run(['which', tool], stdout=subprocess.PIPE, stderr=subprocess.PIPE).returncode == 0
    elif os.name == 'nt':  # Windows
        return subprocess.run(['where', tool], stdout=subprocess.PIPE, stderr=subprocess.PIPE).returncode == 0


# Only proceed if nmap and nuclei are installed
if not is_tool_installed('nmap') or not is_tool_installed('nuclei'):
    sys.exit("Error: nmap and nuclei must be installed to use this script.")


def perform_nmap_scan(ip):
    try:
        result = subprocess.check_output(
            ['nmap', '-oX', '-', ip], universal_newlines=True)
    except subprocess.CalledProcessError as e:
        print("Error:", e)
        print("Output:", e.output)
    return parse_nmap_result(result)
    result = subprocess.check_output(
        ['./nuclei', '-u', ip], universal_newlines=True)
    return json.dumps({"result": result})


def perform_nuclei_scan(ip):
    try:
        result = subprocess.check_output(
            ['./nuclei', '-u', ip], universal_newlines=True)
        return json.dumps({"result": result})
    except subprocess.CalledProcessError as e:
        app.logger.error("Nuclei scan failed: %s", e)
        app.logger.error("Output: %s", e.output)
        return json.dumps({"error": "Nuclei scan failed"})


def parse_nmap_result(result):
    tree = ET.fromstring(result)
    scan_summary = {
        "IP": ip,
        "OpenPorts": [port.attrib['portid'] for port in tree.findall(".//port[@state='open']")],
    }
    return json.dumps(scan_summary)


@app.route('/api/light-scan', methods=['POST'])
def light_scan():
    ip = request.json.get('ip', '').strip()
    selected_scans = request.json.get('selectedScans', {})

    if not ip.count('.') == 3 or not all(0 <= int(part) <= 255 for part in ip.split('.')):
        app.logger.warning("Invalid IP address: %s", ip)
        return jsonify({"error": "Invalid IP address"}), 400

    response_data = {}

    if selected_scans.get('nmap'):
        response_data['nmap'] = perform_nmap_scan(ip)

    if selected_scans.get('nuclei'):
        response_data['nuclei'] = perform_nuclei_scan(ip)

    return jsonify(response_data)


if __name__ == '__main__':
    app.run(debug=True)
