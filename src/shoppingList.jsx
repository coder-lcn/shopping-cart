import { List, ListItem, Text, Button } from "@chakra-ui/react";

export function ShoppingList({ data, onAdd }) {
  return (
    <List className="shopping-list">
      {data.map((item) => (
        <ListItem key={item.id} onClick={() => onAdd(item)}>
          <Text fontSize="2xl">{item.title}</Text>
          <Text fontSize="1xl">{item.price.format()}</Text>
          <Button colorScheme="blue">ADD To CART</Button>
        </ListItem>
      ))}
    </List>
  );
}
cc
