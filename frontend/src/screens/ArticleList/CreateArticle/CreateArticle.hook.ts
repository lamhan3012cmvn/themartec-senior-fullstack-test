import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useEffect } from 'react';
import { ENDPOINTS } from '~/constants/endpoints.constant';
import { axiosCore } from '~/core';
import { generateSlugByText } from '~/helpers/common.helper';
import { articleSchema } from '~/helpers/schemaValidation.helper';
import { useFormData, useReactMutation, useReactQuery } from '~/hooks';
import { ICreateArticle } from './CreateArticle.props';

const useCreateArticle = (props: ICreateArticle) => {
	const articleId = props.IdRowTarget || '';

	const queryClient = useQueryClient();

	const mutation = useReactMutation({
		mutationFn: async (body: any) => {
			let response = null;
			if (articleId) {
				response = await axiosCore.put(
					ENDPOINTS.ARTICLE + '/' + articleId,
					body,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				);
			} else {
				response = await axiosCore.post(ENDPOINTS.ARTICLE, body, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
			}
			if (!response.data || response.error) {
				message.error({
					className: 'messagePosition',
					content:
						response.message ||
						`Can not ${articleId ? 'update' : 'create'} the category`
				});

				return false;
			}

			message.success({
				className: 'messagePosition',
				content: `${articleId ? 'Update' : 'Create'} category success`
			});

			queryClient.invalidateQueries({
				queryKey: ['get-list-article']
			});

			if (props.onCloseModal) props.onCloseModal();
			return true;
		}
	});

	const { form, onSubmit } = useFormData({
		schema: articleSchema,
		handleSubmit: data => {
			mutation.mutate({
				title: data.title,
				content: data.content,
				files: data.files
			});
		}
	});

	const { data: articleDetails } = useReactQuery({
		queryKey: ['get-article', articleId],
		queryFn: async () => {
			if (!articleId) return null;
			const response = await axiosCore.get(ENDPOINTS.ARTICLE + '/' + articleId);
			console.log('response: ', response);

			if (response?.error) return null;

			return response?.data;
		}
	});

	const titleWatch = form.watch('title');

	useEffect(() => {
		const slugGenerate = generateSlugByText(titleWatch);
		form.setValue('slug', slugGenerate);
		form.clearErrors('slug');
	}, [form, titleWatch]);

	useEffect(() => {
		// form.setValue("title", articleDetails?.title ?? "");
		// form.setValue("slug", articleDetails?.slug ?? "");
		// form.setValue("description", articleDetails?.description ?? "");
		// form.setValue("parentCategory", articleDetails?.parentCategory ?? null);
	}, [articleDetails, form]);

	const isLoadingCreate = mutation.isPending;
	return {
		isLoadingCreate,
		form,
		onSubmit
	};
};

export default useCreateArticle;
