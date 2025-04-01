from flask import Flask, request, jsonify
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/send_message")
def send_message():
	pass

@socketio.on("connection")
def connect():
	print("new connection")


@socketio.on("message")
def newmessage(message):
	socketio.emit("newmessage",{"message":message})
	print(f"emitted new message: {message}")