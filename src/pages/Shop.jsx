import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopItem from "../components/shopItem";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const categories = ["Mama", "Oyuncak"];
  const navigate = useNavigate();

  // Kategori değiştiğinde çağrılan fonksiyon
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Seçilen kategoriye göre ürünleri getir
  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/product/getProductsByCategory/${selectedCategory}`
          );
          if (response.data.isSuccess) {
            setProducts(response.data.data);
            console.log("Ürünler:", response.data.data);
          } else {
            setProducts([]);
            console.log("Ürün bulunamadı.");
          }
        } catch (error) {
          console.error("Ürünler getirilirken hata oluştu:", error);
        }
      };

      fetchProducts();
    }
  }, [selectedCategory]); // selectedCategory değiştiğinde tetiklenir

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

      <div className="mx-6 mt-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ShopItem productInfo={product} key={index} />
          ))
        ) : (
          <p className="text-gray-500">Bu kategoride ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
