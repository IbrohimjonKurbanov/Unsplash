import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobalContext = () => {
  const conntext = useContext(GlobalContext);

  if (!conntext) {
    throw new Error("useGlobalContext must be in the GlobalContextProvider");
  }
  return conntext;
};
