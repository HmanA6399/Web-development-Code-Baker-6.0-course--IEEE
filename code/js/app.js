// select the form
var form = document.querySelector("#book-form");

// select the input and textarea fields
var title = document.querySelector(".book-title input");
var author = document.querySelector(".book-author input");
var desc = document.querySelector(".book-desc textarea");

// handle submit event to form
form.addEventListener("click", function(event) {
  // prevent the default action
  event.preventDefault();

  // validate the form
  var error = 0;
  var formfields = this.querySelectorAll("input, textarea");
  formfields.forEach(function(field) {
    var errorMsg = createElement(
      "p",
      "error-message",
      "Please fill this field"
    );

    if (
      field.hasAttribute("required") &&
      field.value == "" &&
      !field.classList.contains("invalid")
    ) {
      field.classList.add("invalid");
      field.parentElement.appendChild(errorMsg);

      error += 1;
    } else {
      // reset the field if it's valid
      field.classList.remove("invalid");
      if (field.nextElementSibling) {
        field.nextElementSibling.remove();
      }
    }
  });

  //   check if there's an error --> if so, just return, else --> continue and create the card
  if (error > 0) {
    return;
  }

  //   create object of book
  var book = {
    title: title.value,
    author: author.value,
    desc: desc.value
  };

  //   make array of objects --> it's value will come from localStorage
  var cards;
  if (localStorage.getItem("cards") == null) {
    cards = [];
  } else {
    cards = JSON.parse(localStorage.getItem("cards"));
  }

  //   add the book object to the array
  cards.push(book);
  //   store in localStorage
  localStorage.setItem("cards", JSON.stringify(cards));

  // create the card with the content of form data
  createbookCard(book);

  //   reset the form
  this.reset();
  //   or
  //   form.reset();
});

// show items on loading
window.addEventListener("DOMContentLoaded", function() {
  // check if the local storage is empty
  if (localStorage.getItem("cards") == null) {
    return;
  }

  // get the cards from storage in the form of array of objects
  var cards = JSON.parse(localStorage.getItem("cards"));

  //   iterate over the array of cards
  cards.forEach(function(element) {
    createbookCard(element);
  });
});

// remove from local Storage
document.querySelector(".book-cards").addEventListener("click", function(e) {
  if (
    e.target.classList.contains("card-remove") ||
    e.target.classList.contains("fa-trash-alt")
  ) {
    // get the items from localStorage and store it in array
    // filter this store from the clicked item
  }
});

// make the code DRY --> make a function to create a card with data provided
function createbookCard(data) {
  var card = createElement("article", "card");

  var removeButton = createElement(
    "button",
    "card-remove",
    '<i class="fa fa-trash-alt"></i>'
  );

  removeButton.addEventListener("click", function() {
    // remove from UI
    this.parentElement.remove();
  });

  //   append these elements into card
  card.appendChild(createElement("h2", "card-title", data.title));
  card.appendChild(createElement("p", "card-desc", data.desc));
  card.appendChild(createElement("p", "card-author", data.author));
  card.appendChild(removeButton);

  // append card into book cards
  document.querySelector(".book-cards").appendChild(card);
}

// create UI element
function createElement(el, className, content) {
  var element = document.createElement(el);

  element.className = className;

  if (content) {
    element.innerHTML = content;
  }

  return element;
}

document.querySelector(".book-cards").addEventListener("click", function(e) {
  if (
    e.target.classList.contains("card-remove") ||
    e.target.classList.contains("fa-trash-alt")
  ) {
    // get the cards from local storage
    var store = JSON.parse(localStorage.getItem("cards"));

    // iterate over the store with "forEach"
    store.forEach(function(el, i) {
      if (
        el.id === e.target.dataset.id ||
        el.id === e.target.parentElement.dataset.id
      ) {
        // splice that element
        return store.splice(i, 1);
      }
    });

    localStorage.setItem("cards", JSON.stringify(store));
  }
});
