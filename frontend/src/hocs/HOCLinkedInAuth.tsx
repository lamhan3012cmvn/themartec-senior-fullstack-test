import { message } from "antd";
import { ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import { useReactMutation, useReactQuery } from "~/hooks";

interface IProps {
  children: ReactNode;
}
export const HOCLinkedAuth = (props: IProps) => {
  // const { location } = useRouter();

  const linkedInMutation = useReactMutation({
    mutationFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.CHECK_AUTH_LINKEDIN);

      const { error, data } = response
      const { isAuthenticated, url } = data || {};
      console.log("response", response)
      console.log("log", !data, error, !url, data, error, url)

      if (!data || error || !url) {
        message.error({
          className: 'messagePosition',
          content: 'An error occurred while checking linkedIn'
        });

        return;
      }

      if (!isAuthenticated) {
        // window.open(url, '_blank');
        window.location.href = url;
      }
    }
  });

  const { data, isFetching } = useReactQuery({
    queryKey: ["check-linkedin-auth"],
    queryFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.IS_AUTH_LINKEDIN);
      if (!response || response?.error) {
        return false;
      }

      return response.data?.isAuthenticated || false;
    },
  });

  const isNeedLogin = !isFetching && !data

  if (isFetching) {
    return <></>
  }


  if (isNeedLogin) {
    return (
      <Button onClick={() => linkedInMutation.mutate({})}>
        Login to LinkedIn
      </Button>
    )
  }

  return props.children;
};
