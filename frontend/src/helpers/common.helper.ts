import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_URL } from "~/constants/common.constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlugByText = (str: string) => {
  if (str && str.length > 0) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      // eslint-disable-next-line no-useless-escape
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(/\s+/g, "-");
  }
  return str;
};

export const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return "";

    return JSON.parse(data);
  } catch (error) {
    return "";
  }
};

export const setToLocalStorage = (key: string, data: any) => {
  if (!data) data = "";

  data = JSON.stringify(data);
  localStorage.setItem(key, data);
};

export const buildSelectSearchData = (
  arr: Array<any>,
  options: {
    labelField: string;
    valueField: string;
    isHaveResetOption?: boolean;
    excludeValue?: any;
  }
) => {
  if (!Array.isArray(arr)) return [];

  if (!arr.length) return [];
  if (options?.excludeValue) {
    arr = arr.filter((e) => e[options?.valueField] !== options?.excludeValue);
  }

  const result = arr.map((e) => ({
    label: e[options?.labelField] || "",
    value: e[options?.valueField] || "",
  }));

  if (options?.isHaveResetOption) {
    result.unshift({ label: "Select option", value: null });
  }

  return result;
};

export const getImage = (src?: string) => {
  if (!src) return "/assets/images/no-image.png";

  const assetsImages = ["/assets/images"];
  const publicImages = ["https://", "http://"];
  if ([...assetsImages, ...publicImages].includes(src)) return src;

  return BASE_URL + "/" + src;
};
