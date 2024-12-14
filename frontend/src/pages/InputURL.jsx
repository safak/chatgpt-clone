import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoData, clearVideoData } from "../store/currentVideoSlice"; // Redux actions
import videoService from "../AserverAuth/config";
import VideoDetails from "./VideoDetails";

const InputURL = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.currentVideo.videoData); // Access Redux store

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const videoId = getYouTubeVideoId(url);
  //   if (!videoId) {
  //     setError("Please enter a valid YouTube video URL.");
  //     dispatch(clearVideoData()); // Reset video data in Redux
  //     return;
  //   }

  //   setError("");
  //   setIsLoading(true);

  //   try {
  //     const response = await videoService.addVideo(url);
  //     dispatch(setVideoData(response.data)); // Update Redux store
  //   } catch (error) {
  //     console.error("Error adding video:", error);
  //     alert("Error adding video Duration should be less than 20 min")
  //     dispatch(clearVideoData()); // Clear Redux state on error
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      setError("Please enter a valid YouTube video URL.");
      dispatch(clearVideoData()); // Reset video data in Redux
      return;
    }
  
    setError("");
    setIsLoading(true);
  
    try {
      const response = await videoService.addVideo(url);
  
      if (response.status === 201) {
        dispatch(setVideoData(response)); // Update Redux store with success response
      } else {
        setError(response.message); // Display error message
        dispatch(clearVideoData()); // Clear Redux state on error
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      dispatch(clearVideoData()); // Clear Redux state on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="relative">
      <form className="flex space-x-2 mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="relative">
        {/* Overlay loader on top of the video details or placeholder */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {videoData ? (
          <VideoDetails data={videoData} />
        ) : (
          <p className="text-gray-500">Enter a Valid URL to see details with duration less than 20 min</p>
        )}
      </div>
    </div>
  );
};

export default InputURL;

