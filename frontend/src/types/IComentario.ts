export interface IComentario  {
    id : string, 
    content : string, 
    likes : number,
    date : Date, 
    userEmail : string,
    userName : string,
    likedByCurrentUser: boolean
}