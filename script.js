const myLib = [];

const formSubmission = document.querySelector('form');

formSubmission.addEventListener('submit', (event) => {
  event.preventDefault();

  addBookToLib(
    event.target.title.value,
    event.target.author.value,
    event.target.pages.value,
    event.target.readBook.value
  );
  console.log('Book Data Sent');
});

class Book {
  constructor(title, author, pages, didUserRead, bookId) {
    (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.didUserRead = didUserRead),
      (this.bookId = bookId);
  }
}

function addBookToLib(title, author, page, didUserRead) {
  const newBook = new Book(
    title,
    author,
    page,
    didUserRead,
    crypto.randomUUID()
  );
  console.log('New Book Created');
  myLib.push(newBook);
  console.log('Book Pushed');
  console.log('Book array', myLib);
}
