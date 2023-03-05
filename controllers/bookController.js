const Book = require('../models/book');
exports.createBook = async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      ISBN:req.body.ISBN
      
    });
    await book.save();
    res.status(201).send("Book saved successfully");
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};

exports.getAllBooks = async (req, res) => {
// Book.find((err,books)=>{
// if(!err){
//   res.json(books)
// }
//   })
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};

exports.getBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ISBN:req.params.isbn});
    if (!book) return res.status(404).send('Book not found');
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};

exports.getBookByAuthor = async (req, res) => {
  try {
    const book = await Book.findOne({author:req.params.author});
    if (!book) return res.status(404).send('Book not found');
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};
exports.getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({title:req.params.title});
    if (!book) return res.status(404).send('Book not found');
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};
exports.getBookReviewByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ISBN:req.params.isbn},{reviews:1});
    if (!book) return res.status(404).send('Book not found');
    res.status(200).send(book);
  } catch (error) {
    console.log(error)
    res.status(500).send("Unknown server error");
  }
};
exports.updateBookReviewByISBN = async (req, res) => {
  try {
    let updateReview
    let findBy
    const reviewExist=await Book.findOne({ISBN:req.params.isbn,
      "reviews.username":req.user.username})
      console.log(reviewExist,req.query.review)
      if(reviewExist){
      findBy={ISBN:req.params.isbn,"reviews.username":req.user.username}
      updateReview={$set:{"reviews.$.feedback":req.query.review}}
      }
    else{
      findBy={ISBN:req.params.isbn}
      updateReview={$push:{reviews:
      {feedback:req.query.review,
      username:req.user.username}}}
    }
    await Book.updateOne(findBy,updateReview)
    res.status(200).send(`The review for the book with ${req.params.isbn} ISBN has been added/updated`);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};
exports.deleteBookReviewByISBN = async (req, res) => {
  try {
    await Book.updateOne({ISBN:req.params.isbn},
    {$pull:{reviews:{username:req.user.username}}})
    res.status(200).send(`Review for the ISBN ${req.params.isbn} posted by user ${req.user.username} deleted`);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};
