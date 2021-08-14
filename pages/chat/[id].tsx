import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { db, auth } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({ chat, messages }: any) {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <div className="flex">
        <ChatScreen chat={chat} messages={messages} />
      </div>
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context: any) {
  const ref = db.collection("chats").doc(context.query.id);

  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messageRes.docs
    .map((doc) => [
      {
        id: doc.id,
        ...doc.data(),
      },
    ])
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
