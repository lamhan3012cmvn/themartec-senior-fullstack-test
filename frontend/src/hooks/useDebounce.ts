import { debounce } from "lodash";

export const useDebounce = (cb: any, delay: number = 300) => {
  return debounce(cb, delay);
};
