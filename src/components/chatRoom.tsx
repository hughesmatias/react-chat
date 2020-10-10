import React, { useState, EventHandler, SyntheticEvent } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "./chatMessage";

interface ChatRoomInterface {
  messageRef: firebase.firestore.CollectionReference;
  auth: firebase.auth.Auth;
}

interface UserInterface {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

const ChatRoom = ({ messageRef, auth }: ChatRoomInterface) => {
  const query = messageRef.orderBy("createAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const handleMessage = (event: any) => {
    setFormValue(event.target.value);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    await messageRef.add({
      msj: formValue,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: auth.currentUser?.photoURL || false,
      uid: auth.currentUser?.uid || false,
    });

    setFormValue("");
  };

  console.log(messages, "messages");

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
                own={
                  (auth.currentUser && message.uid === auth.currentUser.uid) ||
                  false
                }
              />
            </li>
          ))}
      </ul>
      {auth && (
        <form onSubmit={sendMessage}>
          <input type="text" onChange={handleMessage} value={formValue} />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default ChatRoom;
