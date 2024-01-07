import ChatComponent from "@/components/Chat/ChatComponent";
import ContactsList from "@/components/Chat/contacts";
import React from 'react'
import { getAuth } from "firebase/auth";
import { initfirebase } from "@/lib/firebase_config";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../signin";

function Index() {
  initfirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  if (user) {
    return (
      <div>
        <ChatComponent />
      </div>
    )
  }
  else
  {
    return (
      <div>
        <SignIn/>
      </div>
    )
  }
}

export default Index