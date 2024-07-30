import { useEffect, useRef, useState } from 'react'
import { IKImage } from 'imagekitio-react'

import './newPrompt.css'
import Upload from '../upload/Upload'

const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: '',
    dbData: {}
  })

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {img.isLoading && <div className=''>Loading...</div>}

      {img.dbData?.filePath && (
        <IKImage 
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width='380'
          transformation={[{ width: 380 }]}
        />
      )}

      <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm">
        <Upload setImg={setImg} />

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