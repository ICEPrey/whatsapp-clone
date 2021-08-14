import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function ChatScreen({ chat, messages }: any) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  return (
    <div>
      <div className="flex-1 overflow-scroll h-1">
        <h1>test</h1>
      </div>
    </div>
  );
}

export default ChatScreen;
