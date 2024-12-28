import React, { useState } from "react";
import ShopItem from "../components/shopItem";
import { useNavigate } from "react-router-dom";
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["Electronics", "Clothing", "Books", "Home Appliances"];
  const navigate = useNavigate();
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
      <h1
        onClick={() => navigate("/order-history")}
        className="text-xl mt-8 font-bold mb-4 mx-6 rounded-xl bg-red-500 p-2 text-white cursor-pointer max-w-xs h-auto text-center"
      >
        Order History
      </h1>
      {productInfo.map((productInfo, index) => (
        <ShopItem productInfo={productInfo} key={index} />
      ))}
    </div>
  );
};

export default Shop;
