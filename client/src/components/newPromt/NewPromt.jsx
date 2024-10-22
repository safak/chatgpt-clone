import { useState } from 'react';
import './newPromt.css'
import { useRef, useEffect} from 'react';
import  Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewPromt = ({data})=>{
    const [question,setQuestion] = useState(""); 
    
    const [answer,setAnswer] = useState(""); 

    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
        //generationConfig: {},
      });

    const endRef= useRef(null);
    useEffect(() => {
      const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior:'smooth' });
      };
      scrollToBottom();
    },[question,answer,img.dbData]);

    const queryClient = useQueryClient()

  
    const mutation = useMutation({
      mutationFn: async() =>{
        return fetch(`${import.meta.env.VITE_API_URL}/api/chats${data._id}`,{
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({question: question.length ? question : undefined,
            answer,
            img: img.dbData?.filePath || undefined,
          }),
        }).then(res=>res.json())
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["chat",data._id] }).then(()=>{
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
      },
      onError: (err) => {
        console.log(err);
      },
    })


    const add = async (text) => {

      console.log("IN ADD FUNC");
      console.log(text);
      setQuestion(text);

    try {
      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text] : [text]);
      //console.log(result.response.text);
      let accuumltedtext="";

      for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          console.log(chunkText);
          accuumltedtext+=chunkText;
          setAnswer(accuumltedtext);
      }

      mutation.mutate();

        
    } catch (error) {
      console.error(error);
        
    }
        

    };

    const handleSubmit = async (e) => {

      e.preventDefault();
      console.log("IN HANDLE SUBMIT FUNC");
      const text= e.target.text.value;
      if(!text) return;
      add(text);

    };

    return(
        <div className="newpPromt">
            {/*ADD NEW CHAT*/}
            {img.isLoading && <div className=''>Loading...</div>}

            {img.dbData?.filePath && (
                <IKImage
                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                path={img.dbData?.filePath}
                width="380"
                transformationPosition={[{width:360}]}
                />  
            )}

            {question && <div className="message user">{question}</div>}
            {answer && <div className="message"><Markdown>{answer}</Markdown></div>}
            {/*<button onClick={add}>test</button>*/}

            <div className="endChat" ref={endRef}></div>
            <form className="newform" onSubmit={handleSubmit}>
                <Upload setImg={setImg}/>
                <input id="file" type="file" multiple={false} hidden/>
                <input type="text" name="text" placeholder="Ask Anything boy..."/>
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </div>
    );
};

export default NewPromt;