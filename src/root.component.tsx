/* export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
} */

import React from 'react';
import { sendMessage, getMessage } from '@verint/utils';

const App2 = (props: any) => {
  const [messages, setMessages] = React.useState<any[]>([]);

  React.useEffect(() => {
    const subscription = getMessage().subscribe((msg: any) => {
      if(msg.from === "App1"){
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendMsg = () => {
    sendMessage({ from: 'App2', text: `Hello from App2 ${new Date(Date.now()).toString()}` });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h1>App2</h1>
      <section>{props.name} is mounted!</section>
      <button onClick={sendMsg}>Send Message to app1</button>
      <p>Messages from app1:</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App2;