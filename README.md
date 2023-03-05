## bookNodejsApi

The related file contains 3 models: Book, Author, and User, which are designed using the Mongoose package. The User model includes functionalities for user registration, user login, user listing, user listing by ID, adding books to a user by ID, and listing the books of a user. The User model is connected to the Book model. The Book model defines functionalities for creating new books, listing existing books, and deleting books. The Author model is connected to the Book model and defines functionalities for adding, deleting, and listing authors. Various packages are used in this project, including "bcrypt", "dotenv", "jsonwebtoken", "mongoose", "body-parser", and "express".