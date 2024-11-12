import React, { useEffect, useRef } from 'react'
import NewPrompt from '../../components/newPrompt/newPrompt'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import Markdown from 'react-markdown'
import { IKImage } from 'imagekitio-react'
const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="flex flex-col items-center h-full">
    <div className="flex flex-col flex-1 w-full justify-center">
      <div className="flex flex-col gap-5 w-1/2 mx-auto">
        {
          isPending ? "Loading..." : error ? "Something went wrong" : 
          data?.history?.map((message, i) => (
            <>
              {message.img && (
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                  path={message.img}
                  height="300"
                  width="400"
                  transformation={[{ height: 300, width: 400 }]}
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                />
              )}
          <div
  className={message.role === "user" 
    ? "user message bg-gray-600 p-5 rounded-2xl w-full lg:w-3/4 md:w-4/5 self-end text-white" 
    : "message bg-white p-5 rounded-2xl w-full lg:w-3/4 md:w-4/5 text-black"
  }
  key={i}
>
  <Markdown>{message.parts[0].text}</Markdown>
</div>
            </>
          ))
        }
        {data && <NewPrompt data={data} />}
      </div>
    </div>
  </div>
  )
}

export default ChatPage
