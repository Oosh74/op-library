let myLib = [];

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

  displayBook(newBook);
};

const displayBook = (newBook) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  const bookTitle = document.createElement('h3');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const hasRead = document.createElement('p');
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  const readStatusBtn = document.createElement('button');
  readStatusBtn.classList.add('read-status-btn');

  console.log(newBook);
  bookTitle.textContent = `${newBook.title}`;
  author.textContent = `${newBook.author}`;
  pages.textContent = `${newBook.pages}`;
  hasRead.textContent = `${newBook.didUserRead}`;
  bookCard.dataset.indexNumber = newBook.bookId;
  deleteBtn.textContent = 'Remove Book';
  readStatusBtn.textContent = 'Change Read Status';

  bookCard.append(bookTitle, author, pages, hasRead, deleteBtn, readStatusBtn);
  bookGrid.append(bookCard);
  console.log(bookCard.dataset.indexNumber);
  formModal.close();
};

const removeBookFromArr = (bookIdToRemove) => {
  let filteredLib = myLib.filter((book) => {
    console.log('book', book);
    console.log('book to remove', bookIdToRemove);
    console.log(book.bookId !== bookIdToRemove);
    return book.bookId !== bookIdToRemove;
  });
  myLib = filteredLib;

  console.log(filteredLib);
  return myLib;
};

const updateReadStatusArr = (targetBookId, readStatus) => {
  console.log(myLib, targetBookId, readStatus);
};

formModal.addEventListener('click', (event) => {
  if (event.target === formModal) {
    formModal.close();
  }
});

document.addEventListener('click', (event) => {
  if (event.target.className === 'delete-btn') {
    console.log(event.target.parentElement.dataset.indexNumber);
    event.target.parentElement.remove();
    removeBookFromArr(event.target.parentElement.dataset.indexNumber);
  } else if (
    event.target.className === 'read-status-btn' &&
    event.target.parentElement.children[0o3].textContent === 'Yes'
  ) {
    event.target.parentElement.children[0o3].textContent = 'No';
    updateReadStatusArr();
  } else if (
    event.target.className === 'read-status-btn' &&
    event.target.parentElement.children[0o3].textContent === 'No'
  ) {
    event.target.parentElement.children[0o3].textContent = 'Yes';
    updateReadStatusArr();
  }
});
