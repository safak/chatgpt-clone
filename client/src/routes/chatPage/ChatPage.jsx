import './chatPage.css';
import NewPromt from "../../components/newPromt/NewPromt";
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';
import React from 'react';


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