import { useColorMode } from '@chakra-ui/color-mode'
import {
  Button,
  HStack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  Link,
  Center,
  Box,
} from "@chakra-ui/react";
import {
  BsFillSunFill,
  BsFillMoonFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillDribbbleCircle,
} from "react-icons/ai";

const ToggleColorMode = () => {
    const { colorMode, toggleColorMode} = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack pos="absolute" top="5" right="10">
        <Button
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          border="2px"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          onClick={() => toggleColorMode()}
          p="8px"
          zIndex={999}
          _hover={{
            backgroundColor: colorMode === "light" ? "gray.400" : "gray.800",
          }}
        >
          {colorMode === "dark" ? (
            <Icon
              w="20px"
              h="20px"
              color={colorMode === "light" ? "gray.400" : "gray.200"}
              as={BsFillSunFill}
            />
          ) : (
            <Icon
              w="20px"
              h="20px"
              color={colorMode === "light" ? "gray.600" : "gray.200"}
              as={BsFillMoonFill}
            />
          )}
        </Button>
        <Button
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          border="2px"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          p="8px"
          zIndex={999}
          onClick={onOpen}
          _hover={{
            backgroundColor: colorMode === "light" ? "gray.400" : "gray.800",
          }}
        >
          <Icon
            w="20px"
            h="20px"
            color={colorMode === "light" ? "gray.600" : "gray.200"}
            as={BsInfoCircleFill}
          />
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py="20px" bg="gray.800" rounded="7px" h="270px" w="340px">
          <ModalCloseButton
            color="white"
            backgroundColor="gray.700"
            mt="5.5px"
          />
          <ModalBody>
            <Center>
              <Box>
                <Text color="white" fontSize="16px" fontWeight="400">
                  Made by Alan Bilvinas
                </Text>
                <HStack mt="15px">
                  <Link
                    style={{ textDecoration: "none" }}
                    href="https://www.linkedin.com/in/alan-bilvinas/"
                    isExternal
                  >
                    <Button
                      bg="blue.700"
                      color="white"
                      height="48px"
                      width="120px"
                      border="2px"
                      borderColor="blue.600"
                      leftIcon={<AiFillLinkedin color="blue.400" />}
                      _hover={{ backgroundColor: "blue.800" }}
                    >
                      Linkedin
                    </Button>
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    href="https://github.com/AlanBVN"
                    isExternal
                  >
                    <Button
                      bg="gray.700"
                      color="white"
                      height="48px"
                      width="120px"
                      border="2px"
                      borderColor="gray.600"
                      leftIcon={<AiFillGithub />}
                      _hover={{ backgroundColor: "gray.800" }}
                    >
                      Github
                    </Button>
                  </Link>
                </HStack>
                <Text
                  mt="30px"
                  mb="15px"
                  color="white"
                  fontSize="16px"
                  fontWeight="400"
                >
                  inspired by:
                </Text>
                <Link
                  variant="solid"
                  style={{ textDecoration: "none" }}
                  href="https://dribbble.com/shots/6580701-HealthDex-A-Pok-mon-Pok-dex-web-application"
                  isExternal
                >
                  <Button
                    bg="red.700"
                    color="white"
                    height="38px"
                    width="100px"
                    border="2px"
                    borderColor="red.600"
                    leftIcon={<AiFillDribbbleCircle />}
                    _hover={{ backgroundColor: "red.800" }}
                  >
                    dribbble
                  </Button>
                </Link>
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ToggleColorMode;