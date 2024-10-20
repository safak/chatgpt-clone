import "./dashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboardPage">
      <div className="text">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <div className="options">
            <div className="option">
              <img src="/chat.png" alt="img" />
              <span>Create a New Chat</span>
            </div>
            <div className="option">
              <img src="/image.png" alt="img" />
              <span>Analyze Images</span>
            </div>
            <div className="option">
              <img src="/code.png" alt="img" />
              <span>Help me with my code</span>
            </div>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" placeholder="Aske me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardPage;
