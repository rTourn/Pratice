
class Book{

    static nextId = 1;

    constructor(name, author){
        this.id = Book.nextId++;
        this.name = name;
        this.author = author;
        this.available = true;
        this.library = undefined;
        this.borrowDate = new Map();
        this.returnDate = new Map();
    }

    libraryName(library){
        this.library = library;
    }

    displayInfo(){
        console.log( `Title: ${this.name}, Author: ${this.author}, ID: ${this.id}`)
    }

    borrow(member){
        if(!this.available) return false;

        this.available = false;
        this.borrowDate.set(member.id, { member, date: new Date() });
        
        return true
        
    }

    returnBook(member){
        this.available = true;
        this.returnDate.set(member.id, { member, date: new Date() });
        
    }


    displayBorrowHistory(){
        console.log(`Borrow dates`);
        for(let [id, reccord] of this.borrowDate.entries()){
            console.log(`Member ID: ${id} date: ${reccord.date}`)
        }

        console.log(`Return dates`);
        for(let [id, reccord] of this.returnDate.entries()){
            console.log(`Member ID: ${id} date: ${reccord.date}`)
        }
    }

}

class Member{
    static nextId = 1;

    constructor(name){
        this.id = Member.nextId++;
        this.name = name;
        this.creationCompte = new Date().toLocaleDateString()
        this.borrowedBook = new Map();
    }

    borrowBook(book){
        if(book.borrow(this)){
            this.borrowedBook.set(book, 
                {borrowed: true, 
                dataBorrowed: new Date().toLocaleDateString(), 
                dataReturn: null})

            console.log(`You have succefuly borrowed this book: ${book.name} on ${new Date().toLocaleDateString()}`)
        }else{
            console.log(`This book: ${book.name} is already borrowed`)
        }
    }

    returnBook(book){
         let borrowInfo = this.borrowedBook.get(book);

        if(borrowInfo && borrowInfo.borrowed){
            borrowInfo.dataReturn = new Date().toLocaleDateString();
            borrowInfo.borrowed = false;
            book.returnBook(this);
            console.log(`YYou have successfully returned the book ${book.name} on ${new Date().toLocaleDateString()}`)
        }else{
            console.log(`You don't have this book ${book.name} in you possesion`)
        }
    }

    bookBorrowed(){
            return Array.from(this.borrowedBook.entries()).filter(([key, info])=> info.borrowed).map(([book, info])=> ({
                Title: book.name,
                borrowedOn: info.dataBorrowed
            }))
    }

}

class Library{
    constructor(name){
        this.name = name;
        this.books =[];
        this.members = [];
        
    }

    addBook(book){ 
        book.libraryName(this.name)

        let index = this.books.indexOf(book)
        if(index === -1){
            this.books.push(book)
            console.log(`You have added this book: ${book.name}to the library`)
            console.table(this.books)
        }else{
            console.log(`This book is already in the library`)
        }
    }

    removeBook(book){
        let index = this.books.indexOf(book)
        if(index > -1){
            this.books.splice(index, 1)
            console.log(`You have remove this book: ${book.name} from the library`)
            console.table(this.books)
        }else{
            console.log(`This book isn't  in the library`)
        }
    }

    addMember(member){
         let index = this.members.indexOf(member)
        if(index === -1){
            this.members.push(member)
            console.log(`You have added this member: ${member.name} to the library`)
            console.table(this.members)
        }else{
            console.log(`This member is already registered in the Library`)
        }
    }

    removeMember(member){
         let index = this.members.indexOf(member)
        if(index > -1){
            this.members.splice(index, 1)
            console.log(`You have remove this member: ${member.name} from the library`)
            console.table(this.members)
        }else{
            console.log(`This member isn't registered in the Library`)
        }
    }

    findBookByTitle(title){
       const foundBook = this.books.find(book => 
        book.name.toLowerCase().includes(title.toLowerCase()))
    

        if (foundBook) {
            console.log("Livre trouvé :", foundBook.name);
        } else {
            console.log("Aucun livre trouvé.");
    }
    }

    listAllBooks(){
        console.table(this.books)
    }

    listAllBorrowedBooks() {
        const borrowedBooks = this.books.filter(book => !book.available);
        console.table(borrowedBooks.map(book => ({
            title: book.name,
            author: book.author,
            id: book.id
        })));
    }

    listBorrowedBooksByMember(memberId){
        let member = this.members.find(m => m.id === memberId);
        if (member) {
        console.table(member.bookBorrowed());
        } else {
        console.log("Member not found");
        }
            }
}

// Create a new library
const myLibrary = new Library("City Library");

// Create some books
const book1 = new Book("1984", "George Orwell");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee");

// Add books to the library
myLibrary.addBook(book1);
myLibrary.addBook(book2);

// Create some members
const member1 = new Member("Alice");
const member2 = new Member("Bob");

// Register members in the library
myLibrary.addMember(member1);
myLibrary.addMember(member2);

// Member borrows a book
member1.borrowBook(book1);  // Should succeed
member2.borrowBook(book1);  // Should fail, already borrowed

// List all books
myLibrary.listAllBooks();

// List all borrowed books
myLibrary.listAllBorrowedBooks();

// Show books borrowed by a member
myLibrary.listBorrowedBooksByMember(member1.id);

// Member returns a book
member1.returnBook(book1);

// Try borrowing again after return
member2.borrowBook(book1);  // Should succeed now

// Display borrow history for a book
book1.displayBorrowHistory();

// Find a book by title
myLibrary.findBookByTitle("1984");
myLibrary.findBookByTitle("Unknown Book");

