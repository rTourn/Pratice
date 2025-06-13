import { generateId } from './tool.mjs';

class Customer{
    constructor(name){
        this.id = generateId()
        this.name = name;
        this.reservedList = [];
        this.reservations = new Map(); // ${movie}_${time} { movie, time, seatId, roomName}
        this.cinema = undefined;
        this.point = 0;
    }
    earnPoinst(){
        this.point += 10 
    }

    removePoint(){
        const remove = 10;
        if(this.point === 0 ){
            return false
        }
        this.point = Math.max(0, this.point - remove);true
        return true
    }

    makeReservation(movie, roomName, time, seatId){
        if(!this.cinema.hasMovie(movie)){
            console.log(`Movie not found in this cinema.`)
            return false
        }
        const key = `${movie.id}_${time}_${roomName}_${seatId}`;
        const reserved = movie.reserveSeat(this, roomName, time, seatId);

        if(reserved){
            this.reservedList.push({ movie, roomName, time, seatId })
             this.reservations.set(key, { movie, time, seatId, roomName });
             this.earnPoinst()
             console.log(`You reserved a seat for this ${movie.title}, ${time}, ${seatId}`)
             return true
        }else{
            console.log(`Failed to reserved on the movie side.`);
             return false;
        }
    }

    cancelReservation(movie, roomName, time, seatId){

        if(!this.cinema.hasMovie(movie)){
            console.log(`Movie not found in this cinema.`)
            return false
        }

        const index = this.reservedList.findIndex(show => show.roomName === roomName && show.time === time && show.seatId === seatId && show.movie.id === movie.id)

        const key = `${movie.id}_${time}_${roomName}_${seatId}`
        const hasReservation = this.reservations.has(key)
        if(!hasReservation && index ===-1){
            console.log(`You didn't reserved this movie: ${movie.title} for this time ${time} and ${roomName}`)
            return false
        }
        
        const canceled =  movie.cancelSeat(this, roomName, time, seatId)

        if(canceled){
            this.reservations.delete(key);
            this.reservedList.splice(index, 1)
            this.removePoint()
            console.log(`You cancel you reservation for this ${movie.title}, ${time}, ${seatId} ${this.getMyReservation()}`)
            return true
        }else{
            console.log(`Failed to cancel reservation on the movie side.`);
             return false;
        }
    }

    hasReservation(movie){
        if(this.reservations.has(movie.id)){
            return true;
        }
        return false;
    }

    listMyReservations(){
        if(this.reservations.size ===0){
            return false;
        }
        const reservationList = Array.from(this.reservations.entries()).map(([id, info])=> ({
            Id: id,
            Name: info.movie.title,
            showtime: info.time
        }))
        console.log(`Reservations for ${this.name}`)
        console.table(reservationList)

    }

    getMyReservation(){
        if(this.reservations.size ===0){
            return false;
        }
        return Array.from(this.reservations.entries()).map(([id, info])=> ({
            MocieId: id,
            Name: info.movie.title,
            showtime: info.time,
            Seat : info.seatId,
            Room : info.roomName
        }))
    }

    rateMovie(movie, score){
        if (!movie || !movie.id) {
        console.error("Invalid movie object.");
        return false;
        }

        if(!this.reservations.has(movie.id)){
            console.log(`You can't rate a movie that you haven't seen`)
            return false;
        }

        if (typeof score !== "number" || score < 1 || score > 5) {
        console.log("Score must be a number between 1 and 5.");
        return false;
    }
        movie.rateMovie(score)
        console.log(`You rated ${movie.title} with a score of ${score}.`);
        return true;
    }

   toJSON() {
        return {
            id: this.id,
            name: this.name,
            point: this.point,
            reservedList: this.reservedList,
            reservations: Array.from(this.reservations.entries()).map(([key, val]) => ({
                key,
                movieId: val.movie.id,
                movieTitle: val.movie.title,
                time: val.time,
                seatId: val.seatId,
                roomName: val.roomName
            }))
        };
    }
    static fromJSON(json, cinema, moviesById) {
    const customer = new Customer(json.name);
    customer.id = json.id;
    customer.point = json.point;
    customer.cinema = cinema;
    customer.reservedList = json.reservedList;

    // Restore reservation map
    customer.reservations = new Map();
        for (const res of json.reservations) {
            const movie = moviesById[res.movieId];
            if (movie) {
                customer.reservations.set(res.key, {
                    movie,
                    time: res.time,
                    seatId: res.seatId,
                    roomName: res.roomName
                });
            }
        }

        return customer;
    }
}

export {Customer}