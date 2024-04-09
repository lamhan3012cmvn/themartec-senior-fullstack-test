import { DashboardLayout } from '~/components/layout';
import { ROUTES } from '~/constants/routes.constant';
import { ArticleList, LinkedInAuthenticated } from '~/screens';

export const PRIVATE_ROUTES = [
	{
		path: '/',
		layout: DashboardLayout,
		element: ArticleList,
	},
	{
		path: ROUTES.ARTICLE_LIST,
		layout: DashboardLayout,
		element: ArticleList,
	},
	{
		path: ROUTES.LINKED_IN_AUTHENTICATED,
		layout: DashboardLayout,
		element: LinkedInAuthenticated
	}
];