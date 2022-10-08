import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { ShoppingList } from "./shoppingList";
import { ShoppingCart } from "./shoppingCart";
import { useShopProps } from "./useShopProps";
import { useShoppingCart } from "./useShoppingCart";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useShopProps();
  const { list, addProp, deleteProp, onCountChange } = useShoppingCart();

  const onAddToCart = (item) => {
    onOpen();
    addProp(item);
  };

  return (
    <>
      <ShoppingList data={data} onAdd={onAddToCart} />
      <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <ShoppingCart
            list={list}
            deleteProp={deleteProp}
            onCountChange={onCountChange}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default App;
