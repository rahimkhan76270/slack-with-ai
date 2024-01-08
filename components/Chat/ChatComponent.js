import React, { useState } from 'react';
import { MessageList, Input, Button, Navbar,Popup } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import TwoColumnLayout from './TwoColumns';
import Contacts from './contacts';
import { initfirebase } from '@/lib/firebase_config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import UserChatList from './UserChatList';
import Image from 'next/image';
import { getFirestore, getDocs, collection, setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

function ChatComponent() {
    initfirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [message, setMessage] = useState("");
    const [show,setShow]=useState(false);
    const [data, setData] = useState([]);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [chatRoomId,setChatRoomId]=useState("");
    const db=getFirestore();

    const handleSendMessage = async() => {
        const m = {
            position: "right",
            type: "text",
            title: auth.currentUser.email,
            text: message,
            Date:new Date()
        }
        if (message != "") {
            setData((prev) => [...prev, m]);
            const id = uuidv4();
            await setDoc(doc(db, `chatrooms/${chatRoomId}/messages/${id}`), m);
            setMessage("");
        }
    }
    const onkeypress = (event) => {
        if (event.key == "Enter" && message != "") {
            handleSendMessage();
        }
    }

    const loadMessages= async(chatId)=>{
        const collref = collection(db, `chatrooms/${chatId}/messages`);
        const data = await getDocs(collref);
        const docs=data.docs;
        docs.forEach(element => {
            setData((prev)=>[...prev,element.data()])
        });
    }
    const handleonclick=(names,emails,chatRoomIds)=>{
        setName(names);
        setEmail(emails);
        setChatRoomId(chatRoomIds);
        setData([]);
        loadMessages(chatRoomIds);

    }
    const popup = {
        show:show,
        header:"Contacts",
        headerButtons: [
            {
                type: "transparent",
                color: "black",
                text: "X",
                onClick: () => {
                    setShow(false);
                },
            },
        ],
        text:<Contacts loadMessage={loadMessages}/>,
        footerButtons: [
            {
                color: "white",
                backgroundColor: "#ff5e3e",
                text: "close",
                onClick: () => {
                    setShow(false);
                },
            },
        ]
      };
    return (

        <TwoColumnLayout>
            <div><UserChatList onMessageClick={handleonclick} /></div>
            <div>
                <Navbar
                    left=<div><Image src="/slack.png" alt='logo' width={20} height={20}></Image></div>
                    center=<div>{name}</div>
                    right=<div><Popup popup={popup}/><button onClick={()=>setShow(true)}>Contacts</button></div>
                    type="light" />
                <div>
                    <MessageList
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={data} />
                    <Input
                        placeholder="Type here..."
                        multiline={false}
                        rightButtons={<Button text='send' onClick={handleSendMessage} />}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={onkeypress}
                    /></div>
            </div>
        </TwoColumnLayout>
    )
}
export default ChatComponent
