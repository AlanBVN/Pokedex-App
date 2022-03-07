import {useState, useEffect} from 'react';
import axios from "axios";
import {
  Text,
  Box,
  Stack,
  Image,
  Grid,
  Button,
  HStack,
  VStack,
  Flex,
  Progress,
  Tag,
  Collapse,
  useDisclosure,
  Spinner
} from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi"
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useColorMode } from "@chakra-ui/color-mode";




export const Card = ({ poke }) => {

  const { isOpen, onToggle } = useDisclosure();
    const { colorMode } = useColorMode();


  return (
    <>
      <Box py={10} px={14} w="full" h="full">
        <HStack w="100%">
          {/* CARD */}
          <VStack>
            <Box
              w="300px"
              bg={colorMode === "light" ? "white" : "gray.700"}
              h="230px"
              rounded="xl"
              boxShadow="2xl"
              position="relative"
              zIndex="1"
            >
              <VStack>
                <Text
                  color={colorMode === "light" ? "#e9e8e7" : "gray.600"}
                  fontSize="100px"
                  fontWeight="600"
                  position="absolute"
                  zIndex="10"
                  mt="-10px"
                  opacity={colorMode === "light" ? "1" : "0.6"}
                >
                  #
                  {poke.id.toLocaleString("en-US", {
                    minimumIntegerDigits: 3,
                    useGrouping: false,
                  })}
                </Text>
                <LazyLoadComponent
                  placeholder={
                    <Spinner
                      my="80px"
                      color="yellow.300"
                      thickness="6px"
                      w="60px"
                      h="60px"
                    />
                  }
                >
                  <Image
                    zIndex="9999"
                    alignItems="center"
                    justifyContent="center"
                    pt="8px"
                    w={"95px"}
                    src={
                      poke.sprites.other
                        ? poke.sprites.other.home.front_default
                        : poke.sprites.front_default
                    }
                  />
                </LazyLoadComponent>
                <Text
                  textTransform="capitalize"
                  fontSize="19px"
                  fontWeight="500"
                  color={colorMode === "light" ? "#66625c" : "gray.400"}
                >
                  {poke.name.replace(/-/g, "")}
                </Text>
                <Flex
                  justifyContent="center"
                  align="center"
                  bg={colorMode === "light" ? "white" : "gray.700"}
                  color={colorMode === "light" ? "#66625c" : "gray.400"}
                  rounded="full"
                  w="60px"
                  h="60px"
                  boxShadow="md"
                  position="absolute"
                  top="-7"
                  left="-7"
                >
                  <Text fontWeight="semibold" fontSize="12px">
                    {poke.height / 10}m
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  align="center"
                  bg={colorMode === "light" ? "white" : "gray.700"}
                  color={colorMode === "light" ? "#66625c" : "gray.400"}
                  rounded="full"
                  w="60px"
                  h="60px"
                  boxShadow="md"
                  position="absolute"
                  top="-7"
                  right="-7"
                >
                  <Text fontWeight="semibold" fontSize="12px">
                    {poke.weight / 10}kg
                  </Text>
                </Flex>
                <HStack>
                  {poke.types.map((t) => {
                    return (
                      <>
                        <Text
                          fontSize="13px"
                          fontWeight="500"
                          textTransform="uppercase"
                          color="white"
                          bg={`pokemon.${t.type.name}`}
                          rounded="4px"
                          py="1px"
                          px="8px"
                          opacity="0.9"
                        >
                          {t.type.name}
                        </Text>
                      </>
                    );
                  })}
                </HStack>

                <HStack pt="8px">
                  {poke.abilities.map((abilities) => {
                    return (
                      <>
                        <Text
                          color={
                            colorMode === "light" ? "gray.600" : "gray.500"
                          }
                          fontSize="13px"
                          fontWeight="500"
                          textTransform="capitalize"
                        >
                          {abilities.ability.name.replace(/-/g, " ")}
                        </Text>
                      </>
                    );
                  })}
                </HStack>
              </VStack>
            </Box>
          </VStack>
          {/* STATS */}
          <VStack align="flex-end">
            {poke.stats.map((s) => {
              return (
                <Box>
                  <HStack ml="50px" spacing="20px">
                    <Text
                      isTruncated
                      letterSpacing="0.3px"
                      color={colorMode === "light" ? "gray" : "gray.400"}
                      fontWeight="400"
                      fontSize="14px"
                      textTransform="capitalize"
                    >
                      {s.stat.name.replace(/-/g, " ")}
                    </Text>
                    <Text
                      py="1px"
                      px="4px"
                      rounded="5px"
                      fontWeight="500"
                      fontSize="13px"
                      color={colorMode === "light" ? "gray" : "gray.400"}
                    >
                      {s.base_stat}
                    </Text>
                    <Progress
                      max={120}
                      h="9px"
                      rounded="2px"
                      bg={colorMode === "light" ? "gray.200" : "gray.600"}
                      colorScheme={
                        s.base_stat < 50
                          ? "red"
                          : s.base_stat <= 85
                          ? "orange"
                          : "yellow"
                      }
                      w="300px"
                      value={s.base_stat}
                    />
                  </HStack>
                </Box>
              );
            })}
          </VStack>
          <Box>
            <Button
              onClick={onToggle}
              letterSpacing="0.6px"
              ml="60px"
              px="16px"
              fontSize="10px"
              variant="solid"
              colorScheme={colorMode === "light" ? "teal" : "gray"}
              rounded="4px"
              textTransform="uppercase"
              fontWeight="500"
            >
              {isOpen === true ? "Hide details" : "Show details"}
            </Button>
          </Box>
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          <Flex w="full" h="auto" mt="30px">
            <HStack spacing={6}>
              {poke.species.length >= 0 ? (
                poke.species.map((p) => {
                  return (
                    <>
                      <Box
                        minW="140px"
                        h="auto"
                        rounded="5px"
                        px="15px"
                        py="10px"
                      >
                        <VStack spacing={0.4}>
                          <Image
                            w="95px"
                            src={
                              p.species_name.sprites.other
                                ? p.species_name.sprites.other.home
                                    .front_default
                                : p.species_name.sprites.front_default
                            }
                          />
                          <Text
                            fontSize="13px"
                            fontWeight="400"
                            color={
                              colorMode === "light" ? "gray.400" : "gray.500"
                            }
                          >
                            #
                            {p.species_name.id.toLocaleString("en-US", {
                              minimumIntegerDigits: 3,
                              useGrouping: false,
                            })}
                          </Text>
                          <Text
                            textTransform="capitalize"
                            fontSize="15px"
                            fontWeight="500"
                            color={
                              colorMode === "light" ? "#66625c" : "gray.400"
                            }
                          >
                            {p.species_name.name.replace(/-/g, "")}
                          </Text>
                          <HStack>
                            {p.species_name.types.map((t) => {
                              return (
                                <>
                                  <Box pt="10px">
                                    <Text
                                      fontSize="10px"
                                      fontWeight="400"
                                      textTransform="uppercase"
                                      color={
                                        colorMode === "light"
                                          ? "white"
                                          : "gray.800"
                                      }
                                      bg={`pokemon.${t.type.name}`}
                                      rounded="4px"
                                      py="1px"
                                      px="8px"
                                      opacity={
                                        colorMode === "light" ? "0.7" : "0.9"
                                      }
                                    >
                                      {t.type.name}
                                    </Text>
                                  </Box>
                                </>
                              );
                            })}
                          </HStack>
                        </VStack>
                      </Box>
                    </>
                  );
                })
              ) : (
                <Text fontWeight="600" fontSize="20px">
                  No evolutions found
                </Text>
              )}
              <Flex>
                <Box mx="20px">
                  <Text
                    ml="7px"
                    mb="5px"
                    fontSize="20px"
                    fontWeight="600"
                    color={colorMode === "light" ? "#66625c" : "gray.500"}
                  >
                    Moves List
                  </Text>
                  {poke.moves.map((p) => {
                    return (
                      <Tag
                        rounded="10px"
                        textTransform="capitalize"
                        fontSize="13px"
                        fontWeight="400"
                        color={colorMode === "light" ? "gray.500" : "gray.500"}
                        bg={colorMode === "light" ? "gray.200" : "gray.900"}
                        variant="solid"
                        borderColor="red"
                        ml="7px"
                        mt="8px"
                      >
                        {p.move.name.replace(/-/g, "")}
                      </Tag>
                    );
                  })}
                </Box>
              </Flex>
            </HStack>
          </Flex>
        </Collapse>
      </Box>
    </>
  );
};
