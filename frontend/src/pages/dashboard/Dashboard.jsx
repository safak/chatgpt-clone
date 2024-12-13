// import React, { useState, useRef } from "react";
// import Header from "./Header";
// import ChatBody from "./ChatBody";
// import ChatInput from "./ChatInput";
// import { useImage } from "../../contexts/ImageContext";
// import { useLoading } from "../../contexts/LoadingContext";
// import { startChatWithMessage } from "../../lib/geminiHelperFunc";
// import { generateContentWithRetry } from "../../lib/geminiHelperFunc";

// function Dashboard() {
//   const [inputText, setInputText] = useState("");
//   const inputRef = useRef(null);
//   const { image, setImage, messages, addMessage } = useImage(); // Use addMessage from ImageContext
//   const { isLoading, setIsLoading } = useLoading();


//   const handleInputSubmit = async (e) => {
//     if ((e.key === "Enter" || e.type === "click") && !isLoading) {
//       if (!inputText.trim()) return;
  
//       const userMessage = {
//         role: "user",
//         text: inputText,
//       };
  
//       addMessage(userMessage); // Use addMessage instead of setMessages
  
//       setInputText("");
//       setIsLoading(true);
  
//       try {
//         // Attempt to get AI response using startChatWithMessage
//         const aiResponse = await startChatWithMessage(inputText, messages);
  
//         const aiMessage = {
//           role: "model", // Correct role for AI message
//           text: aiResponse,
//         };
  
//         addMessage(aiMessage); // Use addMessage instead of setMessages
//       } catch (error) {
//         console.error("Error during startChatWithMessage:", error);
  
//         try {
//           // Fallback to generateContentWithRetry
//           console.log("Falling back to generateContentWithRetry...");
//           const fallbackResponse = await generateContentWithRetry([inputText]);
  
//           const fallbackMessage = {
//             role: "model", // Correct role for fallback message
//             text: fallbackResponse,
//           };
  
//           addMessage(fallbackMessage); // Use addMessage instead of setMessages
//         } catch (fallbackError) {
//           console.error("Error during fallback to generateContentWithRetry:", fallbackError);
  
//           const errorMessage = {
//             role: "model", // Correct role for error message
//             text: "Sorry, something went wrong. Please try again later.",
//           };
  
//           addMessage(errorMessage); // Use addMessage instead of setMessages
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

  

//   const clearUploadedFile = () => {
//     setImage({ isLoading: false, dbData: null });
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Header inputText={inputText} />
//       <div className="flex-1 overflow-y-hidden">
//         <ChatBody messages={messages} isLoading={isLoading} />
//       </div>
//       <ChatInput
//         inputText={inputText}
//         setInputText={setInputText}
//         handleInputSubmit={handleInputSubmit}
//         inputRef={inputRef}
//         clearUploadedFile={clearUploadedFile}
//       />
//     </div>
//   );
// }

// export default Dashboard;







// import React, { useState, useRef } from "react";
// import Header from "./Header";
// import ChatBody from "./ChatBody";
// import ChatInput from "./ChatInput";
// import { useImage } from "../../contexts/ImageContext";
// import { useLoading } from "../../contexts/LoadingContext";
// import { startChatWithMessage } from "../../lib/geminiHelperFunc";
// import { generateContentWithRetry } from "../../lib/geminiHelperFunc";

// function Dashboard() {
//   const [inputText, setInputText] = useState("");
//   const inputRef = useRef(null);
//   const { image, setImage, messages, addMessage } = useImage();
//   const { isLoading, setIsLoading } = useLoading();

//   const handleInputSubmit = async (e) => {
//     if ((e.key === "Enter" || e.type === "click") && !isLoading) {
//       if (!inputText.trim()) return;

//       const userMessage = {
//         role: "user",
//         text: inputText,
//       };

//       addMessage(userMessage); // Add the user message

//       setInputText(""); // Clear the input
//       setIsLoading(true); // Show loading indicator

//       try {
//         // If there's an image, send both the text and the image URL
//         console.log("Inside the image calling func")
//         if (image.dbData) {
//           const aiResponse = await startChatWithMessage(inputText, image.dbData.url, messages);
//           const aiMessage = {
//             role: "model",
//             text: aiResponse,
//           };
//           addMessage(aiMessage);
//         } else {
//           // Send just the text if there's no image
//           const aiResponse = await startChatWithMessage(inputText, null, messages);
//           const aiMessage = {
//             role: "model",
//             text: aiResponse,
//           };
//           addMessage(aiMessage);
//         }
//       } catch (error) {
//         console.error("Error during startChatWithMessage:", error);

