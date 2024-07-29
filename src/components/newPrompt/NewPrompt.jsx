import { useEffect, useRef } from 'react'

import './newPrompt.css'

const NewPrompt = () => {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm">
        <label htmlFor="file">
          <img src="/attachment.png" alt="" />
        </label>

        <input type="file" id="file" multiple={false} hidden />
        <input type="text" placeholder="Ask me anything" />

        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt