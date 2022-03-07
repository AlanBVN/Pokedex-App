import { VStack, Button } from '@chakra-ui/react';
import React from 'react';


export const PokeTypes = ({ types }) => {
  return (
      <>
      <VStack mr={6}>
      {types.map((type) => (
          <Button
          rounded="sm"
            color="white"
            textTransform="uppercase"
            fontSize="12px"
            py={1}
            px={6}
            w="130px"
            h="auto"
            bg={`pokemon.${type.name}`}
            _hover={{ opacity: "0.7", cursor: "pointer" }}
            _focus={{
              border: "none",
            }}
          >
            {type.name}
          </Button>
      ))}
    </VStack>
    </>
  )
}

