import subprocess
import os
import sys
import json
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
import ipaddress
import platform

app = Flask(__name__)
CORS(app)


def is_valid_ipv4(ip):
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False


def download_nuclei_if_needed():
    if not os.path.exists("nuclei"):
        if platform.system() == 'Windows':
            # Download and unzip nuclei for Windows
            os.system(
                "curl -LO https://github.com/projectdiscovery/nuclei/releases/download/v2.9.15/nuclei_2.9.15_windows_amd64.zip")
            os.system("tar -xf nuclei_2.9.15_windows_amd64.zip")
        else:
            os.system(
                "wget https://github.com/projectdiscovery/nuclei/releases/download/v2.9.15/nuclei_2.9.15_linux_amd64.zip")
            os.system("unzip nuclei_2.9.15_linux_amd64.zip")
            os.system("chmod +x nuclei")


@app.route('/api/light-scan', methods=['POST'])
def light_scan():
    ip = request.json.get('ip', '').strip()

    if not is_valid_ipv4(ip):
        return jsonify({"error": "Invalid IP address"}), 400

    try:
        if platform.system() == 'Windows':
            result = subprocess.check_output([r'C:\Program Files (x86)\Nmap\nmap.exe', '-p', "80", "-Pn", ip], universal_newlines=True)
        else:
            result = subprocess.check_output(['nmap', '-p', "80", "-Pn", ip], universal_newlines=True)
        return jsonify({"result": result})
    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error during nmap scan: {e.output}"}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500



@app.route('/api/nuclei-scan', methods=['POST'])
def nuclei_scan():
    ip = request.json.get('ip', '').strip()

    if not is_valid_ipv4(ip):
        return jsonify({"error": "Invalid IP address"}), 400

    download_nuclei_if_needed()
    
    try:
        if platform.system() == 'Windows':
            result = subprocess.check_output([r'C:\Users\Axddr\OneDrive\Desktop\New folder\nuclei.exe', '-u', ip], universal_newlines=True)
        else:
            result = subprocess.check_output(['./nuclei', '-u', ip], universal_newlines=True)
        return jsonify({"result": result})
    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error during nuclei scan: {e.output}"}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
