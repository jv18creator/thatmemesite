import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MemePostsContext = createContext({
  memes: [],
  isLoading: true,
  fetchMemes: undefined,
});

export const MemePostsProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    memes: [],
  });

  const fetchMemes = async () => {
    try {
      const response = await axios.get("/api/memes");
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        memes: response.data.memes,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return (
    <MemePostsContext.Provider
      value={{
        isLoading: state.isLoading,
        memes: state.memes,
        fetchMemes: fetchMemes,
      }}
    >
      {children}
    </MemePostsContext.Provider>
  );
};
