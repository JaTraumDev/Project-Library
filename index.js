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

class Book {
	constructor(name, author, read) {
		this.name = name;
		this.author = author;
		this.id = crypto.randomUUID();
		this.read = read;
	}
	displayInfo() {
		console.log(`Name: ${this.name}`);
		console.log(`Author: ${this.author}`);
		console.log(`Read?: ${this.read}`);
		console.log(`id: ${this.id}`);
	}
}

class Library {
	gallery = [];
	addBookToLibrary(name, author, read = false) {
		const bookObject = new Book(name, author, read);
		this.gallery.push(bookObject);
		showBook(bookObject, this);
	}
	removeBookFromLibrary(book) {
		this.gallery.splice(this.gallery.indexOf(book), 1);
	}
	updateBookColors() {
		this.gallery.forEach((book, index) => {
			const bookElement = document.getElementById(book.id);
			if (bookElement) {
				const nameElement = bookElement.querySelector("h3");
				nameElement.style.color = bookColors[index % bookColors.length];
			}
		});
	}
}

function showBook(bookObject, library) {
	const bookPlace = document.createElement("div");
	bookPlace.className = "book";
	bookPlace.setAttribute("id", `${bookObject.id}`);

	const paraName = document.createElement("h3");
	const paraAuthor = document.createElement("p");
	const readText = document.createElement("p");
	const readCheck = document.createElement("input");
	const removeButton = document.createElement("button");

	paraName.textContent = bookObject.name;
	paraName.style.color = bookColors[library.gallery.indexOf(bookObject) % bookColors.length];

	paraAuthor.textContent = bookObject.author;

	readCheck.type = "checkbox";
	if (bookObject.read === true) {
		readCheck.checked = true;
	}
	readCheck.addEventListener("click", () => {
		let checked = readCheck.checked;
		if (checked === true) {
			readCheck.checked = true;
			bookObject.read = true;
		} else {
			readCheck.checked = false;
			bookObject.read = false;
		}
		bookObject.displayInfo();
	});

	readText.textContent = "Read?";
	readText.className = "checkbox";
	readText.appendChild(readCheck);

	removeButton.addEventListener("click", () => {
		library.removeBookFromLibrary(bookObject);
		bookPlace.remove();
		library.updateBookColors();
	});

	removeButton.textContent = "Remove";

	bookPlace.appendChild(paraName);
	bookPlace.appendChild(paraAuthor);
	bookPlace.appendChild(readText);
	bookPlace.appendChild(removeButton);

	bookshelf.appendChild(bookPlace);
}

const library = new Library();

library.addBookToLibrary("Dynamite", "James Sunderland", false);
library.addBookToLibrary("I Have No Mouth, and I Must Scream", "Harlan Ellison", true);
library.addBookToLibrary("Fifty Shades of Grey", "E.L. James", false);

const newBookButton = document.querySelector("#add-new-book");
const newBookWindow = document.querySelector("#new-book-window");

newBookButton.addEventListener("click", () => {
	const bookName = document.getElementById("bookname");
	const bookAuthor = document.getElementById("bookauthor");
	if (bookName.value != "" && bookAuthor.value != "") {
		library.addBookToLibrary(bookName.value, bookAuthor.value);
		bookName.value = "";
		bookAuthor.value = "";
	}
});
