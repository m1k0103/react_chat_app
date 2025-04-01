import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { useState, useEffect } from "react";
import './App.css';
import { handleMessageChange } from './func.js'


function MessageBlock(messages){
  return messages.map((m) => (
    <p>{m}</p>))
  
}


function App() {
  const socket = io()
  const [message,setMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])

  //  ---------- functions ----------
  function handleNewMessageSend(){
    socket.emit("message", message)
    setAllMessages(allMessages.push(message))
    setMessage("")
    console.log("cleared")

  }

  // ---------- sockets ----------
  socket.emit("connection", () => {
    console.log("connected")
  })

  socket.on("newmessage", (message_json) => {
    var data = JSON.parse(message_json)
    setAllMessages(allMessages.append(data.message))
    console.log(`new message ${data.message} recieved`)
  })

  
  return (
    <>
    <div>
      <p>Current message: {message}</p>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => handleNewMessageSend()}>Change message</button>
      {allMessages.length ? (<MessageBlock messages={allMessages}/>) :
      (<p></p>)
      }
      
    </div>
    </>
    )
}

export default App;
