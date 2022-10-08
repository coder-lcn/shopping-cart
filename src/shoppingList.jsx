import { List, ListItem, Text, Button } from "@chakra-ui/react";

export function ShoppingList({ data, onAdd }) {
  return (
    <List margin="0 auto" width="600px">
      {data.map((item) => (
        <ListItem
          display="flex"
          flexDirection="column"
          boxShadow="0 0 3px rgba(0, 0, 0, 0.15)"
          padding={4}
          marginTop={10}
          key={item.id}
        >
          <Text fontSize="2xl">{item.title}</Text>
          <Text fontSize="1xl">{item.price.format()}</Text>
          <Button
            data-test-addtocart
            alignSelf="flex-end"
            colorScheme="blue"
            onClick={() => onAdd(item)}
          >
            ADD TO CART
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
