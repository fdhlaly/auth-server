import * as yup from "yup";

export const userRegistrationSchema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Password must contain at least 1 number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least 1 special character (@$!%*?&)",
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const userLoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
