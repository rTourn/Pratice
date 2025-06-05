
let previouslyId = []

export function generateId(){
    let data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);

    while(previouslyId.includes(data)){
        data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);
    }

    previouslyId.push(data)
    return data;
}