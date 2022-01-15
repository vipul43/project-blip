module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "First Name is Required."],
        validate: {
          validator: (firstName) => {
            return !!firstName && firstName.length <= 20;
          },
          message: "Invalid First Name.",
        },
      },
      lastName: {
        type: String,
        validate: {
          validator: (lastName) => {
            if (!!lastName) {
              return lastName.length <= 20;
            } else {
              return true;
            }
          },
          message: "Invalid Last Name.",
        },
      },
      username: {
        type: String,
        required: [true, "Username is Required."],
        validate: {
          validator: (username) => {
            return !!username && username.length >= 5 && username.length <= 10;
          },
          message: "Invalid Username.",
        },
      },
      email: {
        type: String,
        required: [true, "Email is Required."],
        validate: {
          validator: (email) => {
            var re = new RegExp(
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            );
            return re.test(email);
          },
          message: "Invalid Email.",
        },
      },
      phone: {
        type: String,
        validate: {
          validator: (phone) => {
            if (phone) {
              var re = new RegExp(/^[0-9]{10}$/);
              return re.test(phone);
            } else {
              return true;
            }
          },
          message: "Invalid Phone Number.",
        },
      },
      password: {
        type: String,
        required: [true, "Password is Required."],
      },
      role: {
        type: String,
        required: [true, "User Role is Required."],
        enum: {
          values: ["User", "Partner"],
        },
      },
    },
    { timestamps: true }
  );

  const user = mongoose.model("users", userSchema);
  return user;
};
