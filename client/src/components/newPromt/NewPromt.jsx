import { useState } from 'react';
import './newPromt.css'
import { useRef, useEffect} from 'react';
import  Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';

const NewPromt = ()=>{

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

    const add = async () => {

        //result.response.text()
        const prompt = "Write a story about an ai and magic";

        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        console.log(response)
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

            <button onClick={add}>TEST AI</button>

            <div className="endChat" ref={endRef}></div>
            <form className="newform">
                <Upload setImg={setImg}/>
                <input id="file" type="file" multiple={false} hidden/>
                <input type="text" placeholder="Ask Anything boy..."/>
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </div>
    );
};

export default NewPromt;