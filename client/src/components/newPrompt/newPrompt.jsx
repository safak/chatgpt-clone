import React, { useEffect, useRef, useState } from 'react'
import './newPrompt.css'
import Upload from '../upload/upload'
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from  "react-markdown";
import { useMutation, useQueryClient } from '@tanstack/react-query';
const newPrompt = ({data}) => {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData:{},
  });
  const chat = model.startChat({
    history: [
    {
      role: "user",
      parts:[{text:"hello, i am user"}]
    },
    {
      role: "model",
      parts:[{text:"hello, i am model"}]
    },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const endRef = useRef(null)
  const formRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect (()=>{
   endRef.current.scrollIntoView({behavior:"smooth"});
  },[data,question, answer,  img.dbData])
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath||undefined,
         }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] }).then(()=>{
        formRef.current.reset();
        setQuestion("");
        setAnswer("");
        setImg({isLoading: false,
          error: "",
          dbData: {},
          aiData:{},});
      });
      navigate(`/dashboard/chats/${id}`);
    },
    onError:(error)=>{
      console.error(error);
    }
  });


  const add = async(text, isInitial)=>{
    if(!isInitial) setQuestion (text);
    
    try{
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text]: [text]);
    let accumalteText = "";
    for await(const chunk of result.stream)
    {
      const chunkText = chunk.text();
      console.log(chunkText);
      accumalteText += chunkText;
      setAnswer(accumalteText);
    }  
    mutation.mutate()
    }
    catch(err){
      console.log(err);
    }
  };
 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;


    add(text, false);
   
  }
  const hasRun = useRef(false);
  useEffect(()=>{
    if(!hasRun.current){
    if(data.history?.length === 1)
    {
      add(data.history[0].parts[0].text, true);
    }
  }
  hasRun.current = true;
  },[]);
  return (
<>  
  {
    img.dbData?.filePath && (
      <IKImage
        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
        path={img.dbData?.filePath}
        transformation={[{ width: 380 }]}
      />
    )
  }
  {question && <div className='user message bg-blue-600 p-5 rounded-2xl max-w-[90%] self-end text-white'>{question}</div>}
  {
    answer && <div className='message bg-gray-800 p-5 rounded-2xl max-w-[90%] text-white'>
      <Markdown>{answer}</Markdown>
    </div>
  }
  <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg max-h-32 overflow-y-auto mb-6" ref={endRef}>
    <form className="flex items-center" onSubmit={handleSubmit} ref={formRef}>
      <Upload setImg={setImg} />
      <input
        id="file-upload"
        type="file"
        hidden
      />
      <input
        type="text"
        name="text"
        placeholder="Ask me anything..."
        className="flex-grow ml-4 p-3 bg-gray-700 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l  p-3 rounded-r-lg transition duration-200 flex items-center"
      >
        <img src="/arrow.png" alt="Submit" className="w-5 h-5" />
      </button>
    </form>
  </div>
</>
  )
}

export default newPrompt
