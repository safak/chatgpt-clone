
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

//     // Set loading state immediately before starting the API call
//     setIsLoading(true);

//     try {
//       const payload = image.aiData ? [image.aiData, inputText] : [inputText];
//       const aiResponse = await startChatWithMessage(payload);

//       const modelMessage = { role: "model", text: aiResponse };
//       addMessage(modelMessage);
//       setIsLoading(false);

//       // Upload chat history
//       const formattedMessages = [...messages, userMessage, modelMessage].map((message) => ({
//         role: message.role,
//         parts: [{ text: message.text }],
//         image: message.image || null,
//       }));

//       try {
//         console.log("The id for current file:", image.currentFileId)
//         const resultUpload = await uploadService.addChatHistory(formattedMessages, image.currentFileId); // Include URL if available
//         console.log("After uplading history result:", resultUpload)
//       } catch (error) {
//         console.log("Error saving history:", error);
//       }
//     } catch (error) {
//       console.error("Error during startChatWithMessage:", error);
//       try {
//         const payload = image.aiData ? [image.aiData, inputText] : [inputText];
//         const fallbackResponse = await generateContentWithRetry(payload);

//         const fallbackMessage = { role: "model", text: fallbackResponse };
//         addMessage(fallbackMessage);
//         setIsLoading(false);

//         // Upload fallback chat history
//         const formattedMessages = [...messages, userMessage, fallbackMessage].map((message) => ({
//           role: message.role,
//           parts: [{ text: message.text }],
//           image: message.image || null,
//         }));

//         try {
//           const resultUpload = await uploadService.addChatHistory(formattedMessages, image.aiData?.url);
//           console.log("After uplading history result:", resultUpload)
//         } catch (error) {
//           console.log("Error saving history:", error);
//         }
//       } catch (fallbackError) {
//         console.error("Fallback error:", fallbackError);
//         addMessage({
//           role: "model",
//           text: "Sorry, something went wrong. Please try again later.",
//         });

//         // Attempt to save fallback chat history
//         try {
//           const formattedMessages = [...messages, userMessage].map((message) => ({
//             role: message.role,
//             parts: [{ text: message.text }],
//             image: message.image || null,
//           }));

//           await uploadService.addChatHistory(formattedMessages, image.aiData?.url);
//         } catch (outerFallbackError) {
//           console.error("Outer fallback error while uploading:", outerFallbackError);
//         }
//       }
//     } finally {
//       // Set isLoading to false once all API calls and uploading are done
//       setIsLoading(false);
//     }
//   }
// };
























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
//       image: image.dbData?.url, // Add image URL if it exists
//       aiData: image.aiData, // Send AI data if it exists
//     };
//     addMessage(userMessage);

//     setInputText("");
//     setImage({ isLoading: false, dbData: null });

//     // Set loading state immediately before starting the API call
//     setIsLoading(true);





//     try {


      
//       // Check if image URL exists, and fetch & convert to base64
//       let inlineData ={};

//       if (image.dbData?.url) {
//         // Fetch image from the URL and convert to base64
//         console.log("Inside the encoding system");
//         try {
//           const response = await fetch(image.dbData.url);
//           if (!response.ok) {
//             throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
//           }
      
//           const fileBlob = await response.blob();
//           const reader = new FileReader();
      
//           inlineData = new Promise((resolve, reject) => {
//             reader.onloadend = () => {
//               // Base64 string (excluding the data URL prefix)
//               const base64Data = reader.result.split(",")[1];
//               inlineData = {
//                 data: base64Data, // Base64 string of the file
//                 mimeType: fileBlob.type, // Mime type of the file
//               };
//               resolve(inlineData);  // Resolve with the inlineData object
//             };
//             reader.onerror = reject; // Reject if an error occurs
//             reader.readAsDataURL(fileBlob); // Convert the fileBlob to base64
//           });
      
//           // Wait for the base64 data and mimeType before continuing
//           inlineData = await inlineData; // Ensure aiData contains the inlineData
      
//         } catch (error) {
//           console.error("Error fetching or encoding image:", error);
//           setError(`Failed to fetch and encode image: ${error.message}`);
//           setIsLoading(false);
//           return;
//         }
//       }
      
      
//       // Prepare the payload for the model API call
//       const payload = inlineData ? [inlineData, inputText] : [inputText];
//       console.log("The payload is in the formate:", payload)
//       const aiResponse = await startChatWithMessage(payload);
      


















//       // Process AI response
//       const modelMessage = { role: "model", text: aiResponse };
//       addMessage(modelMessage);
//       setIsLoading(false);
      

//       const formattedMessages = [...messages, userMessage, modelMessage].map((message) => ({
//         role: message.role,
//         parts: [{ text: message.text }],
//         image: message.image || null,
//       }));

