import { useEffect } from "react";

/**
 * 組建加載時運行
 * @param fn
 */
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
