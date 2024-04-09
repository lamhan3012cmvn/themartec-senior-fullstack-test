import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { ENDPOINTS } from '~/constants/endpoints.constant';
import { axiosCore } from '~/core';
import { useReactQuery } from '~/hooks';

const useLinkedInAuthenticated = () => {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	const { isLoading, data } = useReactQuery({
		queryKey: ['get-linkedIn-callback'],
		queryFn: async () => {
			const response = await axiosCore.get(
				`${ENDPOINTS.LINKEDIN_CALLBACK}?${searchParams.toString()}`
			);
			if (response?.error) {
				message.error({
					className: 'messagePosition',
					content: response.message || 'Can not get list category'
				});

				return [];
			}

			queryClient.invalidateQueries({
				queryKey: ['check-linkedin-auth']
			});

			setTimeout(() => {
				window.location.href = '/';
			}, 1000);
			return response.data;
		}
	});

	return {
		isLoading,
		data
	};
};

export default useLinkedInAuthenticated;
