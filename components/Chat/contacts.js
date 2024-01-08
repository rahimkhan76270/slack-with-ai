import { ChatList } from "react-chat-elements";
import { initfirebase } from "@/lib/firebase_config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import PopupForm from "./addContactPopup";
import CreateGroupPopupForm from "./createGroupPopup";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, getDocs, collection, setDoc, doc } from "firebase/firestore";
import { getStorage,getDownloadURL ,ref} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
function Contacts({loadMessage}) {
  initfirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isGrPopupOpen, setGroupPopupOpen] = useState(false);
  const db = getFirestore();
  const storage=getStorage();
  const handleOnSubmit = async (name, email) => {
    const id = uuidv4();
    if (user) {
      await setDoc(doc(db, `users/${auth.currentUser.email}/contacts/${id}`), { "name": name, "email": email })
        .then((res) => {
          toast("successfully added");
        }).catch((error) => {
          toast("something went wrong");
        })
    }
  }
  const getContacts = async () => {
    if (user) {
      const collref = collection(db, `users/${auth.currentUser.email}/contacts`);
      const data = await getDocs(collref);
      let contacts = [{
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_P4BC8d8SLTNhWRSd3JP-_Ld8mL7OYylovQ&usqp=CAU',
        alt: 'kursat_avatar',
        title:"Gemini AI",
        subtitle: "Google",
        date: new Date(),
        unread: 0,
      }]
      data.forEach( async (element) => {
        const contact = element.data();
        // const imageRef= ref(storage,`images/${contact.email}/profile_pic`);
        let url= 'https://avatars.githubusercontent.com/u/80540635?v=4';
        // try{
        //     await getDownloadURL(imageRef).then((res)=>{
        //       url=res;
        //     })
        // }catch(err){
        //   console.log(err);
        // }
        
        let cont = {
          avatar:url ,
          alt: 'kursat_avatar',
          title: contact.name,
          subtitle: contact.email,
          date: new Date(),
          unread: 0,
        }
        contacts.push(cont);
      });
      setUserData(contacts)
    }
  }
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleGroupPopupOpen = () => {
    setGroupPopupOpen(true);
  }
  const handleGroupPopupClose = () => {
    setGroupPopupOpen(false);
  }
  const handleGroupPopupSubmit = () => {
    console.log("hello group popup")
  }

  const handleChatClick= async (event)=>{
    const collref = collection(db, `users/${event.subtitle}/chatrooms`);
    const data = await getDocs(collref);
    data.forEach((element)=>{
      if(auth.currentUser.email==element.data().email){
        loadMessage(element.id);
        return;
      }
    })
    const id =uuidv4();
    await setDoc(doc(db, `chatrooms/${id}/messages/${id}`), {position: "right", type: "text", title:"system generated", text: "initial message", Date:new Date() });
    await setDoc(doc(db, `users/${auth.currentUser.email}/chatrooms/${id}`),{"name":event.title,"email":event.subtitle});
    await setDoc(doc(db, `users/${event.subtitle}/chatrooms/${id}`),{"name":auth.currentUser.displayName,"email":auth.currentUser.email});

  }

  return (
    <div className="overflow-y-scroll max-h-96"><ChatList
      className='chat-list'
      dataSource={userData}
      onClick={handleChatClick}
    />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button onClick={handleOpenPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{margin:"10px"}}>Add Contacts</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{margin:"10px"}} onClick={handleGroupPopupOpen}>Create Group</button>
      <button onClick={getContacts} className="text-red-500" style={{margin:"10px"}}>Refresh</button>
      <PopupForm isOpen={isPopupOpen} onClose={handleClosePopup} onSubmit={handleOnSubmit} />
      <CreateGroupPopupForm isOpen={isGrPopupOpen} onClose={handleGroupPopupClose} onSubmit={handleGroupPopupSubmit} />
    </div>
  )
}

export default Contacts
