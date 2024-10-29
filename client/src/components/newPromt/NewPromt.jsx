import { useState } from 'react';
import './newPromt.css'
import { useRef, useEffect} from 'react';
import  Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * NewPromt Component
 * 
 * This component handles the interactive chat interface with functionality for user input, 
 * image upload, and dynamic conversation display. It manages user queries, processes responses 
 * from the Gemini AI model, and updates the chat log based on user interactions.
 *
 * Key Functionalities:
 * - **User Input Handling**: Captures user text input and submits it to the chat model.
 * - **Image Uploading**: Integrates image uploads via the ImageKit API for adding visuals to conversations.
 * - **Gemini Model Interaction**: Uses Gemini API's `startChat` method to manage chat history 
 *    and respond to user messages dynamically.
 * - **Real-Time Chat Display**: Displays each user query and Gemini's response in real-time, 
 *    leveraging Markdown for text formatting and streaming for seamless conversation.
 * - **Auto Scroll**: Automatically scrolls the chat to the latest message.
 *
 * Props:
 * - `data` (Object): Contains chat history and metadata about previous interactions in the chat.
 *
 * State:
 * - `question` (String): Stores the current user question being processed.
 * - `answer` (String): Holds the Gemini AI's response to the latest user question.
 * - `img` (Object): Manages image data, including loading status, error states, and both database 
 *    and AI-derived data for uploaded images.
 *
 * References:
 * - `endRef` (Ref): References the end of the chat container to enable auto-scrolling to the latest message.
 * - `formRef` (Ref): References the form input for resetting after successful submission.
 * 
 * Important Methods:
 * - **add(text, isInitial)**: Sends a message to the Gemini model. If `isInitial` is true, it initializes
 *    the chat with the first message. Otherwise, it updates the conversation with each user input.
 * - **handleSubmit(e)**: Event handler for submitting the form, initiates `add()` with the user query.
 *
 * API Integration:
 * - Uses react-query's `useMutation` to manage `PUT` requests to the server for saving chat data.
 * - `useMutation` triggers a re-fetch of chat data upon success, ensuring the latest chat state is displayed.
 * 
 * Usage:
 * Place this component within a layout or chat page to create a responsive and interactive
 * chat interface with support for rich text, image upload, and real-time updates.
 *
 */

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
          ...(data?.history?.map(({ role, parts }) => ({
              role,
              parts: [{ text: parts[0].text }],
          })) || []) // התוצאה המתקבלת תהיה מערך ריק במקרה ש-data או data.history אינם קיימים
      ],
      generationConfig: {},
  });

  
    const endRef= useRef(null);
    const formRef= useRef(null);
    useEffect(() => {
      const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior:'smooth' });
      };
      scrollToBottom();
    },[data,question,answer,img.dbData]);

    const queryClient = useQueryClient();

  
    const mutation = useMutation({
      mutationFn: async() =>{
        return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`,{
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({question: question.length ? question : undefined,
            answer,
            img: img.dbData?.filePath || undefined,
          }),
        }).then((res)=>res.json())
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["chat",data._id] }).then(()=>{
          console.log("on success");
          formRef.current.reset();
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


    const add = async (text,isInitial) => {

      console.log("IN ADD FUNC");
      if (!isInitial) setQuestion(text);

    try {
      console.log(text);
      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text] : [text]);
      //console.log(result.response.text);
      let accuumltedtext="";

      for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          //console.log(chunkText);
          accuumltedtext+=chunkText;
          setAnswer(accuumltedtext);
      }
      console.log(accuumltedtext);
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
      add(text, false);
    };


  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

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


            <div className="endChat" ref={endRef}></div>
            <form className="newform" onSubmit={handleSubmit} ref={formRef}>
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