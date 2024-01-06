import UserProfile from "@/components/Profile/profileComponent"
import { useAuthState } from "react-firebase-hooks/auth"
import { initfirebase } from "@/lib/firebase_config"
import { getAuth } from "firebase/auth"
import SignIn from "../signin"
export default function Profile(){

    initfirebase();
    const auth=getAuth();
    const [user,loading]=useAuthState(auth)

    if(user){
        return(
            <UserProfile/>
        )
    }
    else{
        return (
            <SignIn/>
        )
    }
}