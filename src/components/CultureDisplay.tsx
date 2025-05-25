//@ts-nocheck

import React, { useState, useEffect } from "react";
import "./CultureDisplay.css";
import CultureItem from "@/components/CultureItem/CultureItem";
import { cultureDisplay_list } from "../../public/assets/assets.js";

const getRandomItems = (array, count) => {
  const actualCount = Math.min(count, array.length);
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, actualCount);
};

const CultureDisplay = ({ category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const filteredList =
      category === "All"
        ? cultureDisplay_list
        : cultureDisplay_list.filter((item) => item.type === category);

    const randomItems = getRandomItems(filteredList, 12);
    setItems(randomItems);
  }, [category]);

  return (
    <div className="culture-display">
      <h1 className="culture-heading">Top cultures près de chez vous</h1>
      <div className="culture-grid">
        {items.map((item) => (
          <CultureItem
            key={item.culture_id}
            image={item.image}
            culture_id={item.culture_id}
            nom_culture={item.nom_culture}
            region={item.region}
            saison={item.saison}
            besoin_eau={item.besoin_eau}
            conseil={item.conseil}
            production={item.production}
            Description={item.Description}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default CultureDisplay;