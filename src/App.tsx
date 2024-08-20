import React, { useEffect, useState } from 'react';

const WebSocketComponent: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messageLog, setMessageLog] = useState<string[]>([]);

  useEffect(() => {
    // Create WebSocket connection.
    const websocket = new WebSocket('ws://172.10.10.39:8888');
    setWs(websocket);

    // Connection opened
    websocket.onopen = () => {
      alert('Connected to WebSocket server');
      // websocket.send('Hello Server!'); 
    };

    // Listen for messages
    websocket.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      setMessageLog((prevLog) => [...prevLog, event.data]);
    };

    // Handle errors
    websocket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    // Connection closed
    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup on component unmount
    return () => {
      websocket.close();
    };
  }, []);

  // Function to send a message
  const sendMessage = () => {
    if (ws) {
      ws.send('Another message from client');
    }
  };

  return (
    <div>
      <h1>WebSocket Connection</h1>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        <h2>Message Log:</h2>
        <ul>
          {messageLog.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;
