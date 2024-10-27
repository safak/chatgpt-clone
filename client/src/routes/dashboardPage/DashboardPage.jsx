import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import './dashboardPage.css';
import { useNavigate } from 'react-router-dom';

/**
 * DashboardPage Component
 *
 * This component is the main dashboard where users can create new chats, analyze images, or get coding assistance.
 * It includes an input form to submit queries, which initiates new chats.
 * 
 * ### Key Functionalities:
 * - **Mutation for New Chat Creation**: Creates a new chat with a POST request and navigates to the newly created chat's page.
 * - **Form Submission Handling**: Submits user input and triggers the mutation to create a chat.
 * 
 * ### React Query Usage:
 * - **useQueryClient**: For cache management, allowing the chat list to be refetched upon new chat creation.
 * - **useMutation**: For posting new chat requests to the server, invalidating cache for recent chats to stay updated.
 * 
 * ### Navigation:
 * - Redirects the user to the newly created chat’s page after successful chat creation.
 * 
 * @component
 * @returns {JSX.Element} The rendered component for the Dashboard page.
 */


 const DashboardPage = () => {

  // Initializes the query client to manage cache and data fetching
  const queryClient = useQueryClient();
  
  // Initializes the navigate function for programmatic routing
  const navigate = useNavigate();

  // Configures the mutation for creating a new chat session
  const mutation = useMutation({

    // Defines the mutation function, which sends a POST request to create a new chat session
    mutationFn: async(text) =>{
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text}),
      }).then(res=>res.json())
    },
    // Defines actions upon successful chat creation
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });// Invalidates and refetches userChats to update the chat list
      navigate(`/dashboard/chats/${id}`);// Navigates to the new chat page with the given ID
    },
  })

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const text= e.target.text.value;
    if(!text) return;
    console.log("in handle submit on dashbadpage");

    mutation.mutate(text);

  };

  return (
    <div className="DashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="logo.png" alt="" />
          <h1>MELLER AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a new Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me Anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;