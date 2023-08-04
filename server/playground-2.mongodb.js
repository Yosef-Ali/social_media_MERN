// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("social_media");

// Create a new document in the collection.
db.getCollection("user").insertOne({
  _id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@example.com",
  password: "password123",
  picture_path: "/path/to/picture.jpg",
  friends: [
    {
      first_name: "Jane",
      last_name: "Doe",
      picture_path: "/path/to/picture.jpg",
    },
    {
      first_name: "Mary",
      last_name: "Smith",
      picture_path: "/path/to/picture.jpg",
    },
  ],
});
