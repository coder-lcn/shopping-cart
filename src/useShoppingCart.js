import { useState } from "react";

export const useShoppingCart = () => {
  const [list, setList] = useState([]);

  const getIndex = (id) => list.findIndex((item) => item.id === id);

  const addProp = (prop) => {
    const index = getIndex(prop.id);

    if (index === -1) {
      list.push({ ...prop, count: 1 });
    } else {
      list[index].count++;
    }

    setList(list);
  };

  const onCountChange = (id, count) => {
    const index = getIndex(id);
    list[index].count = count;
  };

  const deleteProp = (id) => {
    const index = getIndex(id);
    list.splice(index, 1);
    setList([...list]);
  };

  return {
    list,
    addProp,
    deleteProp,
    onCountChange,
  };
};
