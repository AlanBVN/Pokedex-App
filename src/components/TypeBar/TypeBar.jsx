import React from 'react';
import { VStack, Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";


const TypeBar = ({ types, getPokemonsFromType }) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <VStack w="100%" p={2}>
        {types.map((type) => (
          <Button
            onClick={() => getPokemonsFromType(type.name)}
            rounded="3px"
            color={`pokemon.${type.name}`}
            w="full"
            h="full"
            textTransform="uppercase"
            opacity={colorMode === "light" ? "1.3" : "0.8"}
            fontSize="13px"
            bg={colorMode === "light" ? "gray.50" : "gray.800"}
            _hover={{
              cursor: "pointer",
              bg: colorMode === "light" ? "gray.200" : "gray.700",
              opacity: "0.8",
            }}
            _focus={{
              border: "none",
            }}
          >
            {type.name}
          </Button>
        ))}
      </VStack>
    </>
  );
};

export default TypeBar;
