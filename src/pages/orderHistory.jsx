import React from "react";
import ShopItem from "../components/shopItem";
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
const orderHistory = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mx-6 mt-6 ">Order History</h1>
      {productInfo.map((productInfo, index) => (
        <ShopItem productInfo={productInfo} key={index} />
      ))}
    </div>
  );
};

export default orderHistory;
