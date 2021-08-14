import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Avatar from "@material-ui/core/Avatar";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({ id, users }: any) {
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  return (
    <div className="flex items-center cursor-pointer p-1 break-words hover:text-gray-400">
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
