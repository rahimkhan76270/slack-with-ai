import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { MoonLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };
  

function Gemini() {
    const genAI = new GoogleGenerativeAI("AIzaSyDtwp3OKnscOxks4ylBAhWkJTLo96wSH9M");
    const [res, setRes] = useState("");
    const [question, setQuestion] = useState("");
    const [loading,setLoading]=useState(false);
    const generate = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = question;
        if (question != "") {
            setLoading(true)
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            setRes(text);
            setQuestion("")
            setLoading(false)
        }
    }
    const onkeypress = (event) => {
        if (event.key == "Enter" && question != "") {
            generate();
        }
    }
    return (
        <div className="flex flex-col items-center w-full m-3">
            <div className='m-3'>
                <ReactMarkdown>{res}</ReactMarkdown>
            </div>
            <div className="w-full flex items-center">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-md p-2 mr-2"
                    placeholder='ask to gemini'
                    onKeyPress={onkeypress}
                />
                {(loading)?(<MoonLoader color='blue' cssOverride={override} size={30} />):(<button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={generate}
                >
                    Ask
                </button>)}
            </div>
        </div>
    )
}

export default Gemini;