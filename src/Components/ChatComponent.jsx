import React, { useState } from "react";
import { OpenAI_APIKey, OpenAI_URL } from "../Config/Config";
import OpenAI, { } from 'openai'
import axios from "axios";
import '../css/index.css'
import api from "../https/api";

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const sendMessage = async (event) => {
        event.preventDefault()
        setMessages([...messages, { text: userInput, user: 'user' }])
        const response = await fetchMessage(userInput);
        console.log("userInputuserInput", userInput);
        if (response?.status) {
            setMessages([...messages, { text: userInput, user: 'user' }, { text: response?.data?.openai.generated_text, user: 'bot' },])
            setUserInput('')

        }
    }
    const fetchMessage = async (input) => {

        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/text/chat",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDYzNjE3NjItNWFjMC00ZDZkLWEwNTMtNTJmNTEyYzNlMGE5IiwidHlwZSI6ImFwaV90b2tlbiJ9._R3St6nSYS0R_f3_jpbFlEwfeSdXWH7758I3SUruYtg'}`
            },

            data: {
                providers: "openai",
                text: `${userInput}`,
                language: "en",
            },
        }


        // const method = 'POST'
        // const url = "https://api.edenai.run/v2/text/chat"
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDYzNjE3NjItNWFjMC00ZDZkLWEwNTMtNTJmNTEyYzNlMGE5IiwidHlwZSI6ImFwaV90b2tlbiJ9._R3St6nSYS0R_f3_jpbFlEwfeSdXWH7758I3SUruYtg'}`
        // }

        // // const response = await fetch('https://api.edenai.run/v2/text/topic_extraction', { method, headers, body });
        // const response = await api(url, method, userInput, headers)
        // console.log("responseresponse", response);
        // return response
        const response = await axios
            .request(options)
        // .then((response) => {
        //     console.log("response.data", response);
        //     return response?.data?.openai?.message
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
        console.log("resresres", response);
        return response
    }

    // const openAi = new OpenAI({
    //     apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
    //     dangerouslyAllowBrowser: true
    // })


    // const chatCompletion = await openAi.chat.completions.create({
    //     messages: [{ role: 'user', content: 'Say this is a test' }],
    //     model: 'gpt-3.5-turbo-0125'
    // })

    return (
        <div className="main-class">
            <div className="base-class">
                <div className="message-main-container">
                    {messages?.map((element, index) => {
                        return <div style={{ display: "flex", justifyContent: element.user === "user" ? 'flex-end' : "flex-start" }}><div className="message-container" style={{ display: 'flex', alignItems: 'flex-end' }}><p key={index}>{element?.text}</p></div></div>
                    })}
                </div>
                <input className="input-class"
                    type="text"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    placeholder="Type a message"
                />
                <button className="button-class" onClick={(event) => sendMessage(event)}>Submit</button>
            </div>
        </div >
    );
}

export default ChatComponent