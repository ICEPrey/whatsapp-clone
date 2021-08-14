import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@material-ui/core";
import { MdChatBubble } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth } from "../firebase";

function Sidebar() {
  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (EmailValidator.validate(input)) {
    }
  };
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
        <SearchIcon />
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
    </div>
  );
}

export default Sidebar;
