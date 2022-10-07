import { List, ListItem, Text, Button } from "@chakra-ui/react";

export function ShoppingCart({ list }) {
  return (
    <List className="shopping-cart">
      {list.map((item) => (
        <ListItem key={item.id} onClick={() => onAdd(item)}>
          <Text fontSize="2xl">{item.title}</Text>
          <Text fontSize="1xl">{item.price.format()}</Text>
        </ListItem>
      ))}
    </List>
  );
}
