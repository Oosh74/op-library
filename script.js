const myLib = [];

const formSubmission = document.querySelector('form');
const bookGrid = document.querySelector('.book-grid');
const formModal = document.querySelector('dialog');
const addBook = document.querySelector('.add-book');
const closeForm = document.querySelector('.close-form');

addBook.addEventListener('click', () => {
  formModal.showModal();
});

closeForm.addEventListener('click', () => {
  formModal.close();
});

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

const addBookToLib = (title, author, page, didUserRead) => {
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

  displayBook();
};

const displayBook = () => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookTitle = document.createElement('h3');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const hasRead = document.createElement('p');

  for (let i = 0; i < myLib.length; i++) {
    console.log(myLib[i]);
    bookTitle.textContent = `${myLib[i].title}`;
    author.textContent = `${myLib[i].author}`;
    pages.textContent = `${myLib[i].pages}`;
    hasRead.textContent = `${myLib[i].didUserRead}`;
  }

  bookCard.append(bookTitle, author, pages, hasRead);
  bookGrid.append(bookCard);
  formModal.close();
};

formModal.addEventListener('click', (event) => {
  if (event.target === formModal) {
    formModal.close();
  }
});
