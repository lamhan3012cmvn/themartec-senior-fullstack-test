import { AuthLayout } from "~/components/layout";
import { ROUTES } from "~/constants/routes.constant";
import { LoginScreen, RegisterScreen } from "~/screens";

export const PUBLIC_ROUTES = [
  {
    path: ROUTES.LOGIN,
    layout: AuthLayout,
    element: LoginScreen,
  },
  {
    path: ROUTES.REGISTER,
    layout: AuthLayout,
    element: RegisterScreen,
  },
];
