import React from 'react';
import './newPromt.css'
import { useRef, useEffect} from 'react';


const NewPromt = ()=>{
    const endRef= useRef(null);
    useEffect(() => {
      const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior:'smooth' });
      };
      scrollToBottom();
    },[]);

    return(
        <div className='newpPromt'>
            TEST
            <div className='endChat' ref={endRef}></div>
            <form className='newform'>
                <label htmlFor="file">
                    <img src="/attachment.png" alt="" />
                </label>
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