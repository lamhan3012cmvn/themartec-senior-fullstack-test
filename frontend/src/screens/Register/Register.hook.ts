import { useEffect } from "react";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "~/helpers/common.helper";
import { loginSchema, registerSchema } from "~/helpers/schemaValidation.helper";
import { useFormData, useReactMutation, useRouter } from "~/hooks";
import { message } from "antd";

const useLogin = () => {
  const { navigate } = useRouter();

  const mutation = useReactMutation({
    mutationFn: async (body: any) => {
      const response = await axiosCore.post(ENDPOINTS.REGISTER, body);
      if (response?.error) {
        message.error({
          className: "messagePosition",
          content: response?.message,
        });

        return;
      }

      setToLocalStorage("token", response?.data.token);
      message.success({
        className: "messagePosition",
        // content: `Welcome back, ${response?.data?.fullname} !`,
        content: `Welcome back !`,
      });
      navigate("/");
    },
  });

  const { form, onSubmit } = useFormData({
    schema: registerSchema,
    handleSubmit: (data) => {
      console.log("data: ", data)
      mutation.mutate({
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    },
  });

  useEffect(() => {
    const token = getFromLocalStorage("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const isLoading = mutation.isPending;
  return {
    form,
    isLoading,
    onSubmit,
  };
};

export default useLogin;
