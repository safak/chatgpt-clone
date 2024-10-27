import './chatPage.css';
import NewPromt from "../../components/newPromt/NewPromt";
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';
import React from 'react';

/**
 * ChatPage Component
 *
 * The ChatPage component displays a chat interface with a list of messages, images, and the ability to send new prompts.
 * It retrieves chat history using `useQuery` from the specified chat ID in the URL, displaying messages along with any associated images.
 * 
 * ### Key Functionalities:
 * - **Fetch Chat History**: Queries chat data from the server based on the dynamic `chatId` from the URL.
 * - **Display Messages and Images**: Renders messages with markdown and displays images if present.
 * - **NewPrompt Component**: Allows users to submit new prompts at the end of the chat history.
 * 
 * ### React Query:
 * - **useQuery**: Fetches the chat data from the API. Caches chat history for reactivity and efficient data fetching.
 * 
 * ### Props & State:
 * - **chatId**: Extracted from the URL using `useLocation` to uniquely identify and fetch chat data.
 * - **isPending, error, data**: State values from `useQuery` for handling loading, error, and data display.
 * 
 * @component
 * @returns {JSX.Element} The rendered chat page displaying chat history and user prompts.
 */


const ChatPage = () => {
  const path= useLocation().pathname;
  const chatId= path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,{
        credentials:"include",
      }).then((res) =>
        res.json(),
      ),
  })
  console.log(data);




  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending? "Loading.." : error? "Error": data?.history?.map((message,i)=>(
            <React.Fragment key={i}>
            {message.img && (
              <IKImage urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
              path={message.img}
              height="300"
               width="400" 
               transformation={[{height:300,width:400}]}
               loading="lazy"
               lqip={{active:true,quality:20}}
               />
            )}

            <div
             className={message.role === "user" ? "message user" : "message" } key={i}>
             <Markdown>{message.parts[0].text}</Markdown>
            </div>
            </React.Fragment>

          ))}
          {data && <NewPromt data={data}/>}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;