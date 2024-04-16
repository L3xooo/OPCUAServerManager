import { useState } from "react";

const useToggle = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const toggle = (event,key) => {
    setState(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return [state, toggle];
};

export default useToggle;
