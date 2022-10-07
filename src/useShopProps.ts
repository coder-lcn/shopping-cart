import { useState } from "react";

const list = [
  {
    id: 1,
    title: "Starry Night",
    price: 79.95,
  },
  {
    id: 2,
    title: "Rosy-Fingered Dawn at Louse Point",
    price: 49.95,
  },
];

export const useShopProps = () => {
  const [data, setData] = useState(list);

  return {
    data,
  };
};
