import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@material-ui/core";
import { MdChatBubble } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);
  const createChat = (): string => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail: string) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: string) => user === recipientEmail)
          ?.length > 0
    );

  return (
    <div>
      <div className="flex sticky top-0 bg-white justify-between items-center p-4 h-20 z-1">
        <FaUserCircle
          className="cursor-pointer"
          onClick={() => auth.signOut()}
          size={30}
        />
        <MdChatBubble size={30} />
        <FiMoreVertical size={30} />
      </div>
      <div className="rounded-sm flex items-center p-1">
        <BsSearch size={30} />
        <input
          className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search For Chat"
        />
      </div>
      <Button className="w-full" onClick={createChat}>
        Start A New Chat
      </Button>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} user={chat.data().users} />
      ))}
    </div>
  );
}

export default Sidebar;
