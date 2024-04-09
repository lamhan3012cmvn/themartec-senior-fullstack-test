import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "~/constants/routes.constant";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "~/helpers/common.helper";

interface IProps {
  children: ReactNode;
}
export const HOCAuth = (props: IProps) => {
  const token = getFromLocalStorage("token");

  const isNeedLogin = !token

  if (isNeedLogin) {
    setToLocalStorage("token", "");
    return <Navigate to={ROUTES.LOGIN} />;
  }
  
  return props.children;
};
