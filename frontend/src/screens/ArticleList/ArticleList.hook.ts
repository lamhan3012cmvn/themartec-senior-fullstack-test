import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback, useState } from "react";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import { useReactMutation, useReactQuery } from "~/hooks";

const useArticleList = () => {
  const queryClient = useQueryClient();
  const [rowTarget, setRowTarget] = useState("");
  const [isOpenCreate, setOpenCreate] = useState(false);

  const { isLoading, data } = useReactQuery({
    queryKey: ["get-list-article"],
    queryFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.ARTICLE_LIST);
      console.log("response: ", response);
      if (response?.error) {
        message.error({
          className: "messagePosition",
          content: response.message || "Can not get list article",
        });

        return [];
      }
      return response.data;
    },
  });

  const mutation = useReactMutation({
    mutationFn: async (articleId) => {
      const response = await axiosCore.delete(
        ENDPOINTS.ARTICLE + "/" + articleId
      );

      if (response?.error) {
        message.error({
          className: "messagePosition",
          content: response.message || "Error delete article",
        });

        return;
      }

      message.success({
        className: "messagePosition",
        content: "Delete success",
      });
      queryClient.invalidateQueries({ queryKey: ["get-list-article"] });
    },
  });

  const handleToggleCreate = useCallback(() => {
    setOpenCreate(!isOpenCreate);
  }, [isOpenCreate]);

  const handleEditRow = (data: any) => {
    setRowTarget(data._id);
    handleToggleCreate();
  };

  const handleDeleteRow = (data: any) => {
    mutation.mutate(data._id);
  };

  return {
    rowTarget,
    isOpenCreate,
    isLoading,
    data,
    handleToggleCreate,
    handleEditRow,
    handleDeleteRow,
  };
};

export default useArticleList;
