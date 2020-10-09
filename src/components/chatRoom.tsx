import React from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "./chatMessage";

interface ChatRoomInterface {
  messageRef: firebase.firestore.CollectionReference;
  auth: firebase.auth.Auth;
}

const ChatRoom = ({ messageRef, auth }: ChatRoomInterface) => {
  const query = messageRef.orderBy("createAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  console.log(messages, 'messages');

  console.log(auth.currentUser, 'currentUser');

  return (
    <div>
      ChatRoom
      <ul>
        {messages &&
          messages.map((message: any) => (
            <li>
              <ChatMessage
                key={message.id}
                message={message}
                own={auth.currentUser && message.uid === auth.currentUser.uid || false}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatRoom;
