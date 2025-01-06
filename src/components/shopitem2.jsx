import React from "react";

const ShopItem2 = ({productInfo}) => {
  return (
    <div className="flex flex-col rounded-2xl shadow-xl p-6 bg-white w-full max-w-sm mx-6 h-auto mt-8 cursor-pointer	">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-xl">{productInfo.productName}</div>
        <div className="text-xs text-gray-500">Miktar : {productInfo.quantity}</div>
        <div className="text-xs text-gray-500">Sipariş ID : {productInfo.orderID}</div>
      </div>
      <div className="text-lg font-semibold text-gray-700">{productInfo.totalPrice} TL</div>
    </div>
  );
};

export default ShopItem2;
