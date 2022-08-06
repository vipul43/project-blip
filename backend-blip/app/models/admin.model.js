module.exports = (mongoose) => {
  const adminSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "First Name is Required."],
        validate: {
          validator: (firstName) => {
            return !!firstName && firstName.length <= 20;
          },
          message: "{VALUE} is not a valid First Name.",
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
          message: "{VALUE} is not a valid Last Name.",
        },
      },
      username: {
        type: String,
        unique: [true, "Username Already Exists."],
        lowercase: true,
        trim: true,
        required: [true, "Username is Required."],
        validate: {
          validator: (username) => {
            return !!username && username.length >= 5 && username.length <= 10;
          },
          message: "{VALUE} is not a valid Username.",
        },
      },
      email: {
        type: String,
        unique: [true, "Email Already Exists."],
        lowercase: true,
        trim: true,
        required: [true, "Email is Required."],
        validate: {
          validator: (email) => {
            var re = new RegExp(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            return re.test(email);
          },
          message: "{VALUE} is not a valid Email.",
        },
      },
      phone: {
        type: String,
        trim: true,
        validate: {
          validator: (phone) => {
            if (phone) {
              var re = new RegExp(/^[0-9]{10}$/);
              return re.test(phone);
            } else {
              return true;
            }
          },
          message: "{VALUE} is not a valid Phone Number.",
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

  const admin = mongoose.model("admins", adminSchema);
  return admin;
};
