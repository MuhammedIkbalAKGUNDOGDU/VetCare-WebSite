import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopItem from "../components/shopItem2";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcı verisini çek
  const userData = JSON.parse(localStorage.getItem("userData"));

  // API isteği at
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/order/listOrders/${userData}`
        );
        console.log(response.data.data);
        setOrders(response.data.data); // API'den gelen veriyi state'e kaydet
      } catch (err) {
        setError("Siparişler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // [] bağımlılık dizisi, bileşen ilk render olduğunda çalışır

  // Yüklenme durumu
  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  // Hata durumu
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mx-6 mt-6">Order History</h1>
      <div className="flex flex-wrap gap-4 justify-start mx-6">
        {orders.length > 0 ? (
          orders.map((product) => (
            <ShopItem productInfo={product} key={product.ID} />
          ))
        ) : (
          <p className="w-full text-center">Sipariş bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