//       try {
//         console.log("The id for current file:", image.currentFileId);
//         const resultUpload = await uploadService.addChatHistory(formattedMessages, image.currentFileId); // Include URL if available
//         console.log("After uploading history result:", resultUpload);
//       } catch (error) {
//         console.log("Error saving history:", error);
//       }
//     } catch (error) {
//       console.error("Error during startChatWithMessage:", error);
//       try {
//         const payload = image.aiData ? [image.aiData, inputText] : [inputText];
//         const fallbackResponse = await generateContentWithRetry(payload);

//         const fallbackMessage = { role: "model", text: fallbackResponse };
//         addMessage(fallbackMessage);
//         setIsLoading(false);

//         // Upload fallback chat history
//         const formattedMessages = [...messages, userMessage, fallbackMessage].map((message) => ({
//           role: message.role,
//           parts: [{ text: message.text }],
//           image: message.image || null,
//         }));

//         try {
//           const resultUpload = await uploadService.addChatHistory(formattedMessages, image.aiData?.url);
//           console.log("After uploading history result:", resultUpload);
//         } catch (error) {
//           console.log("Error saving history:", error);
//         }
//       } catch (fallbackError) {
//         console.error("Fallback error:", fallbackError);
//         addMessage({
//           role: "model",
//           text: "Sorry, something went wrong. Please try again later.",
//         });

//         // Attempt to save fallback chat history
//         try {
//           const formattedMessages = [...messages, userMessage].map((message) => ({
//             role: message.role,
//             parts: [{ text: message.text }],
//             image: message.image || null,
//           }));

//           await uploadService.addChatHistory(formattedMessages, image.aiData?.url);
//         } catch (outerFallbackError) {
//           console.error("Outer fallback error while uploading:", outerFallbackError);
//         }
//       }
//     } finally {
//       // Set isLoading to false once all API calls and uploading are done
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
  messages,
  isLoading,
  setIsLoading,
}) => {
  if ((e.key === "Enter" || e.type === "click") && !isLoading) {
    if (!inputText.trim() && !image.dbData?.url) {
      console.warn("Input is empty and no image is provided.");
      return;
    }

    const userMessage = {
      role: "user",
      text: inputText,
      image: image.dbData?.url, // Directly use the image URL if it exists
      aiData: image.aiData, // Send AI data if it exists
    };
    addMessage(userMessage);

    setInputText("");
    setImage({ isLoading: false, dbData: null });

    // Set loading state immediately before starting the API call
    setIsLoading(true);

    try {
      // Prepare the payload for the model API call
      const payload = image.dbData?.url ? [inputText, image.dbData?.url] : [inputText];
      // console.log("The payload is in the format:", payload);

      // Send the message and image URL (if available) to startChatWithMessage
      const aiResponse = await startChatWithMessage(payload);

      // Process AI response
      const modelMessage = { role: "model", text: aiResponse };
      addMessage(modelMessage);
      setIsLoading(false);

      const formattedMessages = [...messages, userMessage, modelMessage].map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],
        image: message.image || null,
      }));

      try {
        console.log("The id for current file:", image.currentFileId);
        const resultUpload = await uploadService.addChatHistory(formattedMessages, image.currentFileId); // Include URL if available
        console.log("After uploading history result:", resultUpload);
      } catch (error) {
        console.log("Error saving history:", error);
      }
    } catch (error) {
      console.error("Error during startChatWithMessage:", error);
      try {
        const payload = image.aiData ? [image.aiData, inputText] : [inputText];
        const fallbackResponse = await generateContentWithRetry(payload);

        const fallbackMessage = { role: "model", text: fallbackResponse };
        addMessage(fallbackMessage);
        setIsLoading(false);

        // Upload fallback chat history
        const formattedMessages = [...messages, userMessage, fallbackMessage].map((message) => ({
          role: message.role,
          parts: [{ text: message.text }],
          image: message.image || null,
        }));

        try {
          const resultUpload = await uploadService.addChatHistory(formattedMessages, image.aiData?.url);
          console.log("After uploading history result:", resultUpload);
        } catch (error) {
          console.log("Error saving history:", error);
        }
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
        addMessage({
          role: "model",
          text: "Sorry, something went wrong. Please try again later.",
        });

        // Attempt to save fallback chat history
        try {
          const formattedMessages = [...messages, userMessage].map((message) => ({
            role: message.role,
            parts: [{ text: message.text }],
            image: message.image || null,
          }));

          await uploadService.addChatHistory(formattedMessages, image.aiData?.url);
        } catch (outerFallbackError) {
          console.error("Outer fallback error while uploading:", outerFallbackError);
        }
      }
    } finally {
      // Set isLoading to false once all API calls and uploading are done
      setIsLoading(false);
    }
  }
};
