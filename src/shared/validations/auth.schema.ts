import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").max(255).required("Email is required"),
  password: yup.string().max(255).required("Password is required"),
});

export const signupSchema = yup.object({
  email: yup.string().email("Invalid email").max(255).required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").max(255).required("Password is required"),
  firstName: yup.string().max(100).required("First name is required"),
  lastName: yup.string().max(100).required("Last name is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Invalid email").max(255).required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
