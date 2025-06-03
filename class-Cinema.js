let previouslyId = []

function generateId(){
    let data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);

    while(previouslyId.includes(data)){
        data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);
    }

    previouslyId.push(data)
    return data;
}


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

class Movie{
    constructor(title, duration){
        this.id = generateId()
        this.title = title;
        this.duration = duration;
        this.showings = []; // {time, roomName}
        this.seatingCharts = new Map() // Key: `${roomName}_${time}`, Value: { layout: [], reserved: Map(seat => customer) }
        this.cinema = undefined;
        
    }


    addShowtime(roomName, time){ // room1, 18h00
        const key = `${roomName}_${time}`;
        const layout = this.cinema.getRoomLayout(roomName) 
        if(this.seatingCharts.has(key)){
            console.log(`This showtime ${time} is already available`)
            return
        }

        this.showings.push({roomName, time})
        this.seatingCharts.set(key, {
            layout: [...layout], // copy of seat layout (e.g., ['A1', 'A2'...])
            reserved: new Map()  // seatId => Customer
        })

        console.log(`Added showtime for ${this.title} in ${roomName} at ${time}`);
    }

    removeShowTime(roomName, time){ // room1, 18h00
        const key = `${roomName}_${time}`;
        if(!this.seatingCharts.has(key)){
            console.log(`This showtime ${time} isn't available`)
            return
        }
        const index = this.showings.findIndex(show => show.roomName === roomName && show.time === time)

        if (index === -1) {
        console.warn(`Showtime not found in the showings array, but exists in seatingCharts. Check data integrity.`);
}
        if(index > -1){
            this.showings.splice(index, 1)
        }
        
        this.seatingCharts.delete(key)
        console.log(`Removed showtime for ${this.title} in ${roomName} at ${time}`);
    }

     reserveSeat(customer, roomName, time, seatId){ // customer / room1 / 18h00 / A1
        const key = `${roomName}_${time}`;

        if(!this.seatingCharts.has(key)){
            console.log(`No showtime at ${time} and in this ${roomName}`)
            return false;
        }

        const chart = this.seatingCharts.get(key)

        if(!chart.layout.includes(seatId)){
            console.log(`No seat ${seatId} for this showtime ${time} and ${roomName}`)
            return false;
        }

        if(chart.reserved.has(seatId)){
            console.log(`This seat ${seatId} is already reserved for this showtime ${time} and ${roomName}`)
            return false;
        }

        chart.reserved.set(seatId, customer)
        console.log(`You have reserved this seat${seatId} for this showtime ${time} and this ${roomName}`)
        return true;

     }
    listShowTimes(){
        const listShowTimes = Array.from(this.showtimes.entries()).map(([time,info]) => ({
            ShowTimes: time
        }))

        console.log(`Times availables for this movie: ${this.title}`)
        console.log(listShowTimes)
    }

    reserveSeat(customer, time){

        if (!this.showtimes.includes(time)) {
            console.log(`This time: ${time} is not available for this movie: ${this.title}`);
            return false;
        }

        const info = this.showtimes.get(time);

        if(info.capacity === info.reservation.length){
            console.log(`This movie: ${this.title} is already all booked`);
            return false;
        }

        if (info.reservation.includes(customer.id)) {
            console.log(`${customer.name} has already reserved a seat.`);
            return false;
        }

        info.reservation.set(customer.id, { customer });
        
        console.log(`${customer.name} reserved a seat for "${this.title}" at ${time}`);
        return true;
    }

    cancelReservation(customer, time){
        if (!this.showtimes.includes(time)) {
            console.log(`This time: ${time} is not available for this movie: ${this.title}`);
            return false;
        }

        const info = this.showtimes.get(time);

        if (!info.reservation.includes(customer.id)) {
            console.log(`${customer.name} hasn't reserved a seat for this movie: ${this.title} and this time: ${time}.`);
            return false;
        }

        info.reservation.delete(customer.id)
        console.log(`${customer.name}'s reservation has been cancelled.`)
        return true;
        
    }

    listReservations(time){
        const info = this.showtimes.get(time);
        const reservationList = Array.from(info.reservation.entries()).map(([capacity, reservation])=> ({
                Name: reservation.customer.name,
                ID: reservation.customer.id
            }))
        
        console.log(`Reservations for ${this.title} and time ${time}`)
        console.table(reservationList)
        
    
    }
}

class Customer{
    constructor(name){
        this.id = generateId()
        this.name = name;
        this.reservations = new Map();
        this.cinema = undefined;
    }

    makeReservation(movie, time){
        if(!this.cinema.hasMovie(movie)){
            console.log(`Movie not found in this cinema.`)
            return 
        }

        if(movie.reserveSeat(this, time)){
             this.reservations.set(movie.id, { movie, time });
             console.table(this.getMyReservation())
        }
    }

    cancelReservation(movie, time){

        if(!this.cinema.hasMovie(movie)){
            console.log(`Movie not found in this cinema.`)
            return 
        }

        if(movie.cancelReservation(this, time)){
            this.reservations.delete(movie.id);
            console.table(this.getMyReservation())
        }
    }

    hasReservation(movie){
        if(this.reservations.has(movie.id)){
            return true;
        }
        return false;
    }

    listMyReservations(){
        const reservationList = Array.from(this.reservations.entries()).map(([id, info])=> ({
            Id: id,
            Name: info.movie.title,
            showtime: info.time
        }))
        console.log(`Reservations for ${this.name}`)
        console.table(reservationList)

    }

    getMyReservation(){
        return Array.from(this.reservations.entries()).map(([id, info])=> ({
            Id: id,
            Name: info.movie.title,
            showtime: info.time
        }))
    }
}

const cinoche = new Cinema("brigite")

cinoche.setRoom(1,5,8)
cinoche.setRoom(2,4,6)

console.log(cinoche.rooms)