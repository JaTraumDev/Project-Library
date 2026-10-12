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
	toggleChecked() {
		this.read = !this.read;
	}
}

class Library {
	gallery = [];
	addBookToLibrary(name, author, read = false) {
		const bookObject = new Book(name, author, read);
		this.gallery.push(bookObject);
		return bookObject;
	}
	removeBookFromLibrary(book) {
		const index = this.gallery.indexOf(book);

		if (index !== -1) {
			this.gallery.splice(index, 1);
		}
	}
}

function display(bookObject, library) {
	function updateBookColors() {
		library.gallery.forEach((book, index) => {
			const bookElement = document.getElementById(book.id);
			if (bookElement) {
				const nameElement = bookElement.querySelector("h3");
				nameElement.style.color = bookColors[index % bookColors.length];
			}
		});
	}
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
	readCheck.checked = bookObject.read;

	readCheck.addEventListener("click", () => {
		bookObject.toggleChecked();
		bookObject.displayInfo();
	});

	readText.textContent = "Read?";
	readText.className = "checkbox";
	readText.appendChild(readCheck);

	removeButton.addEventListener("click", () => {
		library.removeBookFromLibrary(bookObject);
		bookPlace.remove();
		updateBookColors();
	});

	removeButton.textContent = "Remove";

	bookPlace.appendChild(paraName);
	bookPlace.appendChild(paraAuthor);
	bookPlace.appendChild(readText);
	bookPlace.appendChild(removeButton);

	bookshelf.appendChild(bookPlace);
}

const library = new Library();

display(library.addBookToLibrary("Dynamite", "James Sunderland", false), library);
display(library.addBookToLibrary("I Have No Mouth, and I Must Scream", "Harlan Ellison", true), library);
display(library.addBookToLibrary("Fifty Shades of Grey", "E.L. James", false), library);

const newBookButton = document.querySelector("#add-new-book");
const newBookWindow = document.querySelector("#new-book-window");

newBookButton.addEventListener("click", () => {
	const bookName = document.getElementById("bookname");
	const bookAuthor = document.getElementById("bookauthor");
	if (bookName.value != "" && bookAuthor.value != "") {
		display(library.addBookToLibrary(bookName.value, bookAuthor.value), library);
		bookName.value = "";
		bookAuthor.value = "";
	}
});
