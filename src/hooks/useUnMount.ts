import { useEffect } from "react";
import useLatest from "./useLatest";

/**
 * 組建卸載時運行
 * @param fn
 */
const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  useEffect(() => () => fnRef.current(), []);
};

export default useUnmount;
