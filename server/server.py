from flask import Flask, requests, jsonify

app = Flask(__name__)


@app.route("/send_message")
def send_message():
	pass
