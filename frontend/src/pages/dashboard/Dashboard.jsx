import React, { useState, useRef } from "react";
import Header from "./Header";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useImage } from "../../contexts/ImageContext";
import { useLoading } from "../../contexts/LoadingContext";
import {generateContentWithRetry} from "../../lib/geminiHelperFunc"





function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const { image, setImage, aiData } = useImage();
  const { isLoading, setIsLoading } = useLoading();

  // const handleInputSubmit = async (e) => {
  //   if ((e.key === "Enter" || e.type === "click") && !isLoading) {
  //     if (!inputText.trim() && !image.dbData?.url) return;

  //     const userMessage = {
  //       role: "user",
  //       text: inputText,
  //       image: image.dbData?.url,
  //       aiData
  //     };

  //     setMessages((prevMessages) => [...prevMessages, userMessage]);

  //     setInputText(""); // Clear input field
  //     setImage({ isLoading: false, dbData: null }); // Reset image state

  //     setIsLoading(true); // Start loading

  //     try {
  //      // Generate AI response with retries
  //      console.log("The aiData:", aiData)
  //       const aiResponse = await generateContentWithRetry(inputText, aiData); // Use aiData here

  //       // Log the AI response to ensure it's correct
  //       // console.log("AI response:", aiResponse);

  //       const aiMessage = {
  //         role: "ai",
  //         text: aiResponse,
  //       };

  //       setMessages((prevMessages) => [...prevMessages, aiMessage]);

  //     } catch (error) {
  //       console.error("Error generating AI response:", error);
  //       const errorMessage = {
  //         role: "ai",
  //         text: "Sorry, something went wrong. Please try again later.",
  //       };
  //       setMessages((prevMessages) => [...prevMessages, errorMessage]);
  //     } finally {
  //       setIsLoading(false); // Stop loading
  //     }
  //   }
  // };

  const handleInputSubmit = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && !isLoading) {
      // Validate input text or image URL
      if (!inputText.trim() && !image.dbData?.url) return;
  
      // Create a user message object
      const userMessage = {
        role: "user",
        text: inputText,
        image: image.dbData?.url, // Optional image URL
        aiData: image.aiData,     // Optional AI-specific data
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage]);
  
      // Clear input fields
      setInputText("");
      setImage({ isLoading: false, dbData: null }); // Reset image state
      setIsLoading(true); // Start loading
  
      try {
        // Generate AI response based on available data
        const payload = image.aiData
          ? [image.aiData, inputText] // Include aiData if available
          : [inputText];             // Only inputText if aiData is not available
  
        // console.log("Payload for AI API:", payload);
  
        const aiResponse = await generateContentWithRetry(payload);
  
        const aiMessage = {
          role: "ai",
          text: aiResponse,
        };
  
        // Append AI response to messages
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error generating AI response:", error);
  
        const errorMessage = {
          role: "ai",
          text: "Sorry, something went wrong. Please try again later.",
        };
  
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };
  

  

  const clearUploadedFile = () => {
    setImage({ isLoading: false, dbData: null }); // Reset image in context
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
        clearUploadedFile={clearUploadedFile} // Pass clear function
      />
    </div>
  );
}

export default Dashboard;

























// import React, { useState, useRef } from "react";
// import Header from "./Header";
// import ChatBody from "./ChatBody";
// import ChatInput from "./ChatInput";
// import { useImage } from "../../contexts/ImageContext";
// import { useLoading } from "../../contexts/LoadingContext";
// import { generateContentWithRetry } from "../../lib/GeminiHelper";

// function Dashboard() {
//   const [inputText, setInputText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const inputRef = useRef(null);
//   const { image, setImage } = useImage();
//   const { isLoading, setIsLoading } = useLoading();

//   const handleInputSubmit = async (e) => {
//     if ((e.key === "Enter" || e.type === "click") && !isLoading) {
//       if (!inputText.trim() && !image.dbData?.url) return;

//       const userMessage = {
//         role: "user",
//         text: inputText,
//         image: image.dbData?.url,
//       };

//       setMessages((prevMessages) => [...prevMessages, userMessage]);

//       setInputText(""); // Clear input field
//       setImage({ isLoading: false, dbData: null }); // Reset image state

//       setIsLoading(true); // Start loading

//       try {
//         // Generate AI response with retries and image if available
//         const aiResponse = await generateContentWithRetry(inputText, image.dbData?.url);

//         // Log the AI response to ensure it's correct
//         console.log("AI response:", aiResponse);

//         const aiMessage = {
//           role: "ai",
//           text: aiResponse,
//         };

//         setMessages((prevMessages) => [...prevMessages, aiMessage]);
//       } catch (error) {
//         console.error("Error generating AI response:", error);
//         const errorMessage = {
//           role: "ai",
//           text: "Sorry, something went wrong. Please try again later.",
//         };
//         setMessages((prevMessages) => [...prevMessages, errorMessage]);
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     }
//   };

//   const clearUploadedFile = () => {
//     setImage({ isLoading: false, dbData: null }); // Reset image in context
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
//         clearUploadedFile={clearUploadedFile} // Pass clear function
//       />
//     </div>
//   );
// }

// export default Dashboard;












































// // Updated Dashboard component
// import React, { useState, useRef } from "react";
// import Header from "./Header";
// import ChatBody from "./ChatBody";
// import ChatInput from "./ChatInput";
// import { useImage } from "../../contexts/ImageContext";
// import { useLoading } from "../../contexts/LoadingContext";
// import model from "../../lib/gemini";

// function Dashboard() {
//   const [inputText, setInputText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const inputRef = useRef(null);
//   const { image, setImage } = useImage();
//   const { isLoading, setIsLoading } = useLoading();

//   const handleInputSubmit = async (e) => {
//     if ((e.key === "Enter" || e.type === "click") && !isLoading) {
//       if (!inputText.trim() && !image.dbData?.url) return;

//       const userMessage = {
//         role: "user",
//         text: inputText,
//         image: image.dbData?.url,
//       };

//       setMessages((prevMessages) => [...prevMessages, userMessage]);

//       setInputText(""); // Clear input field
//       setImage({ isLoading: false, dbData: null }); // Reset image state

//       setIsLoading(true); // Start loading

//       try {
//         const aiResponse = await model.generateContent(inputText);
//         const aiMessage = {
//           role: "ai",
//           text: aiResponse.response.text(),
//         };

//         setMessages((prevMessages) => [...prevMessages, aiMessage]);
//       } catch (error) {
//         console.error("Error generating AI response:", error);
//         const errorMessage = {
//           role: "ai",
//           text: "Sorry, something went wrong. Please try again later.",
//         };
//         setMessages((prevMessages) => [...prevMessages, errorMessage]);
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     }
//   };

//   const clearUploadedFile = () => {
//     setImage({ isLoading: false, dbData: null }); // Reset image in context
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
//         clearUploadedFile={clearUploadedFile} // Pass clear function
//       />
//     </div>
//   );
// }

// export default Dashboard;