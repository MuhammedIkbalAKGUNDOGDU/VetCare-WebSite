import React, { useState } from "react";
import ShopItem from "../components/shopItem";
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Electronics", "Clothing", "Books", "Home Appliances"];

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const productInfo = [
    {
      ID: 1,
      name: "Karabaş",
      category: "Shiba",
      price: "123",
      stock: "12",
    },
    {
      ID: 1,
      name: "Karabaş",
      category: "Shiba",
      price: "23",
      stock: "12",
    },
    {
      ID: 1,
      name: "selam",
      category: "Shiba",
      price: "321",
      stock: "12",
    },

    // Diğer pet bilgilerini buraya ekleyin
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mx-6">Choose a Category</h1>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="border rounded-lg p-2 w-64 mx-6"
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {productInfo.map((productInfo, index) => (
        <ShopItem productInfo={productInfo} key={index} />
      ))}
    </div>
  );
};

export default Shop;
