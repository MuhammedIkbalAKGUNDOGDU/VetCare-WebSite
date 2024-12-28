import React from "react";
import ShopItem from "../components/shopItem";
const Shop = () => {
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
      {productInfo.map((productInfo, index) => (
        <ShopItem productInfo={productInfo} key={index} />
      ))}
    </div>
  );
};

export default Shop;
