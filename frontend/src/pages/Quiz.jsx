import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveQuizResponse } from "../store/currentVideoSlice";

const Quiz = () => {
  const dispatch = useDispatch();

  // Sample quiz data
  const data = {
    shortQuestions: [
      { question: "What is the capital of France?" },
      { question: "Explain Newton's Second Law of Motion in one sentence." },
    ],
    mcqs: [
      {
        question: "Which programming language is known as the language of the web?",
        options: ["Python", "C++", "JavaScript", "Java"],
      },
      {
        question: "What is the output of `console.log(typeof null)` in JavaScript?",
        options: ["object", "null", "undefined", "boolean"],
      },
    ],
    fillInTheBlanks: [
      {
        question: "The chemical formula of water is ___?",
        blank: "",
      },
      {
        question: "The first president of the United States was ___?",
        blank: "",
      },
    ],
  };

  const [responses, setResponses] = useState({
    shortAnswers: {},
    mcqAnswers: {},
    fillInTheBlanks: {},
  });

  // Handle Short Answer Change
  const handleShortAnswerChange = (index, value) => {
    setResponses((prev) => ({
      ...prev,
      shortAnswers: { ...prev.shortAnswers, [index]: value },
    }));
  };

  // Handle MCQ Change
  const handleMCQAnswerChange = (index, value) => {
    setResponses((prev) => ({
      ...prev,
      mcqAnswers: { ...prev.mcqAnswers, [index]: value },
    }));
  };

  // Handle Fill-in-the-Blanks Change
  const handleFillBlankChange = (index, value) => {
    setResponses((prev) => ({
      ...prev,
      fillInTheBlanks: { ...prev.fillInTheBlanks, [index]: value },
    }));
  };

  const handleSubmit = () => {
    // Save responses to Redux
    dispatch(saveQuizResponse(responses));

    // Mock submission to a backend API
    fetch("/api/submit-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responses),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Quiz submitted successfully!");
        console.log(data);
      })
      .catch((err) => console.error("Submission Error:", err));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Take the Quiz!
      </h2>

      {/* Short Questions */}
      {data.shortQuestions && data.shortQuestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Short Questions
          </h3>
          {data.shortQuestions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-2">
                <strong>Q:</strong> {q.question}
              </p>
              <input
                type="text"
                placeholder="Your answer"
                className="w-full p-2 border rounded-md"
                value={responses.shortAnswers[index] || ""}
                onChange={(e) => handleShortAnswerChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* MCQs */}
      {data.mcqs && data.mcqs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">MCQs</h3>
          {data.mcqs.map((mcq, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-2">
                <strong>Q:</strong> {mcq.question}
              </p>
              <ul>
                {mcq.options.map((option, i) => (
                  <li key={i} className="mb-2">
                    <label>
                      <input
                        type="radio"
                        name={`mcq-${index}`}
                        value={option}
                        checked={responses.mcqAnswers[index] === option}
                        onChange={() => handleMCQAnswerChange(index, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Fill in the Blanks */}
      {data.fillInTheBlanks && data.fillInTheBlanks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Fill in the Blanks
          </h3>
          {data.fillInTheBlanks.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-2">
                <strong>Q:</strong> {q.question.replace("___", "_____")}
              </p>
              <input
                type="text"
                placeholder="Your answer"
                className="w-full p-2 border rounded-md"
                value={responses.fillInTheBlanks[index] || ""}
                onChange={(e) =>
                  handleFillBlankChange(index, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700 transition w-full text-center"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;
