import {
  List,
  ListItem,
  Divider,
  Text,
  HStack,
  Input,
  Button,
  Box,
  useNumberInput,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";

const Item = (item) => {
  const {
    value,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: item.count,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    item.onCountChange(item.id, value);
    item.refresh();
  }, [value]);

  return (
    <ListItem marginBottom={20}>
      <Text
        fontSize="2xl"
        display="flex"
        justifyContent="space-between"
        alignContent="center"
      >
        <span>{item.title}</span>
        <Button onClick={() => item.deleteProp(item.id)}>
          <DeleteIcon color="red" />
        </Button>
      </Text>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin="20px 0"
      >
        <Box>
          <Text fontSize="1xl">Quantity</Text>
          <HStack maxW="200px">
            <Button {...inc}>+</Button>
            <Input {...input} textAlign="center" autoFocus={false} />
            <Button {...dec}>-</Button>
          </HStack>
        </Box>
        <Text fontSize="1xl">{(item.price * value).format()}</Text>
      </Box>
      <Divider />
    </ListItem>
  );
};

export function ShoppingCart({ list, onCountChange, deleteProp }) {
  const [, setState] = useState(0);
  const refresh = () => setState(Math.random());

  const memoList = useMemo(
    () => (
      <List padding={10}>
        {list.map((item) => (
          <Item
            key={item.id}
            {...item}
            deleteProp={deleteProp}
            onCountChange={onCountChange}
            refresh={refresh}
          />
        ))}
      </List>
    ),
    [list]
  );

  const total = list.reduce((result, item) => {
    result += item.count * item.price;
    return result;
  }, 0);

  if (total === 0) {
    return (
      <Text>
        <ArrowBackIcon />
      </Text>
    );
  }

  return (
    <>
      {memoList}
      <Box position="absolute" left={0} bottom={0} width="100%">
        <Text fontSize="3xl" lineHeight="60px" textAlign="center">
          Total: {total.format()}
        </Text>
      </Box>
    </>
  );
}
