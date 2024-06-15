import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [trips, setTrips] = useState([]);

  const findLocate = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${text}`
      );
      setTrips(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    findLocate();
  }, [text]);

  const cutDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  };

  const handleTagClick = (tag) => {
    setText(tag);
  };

  return (
    <div className="App">
      <div className="mainContainer">
        <div className="stuckyNavBar">
          <header>
            <h1>เที่ยวไหนดี</h1>
          </header>

          <section>
            <p className="headSearch">ค้นหาที่เที่ยว</p>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="ค้นหาที่เที่ยวกัน..."
              onChange={(event) => {
                setText(event.target.value);
              }}
              value={text}
            />
          </section>
        </div>
        {trips.length > 0 && (
          <main>
            {trips.map((place, index) => (
              <div key={index} className="CardContainer">
                <img className="MainPic" src={place.photos[0]} />
                <div className="Information">
                  <h2>{place.title}</h2>
                  <p>{cutDescription(place.description, 100)}</p>
                  <a href={place.url} target="_blank" rel="noopener noreferrer">
                    อ่านต่อ
                  </a>
                  <p>
                    หมวด:{" "}
                    {place.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="Tag"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                  <div className="smallPic">
                    {place.photos.slice(1, 4).map((photo, idx) => (
                      <img key={idx} className="MorePic" src={photo} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
