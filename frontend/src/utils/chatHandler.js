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
  fileUrl,
  fileId,
  vectorData
}) => {
  
  if ((e.key === "Enter" || e.type === "click") && !isLoading) {
    if (!inputText.trim() && !fileUrl) {
      console.warn("Input is empty and no image is provided.");
      return;
    }

    const userMessage = {
      role: "user",
      text: inputText,
      image: fileUrl, // Directly use the image URL if it exists
    };
    addMessage(userMessage);

    setInputText("");
    setImage({ isLoading: false, dbData: null });

    // Set loading state immediately before starting the API call
    setIsLoading(true);

    try {
      // Prepare the payload for the model API call
      const payload = fileUrl ? [inputText, fileUrl] : [inputText];
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
        // console.log("The id for current file:", image.currentFileId);
        const resultUpload = await uploadService.addChatHistory(formattedMessages, fileId); // Include URL if available
        // console.log("After uploading history result:", resultUpload);
      } catch (error) {
        console.log("Error saving history:", error);
      }
    } catch (error) {
      console.error("Error during startChatWithMessage:", error);
      try {
        const payload = fileUrl ? [fileUrl, inputText] : [inputText];
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
          const resultUpload = await uploadService.addChatHistory(formattedMessages, fileId);
          // console.log("After uploading history result:", resultUpload);
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

          await uploadService.addChatHistory(formattedMessages, image.dbData?.url);
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
