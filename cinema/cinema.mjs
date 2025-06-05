
class Cinema{
    constructor(name){
        this.name = name;
        this.movies = [];
        this.customers = []
        this.rooms = {}; // dynamic storage for room layouts
    }
    setRoom(roomNumber, numberOfRow, seatPerRow){
        
        if(this.rooms[`room${roomNumber}`]){
            console.log(`This room${roomNumber} is already set`)
            return
        }

        const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').splice(0,numberOfRow);
        const layout= [];

        for(let row of rows){

            for(let i = 0; i<= seatPerRow; i++){
                layout.push(`${row}${i}`);
            }
        }

        this.rooms[`room${roomNumber}`] = layout;
        console.log(`Room${roomNumber} configured with ${numberOfRow} rows and ${seatPerRow} seats per row.`)
             
    }

    modifyRoom(roomNumber, numberOfRow, seatPerRow){
        if(!this.rooms[`room${roomNumber}`]){
            console.log(`This room${roomNumber} does not exist. You need to use the function setRoom`)
        }

        delete this.rooms[`room${roomNumber}`]  // erase the previous setting

        this.setRoom(roomNumber, numberOfRow, seatPerRow)

    }

    listSeatPerRoom(roomNumber){
        const room = this.rooms[`room${roomNumber}`]

        if(!room){
            console.log(`This room${roomNumber} doesn't exist`)
            return
        }

        console.log(`Layout of room${roomNumber}`)
        console.log(room);
    }
    listRooms(){
        const roomKeys = Object.keys(this.rooms)

        if (roomKeys.length === 0) {
        console.log("No rooms available.");
        return;
    }
        console.log(`Rooms available`)
        roomKeys.forEach(room => {
            console.log(`- ${room}`)
        })
        return roomKeys;
    }

    getRoomLayout(roomName){
         const key = typeof roomName === "string" ? roomName : `room${roomName}`;
         return this.rooms[key] || null;
    }

    addMovie(movie){
        const index = this.movies.indexOf(movie);

        if(index === -1){
            this.movies.push(movie)
            movie.cinema = this;
            console.log(`You added this movie: ${movie.title} to the cinema : ${this.name}`)
        }else{
            console.log(`This movie: ${movie.title} is already in stock`)
        }
    }

    removeMovie(movie){
        const index = this.movies.indexOf(movie);

        if(index > -1){
            movie.cinema = undefined;
            this.movies.splice(index, 1)
            console.log(`You have removed this movie: ${movie.title} from the stock of this cinema : ${this.name}`)
        }else{
            console.log(`This movie: ${movie.title} isn't in stock of the cinema`)
        }
    }

    addCustomer(member){
        const index = this.customers.indexOf(member);

        if(index === -1){
            this.customers.push(member)
            this.member.cinema = this.name;
            console.log(`You added this member: ${member.name} to the cinema : ${this.name}`)
        }else{
            console.log(`This member: ${member.name} is already registered`)
        }
    }

    removeCustomer(member){
        const index = this.customers.indexOf(member);

        if(index > -1){
            this.member.cinema = undefined;
            this.customers.splice(index, 1)
            console.log(`You have removed this member: ${member.name} from this cinema : ${this.name}`)
        }else{
            console.log(`This member: ${member.name} isn't registerd in this cinema: ${this.name}`)
        }
    }

    listCustomer(){
        const customerList = this.customers.map(customer=> ({
                Name: customer.name,
                ID: customer.id,
                Reservations: customer.getMyReservation()
            }))
        console.log(`Registred Customer`)
        console.table(customerList)

    }

    listMovies(){
        const movieList = this.movies.map(movie=> ({
            Title: movie.title,
            Duration: movie.duration,
            ID: movie.id
        }))
        console.log(`Movies availables`)
        console.table(movieList)

    }


    findMovieByTitle(title){
        const result = this.movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));

        if(result.length > 0){
            console.log(result)
        }else{
            console.log(`This ${title} doesn't exist in this cinema`)
        }
    }

    findMovieByTime(time){
        return this.movies.filter(movie=> movie.showtime.includes(time))
    }

    showReservations(movie){
       movie.listReservations()
    }

    hasMovie(movie){
        const index = this.movies.indexOf(movie)

        if(index === -1){
            return false
        }
        return true;
    }
}

export { Cinema };