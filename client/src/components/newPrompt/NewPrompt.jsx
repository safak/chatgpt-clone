import { useEffect, useRef, useState } from 'react'
import { IKImage } from 'imagekitio-react'

import Upload from '../upload/Upload'
import model from '../../lib/gemini'
import Markdown from 'react-markdown'
import './newPrompt.css'

const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: '',
    dbData: {}, // THE INFO COMING FROM IMAGE KIT? R/ YES
    aiData: {}
  })
  const [question, setQuestion] = useState('')
  // BC THE answer FROM THE AI IS IN markdown FORMAT WE INSTALL react-markdown
  const [answer, setAnswer] = useState('')

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [question, answer, img.dbData])

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const add = async (text) => {
    setQuestion(text)

    // AT THE BEGINNING WE USED generateContent() TO GET THE ANSWER FROM THE AI
    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, text] : [text]
    )

    let accumulatedText = '';
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }

    setImg({
      isLoading: false,
      error: '',
      dbData: {},
      aiData: {}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const text = e.target.text.value

    if(!text) return

    add(text)
  }

  return (
    <>
      {img.isLoading && <div className=''>Loading...</div>}

      {img.dbData?.filePath && (
        <IKImage 
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          // THIS ONE USES THE ORIGINAL FILE
          width='380'
          // IT WILL RESIZE THE img IN IMAGE KIT TO 380px
          transformation={[{ width: 380 }]}
        />
      )}

      { question && <div className='message user'>{question}</div> }
      { answer && <div className='message'><Markdown>{answer}</Markdown></div> }

      <div className="endChat" ref={endRef}></div>
      
      <form action="" className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />

        <input type="file" id="file" multiple={false} hidden />
        <input type="text" name='text' placeholder="Ask me anything" />

        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt