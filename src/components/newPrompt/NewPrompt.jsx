import { useEffect, useRef } from "react";
import "./newPrompt.css";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      {/* add new chat */}
      <div className="endChat" ref={endRef}></div>
      <from className="newForm">
        <label htmlFor="file">
          <img src="/attachment.png" alt="attachment" />
        </label>
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask me anything..." />
        <button>
          <img src="/arrow.png" alt="button " />
        </button>
      </from>
    </>
  );
};

export default NewPrompt;
