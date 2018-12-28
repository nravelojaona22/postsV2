
export class Post{
    createDate : string;
    like : number;
    dislike : number;
    photo : string;
    constructor(private title, private content){
        this.like = 0;
        this.dislike = 0;
    }
}