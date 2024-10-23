import "./newPrompt.css";

function NewPrompt() {
  return (
    <div className="newPrompt">
      <form className="newForm">
        <label htmlFor="file">
          <img src="/attachment.png" alt="attachment" />
        </label>
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="arrow btn" />
        </button>
      </form>
    </div>
  );
}

export default NewPrompt;
