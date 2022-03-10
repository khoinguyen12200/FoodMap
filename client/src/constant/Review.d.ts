interface Review{
    id: number;
    userId: number;
    title: string;
    text: string;
    user:User;
    votes: Vote[];
    comments: Comment[];
}

interface Vote{
    id:number;
    value: number;
    userId:number;
    reviewId:number;
    user:User;
    review:Review;
}

interface Comment{
    id:number;
    text:string;
    userId:number;
    reviewId:number;
    user:User;
    review:Review;
}
