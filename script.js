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
});

class Book {
  constructor(title, author, pages, didUserRead, bookId) {
    (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.didUserRead = didUserRead),
      (this.bookId = bookId);
  }
  updateReadStatus(readStatus) {
    return (this.didUserRead = readStatus);
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

  myLib.push(newBook);

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

  bookTitle.textContent = `Title: ${newBook.title}`;
  author.textContent = `Author: ${newBook.author}`;
  pages.textContent = `Pages: ${newBook.pages}`;
  hasRead.textContent = `Read Status: ${newBook.didUserRead}`;
  bookCard.dataset.indexNumber = newBook.bookId;
  deleteBtn.textContent = 'Remove Book';
  readStatusBtn.textContent = 'Change Read Status';

  bookCard.append(bookTitle, author, pages, hasRead, deleteBtn, readStatusBtn);
  bookGrid.append(bookCard);

  formModal.close();
};

const removeBookFromArr = (bookIdToRemove) => {
  let filteredLib = myLib.filter((book) => {
    return book.bookId !== bookIdToRemove;
  });
  myLib = filteredLib;

  return myLib;
};

const updateReadStatusArr = (targetBookId, readStatus) => {
  for (let i = 0; i < myLib.length; i++) {
    if (myLib[i].bookId === targetBookId) {
      myLib[i].updateReadStatus(readStatus);
      return;
    }
  }
};

formModal.addEventListener('click', (event) => {
  if (event.target === formModal) {
    formModal.close();
  }
});

document.addEventListener('click', (event) => {
  if (event.target.className === 'delete-btn') {
    event.target.parentElement.remove();
    removeBookFromArr(event.target.parentElement.dataset.indexNumber);
  } else if (
    event.target.className === 'read-status-btn' &&
    event.target.parentElement.children[0o3].textContent === 'Yes'
  ) {
    event.target.parentElement.children[0o3].textContent = 'No';
    updateReadStatusArr(
      event.target.parentElement.dataset.indexNumber,
      event.target.parentElement.children[0o3].textContent
    );
  } else if (
    event.target.className === 'read-status-btn' &&
    event.target.parentElement.children[0o3].textContent === 'No'
  ) {
    event.target.parentElement.children[0o3].textContent = 'Yes';
    updateReadStatusArr(
      event.target.parentElement.dataset.indexNumber,
      event.target.parentElement.children[0o3].textContent
    );
  }
});
