const form = document.getElementById("myForm");
form.reset();
const cartList = document.createElement("ul");
let booksArr = [];
const modal = document.querySelector(".modal-body");
const alertSuccess = document.getElementById("liveAlertPlaceholder");
alertSuccess.classList.add("d-none");

const filterInput = () => {
  const input = document.getElementById("search-bar").value;
  if (input.length >= 3) {
      const filtered = booksArr.filter((book) => {
          const bookTitle = book.title.toLowerCase()
          console.log(bookTitle)
          return bookTitle.includes(input.toLowerCase());
    });
    console.log(filtered);
    renderBooks(filtered);
  }
};

const loadBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((resp) => resp.json())
    .then((books) => {
      booksArr = books;
      renderBooks(books);
    });
};

const renderBooks = (arr) => {
  const row = document.querySelector(".row");
  row.innerHTML = "";
  arr.forEach((book) => {
    const col = document.createElement("div");
    col.classList.add("col", "col-sm-3", "d-flex");
    col.innerHTML = `<div class="card">
                <img src="${book.img}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.category}</p>
                    <p class="card-text">$${book.price}</p>
                    <p class="card-text small">${book.asin}</p>
                    <div class="controls d-flex justify-content-between"><a href="#" onclick="addItemToCart(event)" class="addBtn btn btn-primary" 
                    >Add to Cart<i style="margin-left: 1rem;" class="bi bi-bag-plus"></i></a></div>
                    <button style="margin-top: 1rem" class="btn btn-secondary" onclick="removeBook(event)">Skip</button>
                </div>
            </div>`;
    row.appendChild(col);
  });
};

function totalCount(arr) {
    const allItems = document.querySelectorAll(".items");
    return arr.reduce(function (a, item) {
        return a + item.length
    }, 0)
}

function alert(message, type) {
  alertSuccess.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  alertSuccess.classList.remove("d-none");
  setTimeout(() => alertSuccess.classList.add("d-none"), 2000);
}

const deleteMe = (e) => {
    e.target.closest("div").remove()
}

const addItemToCart = (e) => {
  alert("Item Added Successfully!", "success");
  setTimeout(function () {
    alertSuccess.classList.toggle("d-none");
  }, 1600);
const mainCard = e.target.closest(".card");
  const selectedBook =
    e.target.closest(".card-body").firstElementChild.innerText;
  const controlDiv = e.target.closest(".controls");
  modal.innerHTML += `<div class="items d-flex justify-content-between"><p>${selectedBook}</p><i onclick="deleteMe(event)" class="bi bi-x-square"></i></div>`;
  const checkMark = document.createElement("div");
  checkMark.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="green"
        class="bi bi-check-square"
        viewBox="0 0 16 16"
      >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
      </svg>`;
    mainCard.classList.add("styled")
    controlDiv.appendChild(checkMark);
    
};

const removeBook = (e) => {
  const selectedCard = e.target.closest(".col");
  selectedCard.classList.add("d-none");
};

window.onload = () => {
  loadBooks();
};
