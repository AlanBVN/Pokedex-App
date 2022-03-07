import { Text, Box } from '@chakra-ui/react';
import React from 'react';


export const DetailsCard = ({poke}) => {
  return (
    <>
      <Box rounded="10px" bg="gray.500" h="300px">
        {/* {poke?.map((p)=> {
          console.log("Asdasdsa", p)
        })} */}
      </Box>
    </>
  );
};

// {poke.map((p) => {
//   return (
//     p.species?.map((n) => {
//       return (
//       <Box>
//       <Text> {n.species_name}</Text>
//       </Box>
//       )
//     }));
// })}