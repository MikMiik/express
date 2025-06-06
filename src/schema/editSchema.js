const yup = require("yup");
const editSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("This field must be an email")
    .required("Please enter your email"),
  phone: yup
    .string()
    .matches(
      /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/,
      "Not a valid phone number",
    )
    .required("Please enter your phone number"),
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .test("password", "Password must meet all requirements", function (value) {
      const errors = [];

      if (!value) return true;

      if (value.length < 8) errors.push("at least 8 characters long");

      if (!/[0-9]/.test(value)) errors.push("a number");

      if (!/[a-z]/.test(value)) errors.push("a lowercase letter");

      if (!/[A-Z]/.test(value)) {
        errors.push("an uppercase letter");
      }

      if (!/[^\w]/.test(value)) errors.push("a special character");

      if (errors.length > 0) {
        return this.createError({
          message: `Password requires: ${errors.join(", ")}`,
        });
      }
      return true;
    }),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

export default editSchema;
