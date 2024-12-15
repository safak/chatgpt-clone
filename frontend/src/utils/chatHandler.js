// import { startChatWithMessage, generateContentWithRetry } from "../lib/geminiHelperFunc";
// import uploadService from "../AserverAuth/serviceUpload";

// export const handleInputSubmitLogic = async ({
//   e,
//   inputText,
//   setInputText,
//   image,
//   setImage,
//   addMessage,
//   messages, // Include all current messages
//   isLoading,
//   setIsLoading,
// }) => {
//   if ((e.key === "Enter" || e.type === "click") && !isLoading) {
//     if (!inputText.trim() && !image.dbData?.url) {
//       console.warn("Input is empty and no image is provided.");
//       return;
//     }

//     const userMessage = {
//       role: "user",
//       text: inputText,
//       image: image.dbData?.url,
//       aiData: image.aiData,
//     };
//     addMessage(userMessage);

//     setInputText("");
//     setImage({ isLoading: false, dbData: null });
//     setIsLoading(true);

//     try {
//       const payload = image.aiData ? [image.aiData, inputText] : [inputText];
//       const aiResponse = await startChatWithMessage(payload);

//       const modelMessage = { role: "model", text: aiResponse };
//       addMessage(modelMessage);

//       // Transform messages to the required format
//       const formattedMessages = [...messages, userMessage, modelMessage].map((message) => ({
//         role: message.role,
//         parts: [{ text: message.text }],
//         image: message.image || null,
//       }));

//       // Upload the formatted chat history
//       console.log("Uploading formatted chat history:", formattedMessages);
//       await uploadService.addChatHistory(formattedMessages);
//     } catch (error) {
//       console.error("Error during startChatWithMessage:", error);
//       try {
//         const payload = image.aiData ? [image.aiData, inputText] : [inputText];
//         const fallbackResponse = await generateContentWithRetry(payload);

//         const fallbackMessage = { role: "model", text: fallbackResponse };
//         addMessage(fallbackMessage);

//         // Transform messages to the required format, including fallback
//         const formattedMessages = [...messages, userMessage, fallbackMessage].map((message) => ({
//           role: message.role,
//           parts: [{ text: message.text }],
//           image: message.image || null,
//         }));

//         await uploadService.addChatHistory(formattedMessages);
//       } catch (fallbackError) {
//         console.error("Fallback error:", fallbackError);
//         addMessage({
//           role: "model",
//           text: "Sorry, something went wrong. Please try again later.",
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }
// };


import { startChatWithMessage, generateContentWithRetry } from "../lib/geminiHelperFunc";
import uploadService from "../AserverAuth/serviceUpload";

export const handleInputSubmitLogic = async ({
  e,
  inputText,
  setInputText,
  image,
  setImage,
  addMessage,
  messages, // Include all current messages
  isLoading,
  setIsLoading,
  associatedChat, // Optional: If you have an associated chat, pass it here
}) => {
  if ((e.key === "Enter" || e.type === "click") && !isLoading) {
    if (!inputText.trim() && !image.dbData?.url) {
      console.warn("Input is empty and no image is provided.");
      return;
    }

    const userMessage = {
      role: "user",
      text: inputText,
      image: image.dbData?.url,
      aiData: image.aiData,
    };
    addMessage(userMessage);

    setInputText("");
    setImage({ isLoading: false, dbData: null });

    // Set loading state immediately before starting the API call
    setIsLoading(true);  

    try {
      const payload = image.aiData ? [image.aiData, inputText] : [inputText];
      const aiResponse = await startChatWithMessage(payload);

      const modelMessage = { role: "model", text: aiResponse };
      addMessage(modelMessage);
      setIsLoading(false);

      // Handle aiData URL in onSuccess
      if (image.dbData?.url) {
        try {
          console.log("URL from aiData:", image.aiData.url);

          // Send data to the backend with the expected structure
          await uploadService.addFileData({
            fileUrl: image.dbData?.url, // Use the image URL as the fileUrl
            inlineData: image.aiData.inlineData, // Pass the inlineData
            associatedChat: associatedChat, // Optional: Pass associatedChat ID if needed
          });
        } catch (fileError) {
          console.error("Error while uploading file data:", fileError);
        }
      }

      // Transform messages to the required format
      const formattedMessages = [...messages, userMessage, modelMessage].map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],  // Ensure the parts are structured properly
        image: message.image || null,
      }));

      // Upload the formatted chat history
      console.log("Uploading formatted chat history:", formattedMessages);
      await uploadService.addChatHistory(formattedMessages, image.aiData?.url); // Include URL if available
    } catch (error) {
      console.error("Error during startChatWithMessage:", error);
      try {
        const payload = image.aiData ? [image.aiData, inputText] : [inputText];
        const fallbackResponse = await generateContentWithRetry(payload);

        const fallbackMessage = { role: "model", text: fallbackResponse };
        addMessage(fallbackMessage);

        // Transform messages to the required format, including fallback
        const formattedMessages = [...messages, userMessage, fallbackMessage].map((message) => ({
          role: message.role,
          parts: [{ text: message.text }], 
          image: message.image || null,
        }));

        await uploadService.addChatHistory(formattedMessages, image.aiData?.url); // Include URL in fallback
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
        addMessage({
          role: "model",
          text: "Sorry, something went wrong. Please try again later.",
        });
      }
    } finally {
      // Set isLoading to false once all API calls and uploading are done
      setIsLoading(false);
    }
  }
};



