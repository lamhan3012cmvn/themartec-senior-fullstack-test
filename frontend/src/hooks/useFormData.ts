import { UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

interface IProps {
  defaultValues?: any;
  schema: ObjectSchema<{
    [x: string]: any;
  }>;
  handleSubmit: (data: any, form?: UseFormReturn<any>) => void;
}
export const useFormData = (props: IProps) => {
  const { defaultValues = {}, schema } = props || {};

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data: any) => {
    props.handleSubmit(data, form);
  });

  return {
    form,
    onSubmit,
  };
};
