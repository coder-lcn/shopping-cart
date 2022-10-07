import { useState } from "react";

export const useShoppingCart = () => {
  const [list, setList] = useState([]);

  const addProp = (prop) => {
    const index = list.findIndex((item) => item.id === prop.id);

    if (index === -1) {
      list.push({ ...prop, count: 1 });
    } else {
      list[index].count++;
    }

    setList(list);
  };

  return {
    list,
    addProp,
  };
};
