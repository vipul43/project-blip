module.exports = (mongoose) => {
  const blogSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Blog Title is Required."],
      },
      context: {
        type: String,
        required: [true, "Blog Context is Required."],
      },
      content: {
        type: String,
        required: [true, "Blog Content is Required."],
      },
      author: {
        type: String,
        required: [true, "Blog Author is Required."],
      },
      cover: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const blog = mongoose.model("blogs", blogSchema);
  return blog;
};
