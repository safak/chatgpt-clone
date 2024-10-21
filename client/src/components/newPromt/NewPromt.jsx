import { useState } from 'react';
import './newPromt.css'
import { useRef, useEffect} from 'react';
import  Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown';

const NewPromt = ()=>{
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

    const add = async (text) => {
        console.log("IN ADD FUNC");
        console.log(text);
        setQuestion(text);

        const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text] : [text]);
        //console.log(result.response.text);
        let accuumltedtext="";

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            accuumltedtext+=chunkText;
            setAnswer(accuumltedtext);

           
        }

        //setAnswer(result.response.text());
        setImg({isLoading: false,
            error: "",
            dbData: {},
            aiData: {}})
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