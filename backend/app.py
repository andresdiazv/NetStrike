import subprocess
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)


app = Flask(__name__)
CORS(app)




@app.route('/msfdeploy', methods=['GET'])
def msf_deploy():
    result = subprocess.check_output(["msfconsole"], universal_newlines=True)
    return jsonify({"command_output": result.strip()})



@app.route('/api/light-scan', methods=['POST'])
def light_scan():
    # The command below just fetches the current directory
    # Using subprocess to run command
    ip = request.json.get('ip', '').strip()
    if not ip.count('.') == 3 or not all(0 <= int(part) <= 255 for part in ip.split('.')):
        return jsonify({"error": "Invalid IP address"}), 400

    # Execute Nmap. This is a very simple scan. Customize as needed.
    result = subprocess.check_output(['nmap', '-Pn', '-sV', '-oA', "results-scan" , ip], universal_newlines=True) 
    
    return jsonify({"result": result})


if __name__ == '__main__':
    app.run(debug=True)
