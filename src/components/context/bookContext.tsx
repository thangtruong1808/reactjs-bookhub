/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { Book } from "../../services/book-service";
// import { Book } from "../../services/book-service";
// import { Book } from "../../services/book-service";

type bookContextProviderProps = {
  children: React.ReactNode;
};
// export const AppContext = createContext<Book[]>([]);

export const AppContext = createContext<{
  favorites: Book[];
  AddToFavorites: (book: Book) => void;
  RemoveFromFavorites: (id: number) => void;
} | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be within  appContextProvider!");
  }

  return context;
};

const bookContextProvider = ({ children }: bookContextProviderProps) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  const AddToFavorites = (book: Book) => {
    const oldFavovirites = [...favorites];

    const newFavorites = oldFavovirites.concat(book);
    setFavorites(newFavorites);
  };

  const RemoveFromFavorites = (id: number) => {
    const oldFavovirites = [...favorites];
    const newFavorites = oldFavovirites.filter((book) => book.id !== id);
    setFavorites(newFavorites);
  };

  const value = {
    favorites,
    AddToFavorites,
    RemoveFromFavorites,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default bookContextProvider;
