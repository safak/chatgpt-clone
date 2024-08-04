import { useEffect, useRef, useState } from "react";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Upload from "../upload/Upload";
import model from "../../lib/gemini";
import "./newPrompt.css";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  const queryClient = useQueryClient();

  const chat = model.startChat({
    // THIS IS HOW THE AI REMEMBERS THE CONVERSATION    
    history: data?.history?.length > 0 
      ? data.history.map(({ role, parts }) => ({
          role,
          parts: parts?.length > 0 && parts[0]?.text ? [{ text: parts[0].text }] : [],
        }))
      : [],

    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });

  }, [data, question, answer, img.dbData]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        // FORMAT OF WHAT WE ARE GOING TO SEND TO THE BE
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        // THANKS TO THIS THE NEW messages IN THE CHAT REMAIN IN DISPLAY BC THEY ARE NO LONGER prompt AND answer FROM THE AI BUT THEY ARE COMING FROM THE DB
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
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
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );

      let accumulatedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
  };

  // IN PRODUCTION WE DON'T NEED IT
  // THE useEffect BELOW IS GOING TO BE RUN TWICE,THIS OCCURS BC IN development WE ARE USING <strict mode> AND MAKES YOUR app RUN TWICE, TO PREVENT THIS WE USE THIS useRef
  // WE ALSO HAVE TO USE IT BC WE ARE USING streaming IN OUR AI MODEL
  const hasRun = useRef(false);

  // WHEN WE START A NEW chat FROM dashboardPage AND WE HIT enter THE AI DOESN'T RESPOND BC WE ONLY TRIGGER OUR function ONLY WHEN WE SUBMIT THE chatPage form
  useEffect(() => {
    if (!hasRun.current) {
      // WHEN VERIFY IF WE ONLY HAVE ONE message IN THE CHAT THAT MEANS IT IS ONLY THE user's prompt, THEN WE CAN GENERATE OUR ANSWER AND SEND IT TO THE DB, THAT IS WHY WE IMPLEMENT isInitial
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div className="endChat" ref={endRef}></div>
      
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />

        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;