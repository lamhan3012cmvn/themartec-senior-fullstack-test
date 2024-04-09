import { setToLocalStorage } from "~/helpers/common.helper";
import { useRouter } from "~/hooks";

const useUserLogged = () => {
  const { navigate } = useRouter();
  const handleLogout = () => {
    setToLocalStorage("token", "");
    navigate("/login");
  };
  return {
    handleLogout,
  };
};

export default useUserLogged;