//         try {
//           // Fallback to generateContentWithRetry if the API call fails
//           const fallbackResponse = await generateContentWithRetry([inputText]);

//           const fallbackMessage = {
//             role: "model",
//             text: fallbackResponse,
//           };

//           addMessage(fallbackMessage);
//         } catch (fallbackError) {
//           console.error("Error during fallback to generateContentWithRetry:", fallbackError);

//           const errorMessage = {
//             role: "model",
//             text: "Sorry, something went wrong. Please try again later.",
//           };

//           addMessage(errorMessage);
//         }
//       } finally {
//         setIsLoading(false); // Hide loading indicator
//       }
//     }
//   };

//   const clearUploadedFile = () => {
//     setImage({ isLoading: false, dbData: null });
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Header inputText={inputText} />
//       <div className="flex-1 overflow-y-hidden">
//         <ChatBody messages={messages} isLoading={isLoading} />
//       </div>
//       <ChatInput
//         inputText={inputText}
//         setInputText={setInputText}
//         handleInputSubmit={handleInputSubmit}
//         inputRef={inputRef}
//         clearUploadedFile={clearUploadedFile}
//       />
//     </div>
//   );
// }

// export default Dashboard;



import React, { useState, useRef } from "react";
import Header from "./Header";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useImage } from "../../contexts/ImageContext";
import { useLoading } from "../../contexts/LoadingContext";
import { startChatWithMessage } from "../../lib/geminiHelperFunc";
import { generateContentWithRetry } from "../../lib/geminiHelperFunc";

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const { image, setImage, messages,setMessages,  addMessage } = useImage();
  const { isLoading, setIsLoading } = useLoading();


  const handleInputSubmit = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && !isLoading) {
      // Validate input (ensure text or image URL is provided)
      if (!inputText.trim() && !image.dbData?.url) {
        console.warn("Input is empty and no image is provided.");
        return;
      }
  
      // Create a user message with optional image URL
      const userMessage = {
        role: "user",
        text: inputText,
        image: image.dbData?.url, // Optional image URL
        aiData: image.aiData,     // Optional AI-specific data
      };
  
      // Add the user message to chat history
      addMessage(userMessage);
  
      // Reset input and image state after sending the message
      setInputText("");
      setImage({ isLoading: false, dbData: null });
      setIsLoading(true);
  
      try {
        let aiResponse;
        const payload = image.aiData
          ? [image.aiData, inputText] // Include aiData if available
          : [inputText];    
  
        // Check if aiData exists and send the image with text if present
        if (image.aiData) {
          console.log("Sending with AI data and image.");
          aiResponse = await startChatWithMessage(payload);
        } else {
          console.log("Sending with just text.");
          aiResponse = await startChatWithMessage(payload);
        }
  
        // Add AI response to chat history
        const aiMessage = {
          role: "model",  // Correct role for AI message
          text: aiResponse,
        };
        addMessage(aiMessage);
  
      } catch (error) {
        console.error("Error during startChatWithMessage:", error);
  
        try {
          // Fallback to generateContentWithRetry if the primary API call fails
          console.log("Falling back to generateContentWithRetry...");
          const payload = image.aiData
          ? [image.aiData, inputText] // Include aiData if available
          : [inputText];  
          const fallbackResponse = await generateContentWithRetry(payload);
  
          const fallbackMessage = {
            role: "model", // Correct role for fallback message
            text: fallbackResponse,
          };
  
          addMessage(fallbackMessage);
        } catch (fallbackError) {
          console.error("Error during fallback to generateContentWithRetry:", fallbackError);
  
          const errorMessage = {
            role: "model",  // Correct role for error message
            text: "Sorry, something went wrong. Please try again later.",
          };
  
          addMessage(errorMessage);
        }
      } finally {
        setIsLoading(false); // Stop loading state
      }
    }
  };
  

  

  const clearUploadedFile = () => {
    setImage({ isLoading: false, dbData: null });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header inputText={inputText} />
      <div className="flex-1 overflow-y-hidden">
        <ChatBody messages={messages} isLoading={isLoading} />
      </div>
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleInputSubmit={handleInputSubmit}
        inputRef={inputRef}
        clearUploadedFile={clearUploadedFile}
      />
    </div>
  );
}

export default Dashboard;
 