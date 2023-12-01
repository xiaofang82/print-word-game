'use strict';

class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage){
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }
    
    get date(){ return this.#date;}
    get hits(){ return this.#hits;}
    get percentage(){ return this.#percentage;}

    getScore(){
        return {
            date: this.date,
            hits: this.hits,
            percentage: this.percentage,
        };
    }
}

export {Score};