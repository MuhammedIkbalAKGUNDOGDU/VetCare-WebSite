import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopItem from "../components/shopItem";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Sepet state
  const [totalPrice, setTotalPrice] = useState(0); // Toplam fiyat
  const categories = ["Mama", "Oyuncak"];
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

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
  }, [selectedCategory]);

  // Ürün tıklandığında sepete ekleme fonksiyonu
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.productID);

      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.productID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        calculateTotalPrice(updatedCart); // Fiyatı güncelle
        return updatedCart;
      } else {
        const updatedCart = [
          ...prevCart,
          { id: product.productID, quantity: 1, price: product.price }
        ];
        calculateTotalPrice(updatedCart); // Fiyatı güncelle
        return updatedCart;
      }
    });
  };

  // "3 al 2 öde" kampanyasına göre toplam fiyatı hesapla
  const calculateTotalPrice = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      const freeItems = Math.floor(item.quantity / 3); // 3 üründen 1 tanesi bedava
      const paidItems = item.quantity - freeItems;  // Ödenecek ürün sayısı
      total += paidItems * item.price;
    });
    setTotalPrice(total);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Aylar 0-11 arasında olduğu için +1
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Siparişi gönderme fonksiyonu
  const handleOrderSubmit = async () => {
    const sepetDTO = {
      ownerID: userData, // Kullanıcı ID
      productIDs: cart.map((item) => item.id), // Ürün ID'leri
      orderDate: formatDate(new Date()), // Tarihi formatla
      quantities: cart.map((item) => item.quantity), // Ürün miktarları
    };
    console.log(sepetDTO);
    try {
      const response = await axios.post(
        "http://localhost:8081/order/totalOrderPrice",
        sepetDTO
      );
      console.log("Sipariş başarıyla gönderildi:", response.data);
      setCart([]); // Sepeti temizle
      alert("Siparişiniz başarıyla alındı!");
    } catch (error) {
      console.error("Sipariş gönderilirken hata oluştu:", error);
      alert("Sipariş gönderilirken bir hata oluştu.");
    }
  };

  return (
    <div className="p-8">
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
            <div
              key={index}
              onClick={() => handleAddToCart(product)}
              className="cursor-pointer"
            >
              <ShopItem productInfo={product} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">Bu kategoride ürün bulunamadı.</p>
        )}
      </div>

      <div className="mx-6 mt-6">
        <h2 className="text-xl font-bold mt-8">Sepet</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <p key={index}>
              Ürün ID: {item.id} - Miktar: {item.quantity} - Fiyat: {item.price} TL
            </p>
          ))
        ) : (
          <p className="text-gray-500">Sepetiniz boş.</p>
        )}

        <p className="font-bold mt-2 text-xl">Tutar : {totalPrice} TL</p>

        <div
          onClick={handleOrderSubmit}
          className="bg-lime-500 w-fit p-2 px-6 mt-3 rounded-2xl font-bold text-white text-xl cursor-pointer"
        >
          Sipariş Ver
        </div>
      </div>
    </div>
  );
};

export default Shop;
