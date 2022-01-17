module.exports = (mongoose) => {
  const tokenSchema = mongoose.Schema(
    {
      userId: {
        type: mongoose.ObjectId,
        required: [true, "User Id is Required."],
      },
      tokens: [
        {
          token: {
            type: String,
            required: [true, "Token is Required."],
          },
          creation: {
            type: Date,
            required: [true, "Creation Date Time is Required."],
          },
        },
      ],
    },
    { timestamps: true }
  );

  const token = mongoose.model("tokens", tokenSchema);
  return token;
};
