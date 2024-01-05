const createSuccessResponse = (user, token) => ({
  user: {
    email: user.email,
    password: user.password,
    token: token,
  },
});

const handleLoginErrors = (err) => {
  console.log(err.message, err.code);
  const errors = { email: "", password: "" };

  switch (err.message) {
    case "incorrect email":
    case "incorrect password":
      errors.statusCode = 401;
      errors.email = "Email or password is wrong!";
      break;
    default:
      errors.statusCode = 400;
      errors.email =
        err.code === 11000 ? "This email is already on the database" : "";

      if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
      }
      break;
  }

  return errors;
};

module.exports = {
  createSuccessResponse,
  handleLoginErrors,
};
