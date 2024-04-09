import { Link } from "react-router-dom";
import { ROUTES } from "~/constants/routes.constant";
import { RiArticleLine } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";

const listMenu = [
  {
    label: "Article",
    key: "article",
    icon: <RiArticleLine size={18} />,
    children: [
      {
        label: <Link to={ROUTES.ARTICLE_LIST}>Article list</Link>,
        key: "article-1",
        icon: <CiViewList size={18} />,
      },
      {
        label: <Link to={ROUTES.LINKED_IN_AUTHENTICATED}>LinkedIn Authenticated</Link>,
        key: "linked-1",
        icon: <CiViewList size={18} />,
      }
    ],
  },
];
const useDashboardLayout = () => {
  return {
    listMenu,
  };
};

export default useDashboardLayout;
