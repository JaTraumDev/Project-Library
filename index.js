const myLibrary = [];

const bookColors = [
	"#dc8a78",
	"#dd7878",
	"#ea76cb",
	"#8839ef",
	"#d20f39",
	"#e64553",
	"#fe640b",
	"#df8e1d",
	"#40a02b",
	"#179299",
	"#04a5e5",
	"#209fb5",
	"#1e66f5",
	"#7287fd",
];

const darkBookColors = [
	"#f5e0dc",
	"#f2cdcd",
	"#f5c2e7",
	"#cba6f7",
	"#f38ba8",
	"#eba0ac",
	"#fab387",
	"#f9e2af",
	"#a6e3a1",
	"#94e2d5",
	"#89dceb",
	"#74c7ec",
	"#89b4fa",
	"#b4befe",
];

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
	showBook(bookObject, myLibrary.indexOf(bookObject));
}

function showBook(bookObject) {
	const bookPlace = document.createElement("div");
	bookPlace.className = "book";
	bookPlace.setAttribute("id", `${bookObject.id}`);

	const paraName = document.createElement("h3");
	const paraAuthor = document.createElement("p");
	const removeButton = document.createElement("button");

	paraName.textContent = bookObject.name;
	paraName.style.color = darkBookColors[myLibrary.indexOf(bookObject) % darkBookColors.length];

	paraAuthor.textContent = bookObject.author;

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
