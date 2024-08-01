import { useAuth } from '@clerk/clerk-react'

import './dashboardPage.css'

const DashboardPage = () => {
  const { userId } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const text = e.target.text.value

    if(!text) return

    await fetch('http://localhost:4000/api/chats', {
      method: 'POST',
      // BC WE ARE GOING TO SEND cookies AND THE user IN IT
      credentials: 'include',
      // FORMAT OF WHAT WE ARE GOING TO SEND TO THE BE
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text }),
    })
    .then(res => res.json())
    .then(data => setImg({ ...img, aiData: data }))
  }

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />

          <h1>AI Chat</h1>
        </div>

        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />

            <span>Create a new chat</span>
          </div>

          <div className="option">
            <img src="/image.png" alt="" />

            <span>Analyze images</span>
          </div>

          <div className="option">
            <img src="/code.png" alt="" />

            <span>Help me with my code</span>
          </div>
        </div>
      </div>

      <div className="formContainer">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything" />

          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage