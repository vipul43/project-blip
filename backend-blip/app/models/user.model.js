module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      name: String,
      password: String,
    },
    { timestamps: true }
  );
  // userSchema.method("toJSON", function () {
  //     const { __v, _id, ...object } = this.toObject();
  //     object.id = _id;
  //     return object;
  // });

  const user = mongoose.model("users", userSchema);
  return user;
};
