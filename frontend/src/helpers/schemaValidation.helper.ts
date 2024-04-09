import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const registerSchema = yup.object({
  username: yup.string().required("This field is required"),
  email: yup.string().required("This field is required").email("Invalid email"),
  password: yup.string().required("This field is required"),
  confirmPassword: yup.string()
  .required("This field is required")
  .test('passwords-match', 'Passwords must match', function(value) {
    return this.parent.password === value;
  }),
});


export const uploadMediaSchema = yup.object({
  files: yup
    .mixed()
    .test("required", "This field is required", function (value) {
      if (!value) return false;
      return true;
    }),
  name: yup.string().trim().required("This field is required"),
});

export const categorySchema = yup.object({
  title: yup.string().trim().required("This field is required"),
  slug: yup.string().trim().required("This field is required"),
  status: yup.number().required("Please select the status"),
  parentCategory: yup.string().trim().nullable(),
  description: yup.string().trim().nullable(),
  SEOTitle: yup.string().trim().nullable(),
  SEODescription: yup.string().trim().nullable(),
  SEOCanonical: yup.string().trim().nullable(),
  SEOkeyword: yup.string().trim().nullable(),
  SEOSchema: yup.string().trim().nullable(),
});

export const articleSchema = yup.object({
  title: yup.string().trim().required("This field is required"),
  files: yup
  .mixed()
  .test("required", "This field is required", function (value) {
    if (!value) return false;
    return true;
  }),
  content: yup.string().required("This field is required"),
});
