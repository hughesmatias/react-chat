import React from 'react';

interface ChatMessage {
  message: any;
  own: boolean;
};

const ChatMessage = ({
  message,
  own,
}: ChatMessage) => {
  return (
    <div className={own ? 'sent' : 'received'}>
      <img src={message.photoURL} alt=""/>
      <p>{message.msj}</p>
    </div>
  );
};

export default ChatMessage;
