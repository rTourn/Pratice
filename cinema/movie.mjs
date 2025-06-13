import { generateId } from './tool.mjs';


class Movie{
    constructor(title, duration){
        this.id = generateId()
        this.title = title;
        this.duration = duration;
        this.showings = []; // {time, roomName}
        this.seatingCharts = new Map() // Key: `${roomName}_${time}`, Value: { layout: [], reserved: Map(seat => customer) }
        this.cinema = undefined;
        this.rating = [];
        
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

     cancelSeat(customer, roomName, time, seatId){ // customer / room1 / 18h00 / A1
        const key = `${roomName}_${time}`;

        if(!this.seatingCharts.has(key)){
            console.log(`You can't cancel your seat. Reason : No showtime at ${time} and in this ${roomName}`)
            return false;
        }

        const chart = this.seatingCharts.get(key)

        if(!chart.layout.includes(seatId)){
            console.log(`You can't cancel this seat: ${seatId}. Reason: This seat doesn't exist on this layout`)
            return false;
        }

        const chartId = chart.reserved.get(seatId);

        if(!chartId){
            console.log(`You can't cancel this seat. Reason: there is no reservation for this seat ${seatId}, for this showtime ${time} and ${roomName}`)
            return false;
        }

        if(chartId.customer.name !== customer.name){
            console.log(`You can't cancel this seat. Reason: This seat ${seatId} is already reserved by someone else`)
            return false;
        }

        chart.reserved.delete(seatId)
        console.log(`You have canceled this seat${seatId} for this showtime ${time} and this ${roomName}`)
        return true;
     }


    listShowTimes(roomName){
        const find = this.showings
            .filter(room => room.roomName === roomName)
            .map(showtime => showtime.time);

        if(find.length === 0){
            console.log(`No showtimes availables in ${roomName}`)
            return
        }

        console.log(`Showtimes in ${roomName}: ${find.join(", ")}`)
        
    }

    listRoom(){
        const find = this.showings.map(room => room.roomName)

        if(find.length === 0){
            console.log(`No room availables`)
            return
        }

        console.log(`Room available: ${find.join(", ")}`)
        
    }

    listRoomPerShowTime(time){
         const find = this.showings
            .filter(showtime => showtime.time === time)
            .map(room => room.roomName);

        if(find.length === 0){
            console.log(`No room availables for this showtime ${time}`)
            return
        }

        console.log(`For this showtime: ${time}: ${find.join(", ")}`)
    }

    listReservations(time, roomName){
        const key = `${roomName}_${time}`

        if(!this.seatingCharts.has(key)){
            console.log(`No showtime at ${time} and in this ${roomName}`)
            
            const findRoom = this.showings
            .filter(showtime => showtime.time === time)
            .map(room => room.roomName);

            const findTime = this.showings
            .filter(room => room.roomName === roomName)
            .map(showtime => showtime.time);

            if(findRoom.length > 0){
                console.log(`For this showtimes: ${time} you have this room available: ${findRoom}`)
            }
            if(findTime.length >0){
                console.log(`For this room: ${roomName} you have this showtimes available: ${findTime}`)
            }
            return
        }

        const chart = this.seatingCharts.get(key)
        
        const array = Array.from(chart.reserved.entries()).map(([key, customer])=> ({
            Seat : key,
            name : customer.name,
            id : customer.id
        }))

        if(array.length === 0){
            console.log(`No reservations for showtime ${time} in ${roomName}`);
            return;
        }

        console.log(`Reservation list for this showtime:${time} and ${roomName}`)
        console.table(array)

    }

    ratemovie(score){
        if(typeof score !== "number" || score < 0 || score > 5){
            console.log(`You score need to be between or equal to 5 and 0`)
        }

        this.rating.push(score)
        
    }

    getAverageRating(){
        if(this.rating.length === 0){
            console.log(`No rating yet`)
            return
        }

        const average = (this.rating.reduce((a,b)=> a +b, 0)) / this.rating.length
        console.log(`Average rating : ${average.toFixed(2)}`)
    }

    
}

export { Movie }
