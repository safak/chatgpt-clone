import { useState } from 'react';
import './newPromt.css'
import { useRef, useEffect} from 'react';
import  Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';

const NewPromt = ()=>{
    const [question,setQuestion] = useState(""); 
    const [answer,setAnswer] = useState(""); 

    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    const endRef= useRef(null);
    useEffect(() => {
      const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior:'smooth' });
      };
      scrollToBottom();
    },[]);

    const add = async (text) => {
        console.log("IN ADD FUNC");
        console.log(text);
        setQuestion(text);

        const result = await model.generateContent(text);
        console.log(result.response.text());
        setAnswer(result.response.text());
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
            {answer && <div className="message">{answer}</div>}
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