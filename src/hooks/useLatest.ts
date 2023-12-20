import { useRef } from "react";

/**
 * 獲取最新value
 * @param value 
 * @returns 
 */

const useLatest = <T>(value: T) => {
    const ref = useRef(value);
    ref.current = value;
    return ref;
};

export default useLatest;
