import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // const byDateDesc = data?.focus.sort((evtA, evtB) =>
  //   new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  // );

  // Ensure data and focus exist before sorting
  const byDateDesc = data?.focus?.length > 0 ? data.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) : [];

  // const nextCard = () => {
  //   setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
  //   // setTimeout(() => setIndex(index < byDateDesc.length ? index + 1 : 0), 5000);
  // };

  // Move to the next card if there are cards in byDateDesc
  // const nextCard = () => {
  //   if (byDateDesc.length > 0) {
  //     setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
  //   }
  // };
  const nextCard = () => {
    if (byDateDesc.length > 0) {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }
  };
  // useEffect(() => {
  //   nextCard();
  // });

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx); // Update the index without affecting the order
  };


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // <React.Fragment key={event.title}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((item, radioIdx) => (
            <input
              key={`radio-${item.id || item.title}`}
              type="radio"
              name="radio-button"
              aria-label={`radio-button-${radioIdx}`}
              checked={index === radioIdx} 
              onChange={() => handleRadioChange(radioIdx)} // Update the index when clicked
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
