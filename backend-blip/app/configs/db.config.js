module.exports = {
  url: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.8aa1g.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
};
