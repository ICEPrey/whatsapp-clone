import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import { MdAttachFile } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import styled from "styled-components";
import MicIcon from "@material-ui/icons/Mic";
import firebase from "firebase";

function ChatScreen({ chat, messages }: any) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => {
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />;
      });
    } else {
      return JSON.parse(messages).map((message: any) => {
        <Message key={message.id} user={message.user} message={message} />;
      });
    }
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    // update last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  return (
    <div>
      <div className="h-5 items-center border-b-1 sticky bg-white z-100 top-0 flex p-1">
        <Avatar />
        <div className="ml-4f flex-1">
          <h3 className="mb-1">Rec Email</h3>
          <p className="text-base text-gray-700	">Last Seen...</p>
        </div>
        <div>
          <IconButton>
            <MdAttachFile />
          </IconButton>
          <IconButton>
            <FiMoreVertical />
          </IconButton>
        </div>
      </div>
      <div className="p-8 bg-white min-h-1">
        {showMessages()}
        <div />
      </div>
      <form className="flex items-center p-3 sticky bottom-0 bg-white z-100">
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </form>
    </div>
  );
}

export default ChatScreen;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;
