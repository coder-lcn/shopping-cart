import {
  List,
  ListItem,
  Divider,
  Text,
  HStack,
  InputGroup,
  Input,
  Button,
  Box,
  useNumberInput,
  InputRightElement,
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
        <Button onClick={() => item.deleteProp(item.id)} data-test-delete>
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
            <Button {...inc} data-test-inc>
              +
            </Button>
            <Input
              {...input}
              textAlign="center"
              autoFocus={false}
              data-test-count
            />
            <Button {...dec} data-test-dec>
              -
            </Button>
          </HStack>
        </Box>
        <Text fontSize="1xl" data-test-price>
          {(item.price * value).format()}
        </Text>
      </Box>
      <Divider />
    </ListItem>
  );
};

const Promo = () => {
  const [editing, setEditing] = useState(false);

  const handleClick = () => {};

  return (
    <Box width="84%" margin="0 auto">
      {editing ? (
        <InputGroup size="md">
          <Input pr="10rem" type="text" placeholder="Promo code" />
          <InputRightElement width="10rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              color="ActiveBorder"
            >
              Apply
            </Button>
            <Button
              h="1.75rem"
              size="sm"
              marginLeft={2}
              color="red"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Button
          width="100%"
          onClick={() => setEditing(true)}
          backgroundColor="transparent"
          border="1px solid #ddd"
          _hover={{ backgroundColor: "transparent" }}
        >
          Promo code?
        </Button>
      )}
    </Box>
  );
};

export function ShoppingCart({ list, onCountChange, deleteProp, onClose }) {
  const [, setState] = useState(0);
  const refresh = () => setState(Math.random());

  const memoList = useMemo(
    () => (
      <List padding={10} data-test-list>
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
      <Box
        data-test-backStore
        display="flex"
        alignItems="center"
        textAlign="center"
        width="100%"
        justifyContent="center"
        marginTop="40vh"
        color="blueviolet"
        cursor="pointer"
        onClick={onClose}
      >
        <ArrowBackIcon />
        <Text marginLeft={2}>Back to store</Text>
      </Box>
    );
  }

  return (
    <>
      {memoList}
      <Promo />
      <Box position="absolute" left={0} bottom={0} width="100%">
        <Box
          display="flex"
          justifyContent="center"
          fontSize="3xl"
          lineHeight="60px"
        >
          <Text>Total:</Text>
          <Text data-test-total>{total.format()}</Text>
        </Box>
      </Box>
    </>
  );
}
