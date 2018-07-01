const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    id:     {type: Schema.Types.ObjectId},
    title:  { type: String, required: true },
    date:   String,
    url:    String,
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;