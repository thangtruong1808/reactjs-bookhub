import { create } from "zustand";

// BookQuery;, BookQueryStore
type State = {
  searchText?: string;
  genresSelected?: string[];
  authorSelected?: string;
};

type Action = {
  //   bookQuery: BookQuery;
  setSearchText: (searchText: string) => void;
  setGenresSelected: (genresSelected: string[]) => void;
  setAuthorSelected: (authorSelected: string) => void;

  //   setSearchText: (searchText: BookQuery["searchText"]) => void;
  //   setGenresSelected: (genresSelected: BookQuery["genresSelected"]) => void;
  //   setAuthorSelected: (authorSelected: BookQuery["authorSelected"]) => void;
};

const useBookQueryStore = create<State & Action>((set) => ({
  searchText: "",
  genresSelected: [],
  authorSelected: "",
  setSearchText: (searchText) => set(() => ({ searchText: searchText })),
  setGenresSelected: (genresSelected) =>
    set(() => ({ genresSelected: genresSelected })),
  setAuthorSelected: (authorSelected) =>
    set(() => ({ authorSelected: authorSelected })),

  //   bookQuery: {},
  //   setSearchText: (searchText) => set(() => ({ bookQuery: { searchText } })),
  //   setGenresSelected: (genresSelected) =>
  //     set(() => ({ bookQuery: { genresSelected } })),
  //   setAuthorSelected: (authorSelected) =>
  //     set(() => ({ bookQuery: { authorSelected } })),
}));

export default useBookQueryStore;
