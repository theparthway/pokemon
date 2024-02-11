import { useEffect, useState } from "react";
import axios from 'axios';
import List from "./List";
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextUrl, setNextUrl] = useState()
  const [prevUrl, setPrevUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(currentUrl).then(res => {
      setLoading(false)
      setNextUrl(res.data.next)
      setPrevUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    });

  }, [currentUrl])

  function goToNextPage() {
    setCurrentUrl(nextUrl)
  }

  function goToPrevPage() {
    setCurrentUrl(prevUrl)
  }

  if (loading) return "Loading..."

  return (
    <>
    <List pokemon={pokemon} />
    <Pagination
      goToNextPage={nextUrl ? goToNextPage : null}
      goToPrevPage={prevUrl ? goToPrevPage : null} 
    />
    </>
  );
}

export default App;
