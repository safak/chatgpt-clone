import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';

import NewPrompt from '../../components/newPrompt/NewPrompt'
import './chatPage.css'

const ChatPage = () => {
  const path = useLocation().pathname;
  // pop() WILL GIVE ME THE LAST ITEM /dashboard/chats/66ac26a7b397542865c8a509
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    // queryKey IS HOW WE IDENTIFY THIS QUERY, IF WE USE A NAME OF ANOTHER QUERY IT WILL OVERWRITE THIS CALL AND FETCH THE DATA BELONGING TO THAT QUERY
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });  

  return (
    <div className="chatPage">
      {/* div className="wrapper" IT'S ADDED SO THAT WE ARE ABLE TO SCROLL */}
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (
                <>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      // WHILE LOADING IT WILL SHOW A LOW QUALITY VERSION OF THE img
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                    key={i}
                  >
                    <Markdown>{message?.parts[0].text}</Markdown>
                  </div>
                </>
              )
            )
          }

          {/* IT IS ADDED IN ANOTHER component OTHERWISE WHENEVER WE RECEIVE A NEW MESSAGE FROM THE AI IT IS GOING TO RENDER THE ENTIRE ChatPage component */}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  )
}

export default ChatPage