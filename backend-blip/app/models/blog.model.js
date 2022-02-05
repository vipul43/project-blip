module.exports = (mongoose) => {
  const blogSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Blog Title is Required."],
      },
      content: {
        type: String,
        required: [true, "Blog Content is Required"],
      },
    },
    { timestamps: true }
  );

  const blog = mongoose.model("blogs", blogSchema);
  return blog;
};
