import React, { useState } from 'react';
import { MessageList, Input, Button ,Navbar} from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import TwoColumnLayout from './TwoColumns';
import Contacts from './contacts';
import { initfirebase } from '@/lib/firebase_config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import TabGroup from './tabGroup';
import UserChatList from './UserChatList';

function ChatComponent() {
    initfirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const handleSendMessage = () => {
        const m = {
            position: "right",
            type: "text",
            title: auth.currentUser.email,
            text: message
        }
        if (message != "") {
            setData((prev) => [...prev, m]);
            setMessage("");
        }
    }
    const onkeypress = (event) => {

        if (event.key == "Enter" && message != "") {

            handleSendMessage();
        }
    }

    const tabs = [
        { id: 1, label: <div className='font-bold mx-2' >Chats</div>, content: <div><UserChatList /></div> },
        { id: 2, label: <div className='font-bold mx-2' >Contacts</div>, content: <Contacts /> },
    ];
    return (
        <TwoColumnLayout>
            <TabGroup defaultTab={2} tabs={tabs} />
            <div>
                <Navbar
                    left=<div>Logo</div>
                    center=<div>Home</div>
                    right=<div>Contact</div>
                    type="light"
                />
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={data}
                />
                <Input
                    placeholder="Type here..."
                    multiline={false}
                    rightButtons={<Button text='send' onClick={handleSendMessage} />}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={onkeypress}
                />
            </div>
        </TwoColumnLayout>
    )
}
export default ChatComponent
