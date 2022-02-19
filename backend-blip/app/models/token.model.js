module.exports = (mongoose) => {
  const tokenSchema = mongoose.Schema(
    {
      userId: {
        type: mongoose.ObjectId,
        unique: [true, "User Id Already Exists."],
        required: [true, "User Id is Required."],
      },
      tokens: [
        {
          token: {
            type: String,
            trim: true,
            required: [true, "Token is Required."],
          },
          creation: {
            type: Date,
            required: [true, "Creation Date Time is Required."],
          },
          auth: {
            type: String,
            required: [true, "Auth is Required."],
            enum: {
              values: [
                "User",
                "Partner",
                "Admin",
                "User-Reset-Password",
                "Partner-Reset-Password",
                "User-Verify-Email",
                "User-Verify-Phone",
              ],
            },
          },
        },
      ],
    },
    { timestamps: true }
  );

  const token = mongoose.model("tokens", tokenSchema);
  return token;
};
