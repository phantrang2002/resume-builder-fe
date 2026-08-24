import * as yup from "yup";

/** local@domain.tld — requires a real TLD (rejects `a@b`, `user@domain`). */
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const emailField = yup
  .string()
  .trim()
  .required("Please enter your email.")
  .max(255, "Email is too long — please use a shorter one.")
  .matches(EMAIL_REGEX, {
    message: "Please enter a valid email.",
    excludeEmptyString: true,
  });

export const loginSchema = yup.object({
  email: emailField,
  password: yup
    .string()
    .max(255, "Password is too long — please shorten it.")
    .required("Please enter your password."),
});

export const signupSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .max(100, "First name is too long — please shorten it.")
    .required("Please enter your first name."),
  lastName: yup
    .string()
    .trim()
    .max(100, "Last name is too long — please shorten it.")
    .required("Please enter your last name."),
  email: emailField,
  password: yup
    .string()
    .min(10, "Use at least 10 characters for your password.")
    .max(255, "Password is too long — please shorten it.")
    .required("Please enter your password."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Your passwords don't match."),
});

export const forgotPasswordSchema = yup.object({
  email: emailField,
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Use at least 8 characters for your password.")
    .required("Please enter your new password."),
  confirmPassword: yup
    .string()
    .required("Please confirm your new password.")
    .oneOf([yup.ref("password")], "Your passwords don't match."),
});
