module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "First Name is Required."],
      },
      lastName: String,
      username: {
        type: String,
        required: [true, "Username is Required."],
      },
      email: {
        type: String,
        required: [true, "Email is Required."],
      },
      phone: String,
      password: {
        type: String,
        required: [true, "Password is Required."],
      },
    },
    { timestamps: true }
  );

  const user = mongoose.model("users", userSchema);
  return user;
};
