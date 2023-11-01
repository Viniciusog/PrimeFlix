import { createContext, useState, useContext} from 'react';
import {useCallback, useMemo, useEffect} from 'react';
import API from '../../source/axios'

export interface IFavoriteContextData {
    favoriteMovies: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    printFavorite: () => void;
    removeAll: () => void;
  }

export const FavoriteContext = createContext({} as IFavoriteContextData);

interface IFavoriteProviderProps {
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<IFavoriteProviderProps> = ({ children }) => {
    const [favoriteMovies, setFavoriteMovies] = useState(() => {
      return JSON.parse(localStorage.getItem('FAVORITE_MOVIES') || "[]"); 
    })

    function addFavorite(id: number) { 
      console.log("ADD FAVORITE - id: " + id)
      let arrayRecuperado = JSON.parse(localStorage.getItem('FAVORITE_MOVIES') || "[]"); 
      arrayRecuperado.push(id)
      localStorage.setItem('FAVORITE_MOVIES', JSON.stringify(arrayRecuperado));
      setFavoriteMovies(arrayRecuperado)
    }
    
    function removeFavorite(id: number) {
      console.log("REMOVE FAVORITE - id: " + id)
      let arrayRecuperado = JSON.parse(localStorage.getItem('FAVORITE_MOVIES') || "[]"); 
      arrayRecuperado = arrayRecuperado.filter((value: number) => value != id)
      localStorage.setItem('FAVORITE_MOVIES', JSON.stringify(arrayRecuperado));
      setFavoriteMovies(arrayRecuperado)
    }

    function printFavorite() {
      let arrayRecuperado = JSON.parse(localStorage.getItem('FAVORITE_MOVIES') || "[]"); 
      console.log("array recuperado: ")
      arrayRecuperado?.map((value: number) => {console.log(value)})
    }

    function removeAll() {
      setFavoriteMovies([])
    }

    return (
      <FavoriteContext.Provider value={{ favoriteMovies, addFavorite, removeFavorite, printFavorite, removeAll }}>
        {children}
      </FavoriteContext.Provider>
    );
  };
  
  export const useFavoriteMovie = () => useContext(FavoriteContext);