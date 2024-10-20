import { useState, useEffect } from "react";
import "./testPage.css";

const TestPage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  const cards = [
    { id: 1, title: "Card 1", content: "This is the first card." },
    { id: 2, title: "Card 2", content: "This is the second card." },
    { id: 3, title: "Card 3", content: "This is the third card." },
  ];

  return (
    <div className="testPage">
      <p>You clicked {count} times</p>
      <button className="click-me-button" onClick={() => setCount(count + 1)}>
        Click me!
      </button>
      <div className="cards">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h3>{card.title}</h3>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
