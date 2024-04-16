import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return [loading, startLoading, stopLoading];
};

export default useLoading;