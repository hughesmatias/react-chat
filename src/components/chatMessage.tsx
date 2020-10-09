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
    <div className={own ? 'sent' : 'received'}>{message.msj}</div>
  );
};

export default ChatMessage;
