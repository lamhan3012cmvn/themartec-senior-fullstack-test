import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

interface IReactQueryHook<T> {
  queryKey: string[];
  queryFn: QueryFunction<T>;
}
export const useReactQuery = <T>({ queryKey, queryFn }: IReactQueryHook<T>) => {
  return useQuery({
    queryKey,
    queryFn,
  });
};

interface IReactMutationHook<T> {
  mutationKey?: string[];
  mutationFn: MutationFunction<T>;
}
export const useReactMutation = <T>({
  mutationKey,
  mutationFn,
}: IReactMutationHook<T>) => {
  return useMutation({
    mutationKey: mutationKey,
    mutationFn,
  });
};
