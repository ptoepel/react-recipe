import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import './style.css';
import Recipe from './Recipe'

function App() {
  const APP_ID = "40e190e0";
  const APP_KEY = "bf0410000b3bc820bd49682d8f51b1fa";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response =  await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);

  }

  return (
    <div className="App">
     <h1>Hello Recipe Master</h1>
     <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button className="search-button" type="submit">
        SEARCH
      </button>
     </form>
     {recipes.map(recipe => (
       <Recipe
       key={recipe.recipe.calories}
       title={recipe.recipe.label} 
       calories={recipe.recipe.calories} 
       image={recipe.recipe.image} 
       ingredients={recipe.recipe.ingredients}
       />
     ))}

    </div>
  );
}

export default App;
