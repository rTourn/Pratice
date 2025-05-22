
class Book{
    constructor(id , name, author){
        this.id = id;
        this.name = name;
        this.author = author;
        this.available = true;
        this.library = undefined;
    }

    libraryName(library){
        this.library = library;
    }

    displayInfo(){
        console.log( `Title: ${this.name}, Author: ${this.author}, ID: ${this.id}`)
    }

    borrow(){
        if(!this.available){
            return false
        }else{
            this.available = false;
            return true
        }
    }

    returnBook(){
        this.available = true;
        
    }

    setIdBook(id){
        this.id = id;
    }

}

class Member{
    constructor(name){
        this.id = undefined;
        this.name = name;
        this.borrowedBook = [];
    }

    borrowBook(book){
        if(book.borrow()){
            this.borrowedBook.push(book)
            console.log(`You have succefuly borrowed this book: ${book.name}`)
        }else{
            console.log(`This book: ${book.name} is already borrowed`)
        }
    }

    returnBook(book){
        let index = this.borrowedBook.indexOf(book);

        if(index > -1){
            this.borrowedBook.splice(index, 1);
            book.returnBook();
            console.log(`You have succefuly return the book ${book.name}`)
        }else{
            console.log(`You don't have this book ${book.name} in you possesion`)
        }
    }

    bookBorrowed(){
        return this.borrowedBook
    }

    setIdMember(id){
        this.id = id;
    }
}

class Library{
    constructor(name){
        this.name = name;
        this.books =[];
        this.members = [];
        this.idMember = 0;
        this.idBook = 0;
    }

    addBook(book){ 
        book.libraryName(this.name)

        let index = this.books.indexOf(book)
        if(index === -1){
            this.idBook +=1;
            book.setIdBook(this.idBook);
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
            book.setIdBook(0);
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
            this.idMember +=1;
            member.setIdMember(this.idMember);
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
            member.setIdMember(0);
            this.members.splice(index, 1)
            console.log(`You have remove this member: ${member.name} from the library`)
            console.table(this.members)
        }else{
            console.log(`This member isn't registered in the Library`)
        }
    }

    findBookByTitle(title){
       const foundBook =  this.books.find(book =>
        book.name.toLowerCase().includes(title.toLowerCase())
    )

        if (foundBook) {
            console.log("Livre trouvé :", foundBook.name);
        } else {
            console.log("Aucun livre trouvé.");
    }
    }

    listAvailableBooks(){
        console.table(this.books)
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

const myLibrary = new Library("Central Library");

const book1 = new Book(undefined, "The Hobbit", "J.R.R. Tolkien");
const book2 = new Book(undefined, "1984", "George Orwell");
const book3 = new Book(undefined, "The Catcher in the Rye", "J.D. Salinger");

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);


const member1 = new Member("Alice");
const member2 = new Member("Bob");

myLibrary.addMember(member1);
myLibrary.addMember(member2);

member1.borrowBook(book1); // Should succeed
member2.borrowBook(book1); // Should fail (already borrowed)
member2.borrowBook(book2); // Should succeed

myLibrary.listBorrowedBooksByMember(member1.id); // Shows books borrowed by Alice
myLibrary.listBorrowedBooksByMember(member2.id); // Shows books borrowed by Bob

member1.returnBook(book1); // Should succeed
member2.returnBook(book3); // Should fail (he doesn't have it)

myLibrary.removeBook(book3);    // Removes book3 from library
myLibrary.removeMember(member2); // Removes Bob from library

myLibrary.findBookByTitle("hobbit"); // Should find "The Hobbit"
myLibrary.findBookByTitle("harry");  // Should say not found

myLibrary.listAvailableBooks();

book1.displayInfo(); // Shows book details
