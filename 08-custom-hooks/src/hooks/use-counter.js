import { useState, useEffect } from "react";

const useCounter = (flag) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flag === "increment") setCounter((prevCounter) => prevCounter + 1);
      else setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [flag]);

  return counter;
};

export default useCounter;
