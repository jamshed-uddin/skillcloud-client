import { useContext } from "react";
import { DataContext } from "../providers/DataProvider";

const useData = () => {
  const dataContext = useContext(DataContext);
  return dataContext;
};

export default useData;
