import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Avatar from "@material-ui/core/Avatar";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRouter } from "next/router";

function Chat({ id, users }: any) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const enterChat = () => router.push(`/chat/${id}`);

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  return (
    <div
      onClick={enterChat}
      className="flex items-center cursor-pointer p-1 break-words hover:text-gray-400"
    >
      {recipient ? (
        <Avatar className="m-5x mr-15px" src={recipient?.photoURL} />
      ) : (
        <Avatar className="m-5x mr-15px" src={recipientEmail[0]} />
      )}
      <p>{recipientEmail}</p>
    </div>
  );
}

export default Chat;
