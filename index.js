const myLibrary = [];

const bookshelf = document.getElementById("bookshelf");

function book(name, author) {
	this.name = name;
	this.author = author;
	this.id = crypto.randomUUID();
	this.displayInfo = function () {
		console.log(`Name: ${this.name}`);
		console.log(`Author: ${this.author}`);
		console.log(`id: ${this.id}`);
	};
}

function addBookToLibrary(name, author) {
	const bookObject = new book(name, author);
	myLibrary.push(bookObject);
	showBook(bookObject);
}

function showBook(bookObject) {
	const bookPlace = document.createElement("div");
	bookPlace.className = "book";

	const paraName = document.createElement("h3");
	const paraAuthor = document.createElement("p");
	const paraID = document.createElement("p");
	const removeButton = document.createElement("button");

	paraName.textContent = bookObject.name;

	paraAuthor.textContent = bookObject.author;

	paraID.textContent = bookObject.id;

	removeButton.textContent = "Remove";

	bookPlace.appendChild(paraName);
	bookPlace.appendChild(paraAuthor);
	bookPlace.appendChild(removeButton);

	bookshelf.appendChild(bookPlace);
}

addBookToLibrary("Dynamite", "James Sunderland");
addBookToLibrary("I Have No Mouth, and I Must Scream", "Harlan Ellison");
addBookToLibrary("Fifty Shades of Grey", "E.L. James");

const newBookButton = document.querySelector("#add-new-book");
const newBookWindow = document.querySelector("#new-book-window");

newBookButton.addEventListener("click", (evt) => {
	const bookName = document.getElementById("bookname");
	const bookAuthor = document.getElementById("bookauthor");
	if (bookName.value != "" && bookAuthor.value != "") {
		addBookToLibrary(bookName.value, bookAuthor.value);
		bookName.value = "";
		bookAuthor.value = "";
	}
});
