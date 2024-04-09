import {
  CMSDrawer,
  CMSTable,
  PageHeader
} from "~/components/common";
import { Button } from "~/components/ui/button";
import useArticleList from "./ArticleList.hook";
import CreateArticle from "./CreateArticle/CreateArticle.view";
import { HOCLinkedAuth } from "~/hocs";

const ArticleList = () => {
  const {
    rowTarget,
    data,
    isOpenCreate,
    handleToggleCreate,
  } = useArticleList();

  return (
    <div className="w-full">
      <PageHeader title="List article">
        <div className="w-full flex justify-end">
          <HOCLinkedAuth>
          <Button onClick={handleToggleCreate}>Create new</Button>
          </HOCLinkedAuth>
          
        </div>
      </PageHeader>
      <div className="w-full mt-4">
        <div className="w-full ">
          <CMSTable dataTableColumns={[
            {
              title: "No",
              dataIndex: "index",
              render: (_: number, __: number, index: number) => index + 1,
            },
            {
              title: "Title",
              dataIndex: "title",
            }
            ,
            {
              title: "Like count",
              dataIndex: "likeCount",
            }
            ,
            {
              title: "Comments count",
              dataIndex: "commentsCount",
            }

          ]} dataSource={data?.list ?? []} />
        </div>
      </div>
      <CMSDrawer
        visible={isOpenCreate}
        onClose={handleToggleCreate}
        width={800}
        title="Create a new article"
      >
        <CreateArticle
          IdRowTarget={rowTarget}
          onCloseModal={handleToggleCreate}
        />
      </CMSDrawer>
    </div>
  );
};

export default ArticleList;
