import { useState, useEffect } from "react"
import axios from "axios"
import { Card } from "./components/Card/Card"
import { Box, Flex, VStack, HStack, Text, Spinner, Icon } from "@chakra-ui/react"
import { pokeTypesArray } from "./TypesArray"
import TypeBar from "./components/TypeBar/TypeBar"
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useColorMode } from "@chakra-ui/color-mode";
import "./App.css"
import ToggleColorMode from "./components/ToggleColorMode"

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [evolutions, setEvolutions] = useState([]);
  const [species, setSpecies] = useState([]);

  const { colorMode } = useColorMode();


  const getPokemon = async () => {
    let pokemonArray = [];

    for (let i = 1; i <= 151; i++) {
      let data1 = await getPokemonData(i);
      let data2 = await getChainData(i);
      let finalData = Object.assign(data1, { species: data2 });
      pokemonArray.push(finalData);
    }
    setPokemon(pokemonArray);
  };

   const getPokemonFiltered = async () => {
     let pokemonArrayFiltered = [];

     for (let i = 1; i <= 151; i++) {
       let data1 = await getPokemonData(i);
       let data2 = await getChainData(i);
       let finalData = Object.assign(data1, { species: data2 });
       pokemonArrayFiltered.push(finalData);
     }
     setFiltered(pokemonArrayFiltered);
   };

  const getChainData = async (pokeId) => {
    const {
      data: { evolution_chain },
    } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`);
    let infoEvos = await getEvolutions(evolution_chain.url);
    return infoEvos;
  };

  const getPokemonData = async (pokeId) => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeId}/`
    );
    return data;
  };

 const getPokemonsFromType = async (typeName) => {
   window.scrollTo(0, 0);
  if(typeName === "all"){
    setPokemon(filtered);
  } else {
    let filteredPokemons = filtered.filter((pokemon) =>
      pokemon.types.some((tipo) => tipo.type.name == typeName)
    );
    setPokemon(filteredPokemons)
  }
 };

  
  const getPokemonDataFromType = async (pokeName) => {
    let { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}/`
    );
    return data;
  };

  
  const getEvolutions = async (infoSpecie) => {
    const {
      data: { chain },
    } = await axios.get(`${infoSpecie}`);

    var evoChain = [];
    var evoData = chain;

    do {
      evoChain.push({
        species_name: await getPokemonDataFromType(evoData.species.name),
      });

      evoData = evoData["evolves_to"][0];
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

    return evoChain;
  };


    
const getPokemonDataFromSpecies = async (pokeName) => {
  let { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokeName}/`
  );
  
  let stats = {
    "id": data.id,
    "name": data.name,
    "moves": data.moves,
    "sprites": data.sprites,
    "types": data.types,
  }
  
  return stats;
};

   const getEvolutionsTest = async () => {
    const functionTest = async (id) => {
      const {
        data: { chain },
      } = await axios.get(
        `https://pokeapi.co/api/v2/evolution-chain/${id}`
      );

      var evoChain = [];
      var evoData = chain;
  
      do {
        evoChain.push({
          species_name: await getPokemonDataFromSpecies(evoData.species.name),
        });
  
        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

      return evoChain;
    }
    
    let speciesArray = []

     for (let i = 1; i <= 74; i++) {
       let dataX = await functionTest(i) 
       speciesArray.push(dataX)
     }

     setSpecies(speciesArray);

   };


const findSpecies = (name) => {
  let foundSpecies = []
   species.map((s) => {
    let obj = s.find((n) => n.species_name.name === name)
    foundSpecies.push(obj)
   })
}

  useEffect(() => {
    getPokemon();
    getPokemonFiltered();
    setTypes(pokeTypesArray);
    getEvolutions();
    getEvolutionsTest();
  }, []);


  return (
    <>
      <HStack h="100vh">
        <Flex zIndex="999" h="full" w="full" maxW={36} boxShadow="2xl">
          <TypeBar types={types} getPokemonsFromType={getPokemonsFromType} />
        </Flex>
        <Flex h="full" w="full" flex={1}>
          <ToggleColorMode/>
          <VStack overflowY="scroll" w="full" spacing={4}>
            {pokemon.map((poke, i) => {
              return (
                <Box
                  className={
                    colorMode === "light" ? "right-side-bar" : "right-side-bar-dark"
                  }
                  h="full"
                  w="full"
                >
                  <LazyLoadComponent
                    delayMethod="debounce"
                    delayTime={3000}
                    placeholder={
                      <Spinner
                        my="130px"
                        ml="220px"
                        color="yellow.300"
                        thickness="6px"
                        w="50px"
                        h="50px"
                      />
                    }
                  >
                    <Card poke={poke} />
                  </LazyLoadComponent>
                </Box>
              );
            })}
          </VStack>
        </Flex>
      </HStack>
    </>
  );
}

export default App
