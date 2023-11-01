interface CommentLike {
    userEmail: string; // para saber se um usuário já curtiu ou não o comentário
}

class MovieComment {
    private id: string;
    private content: string;
    private likes: number;
    private date: Date;
    private userEmail: string;
    private userName: string;
    private likedByCurrentUser: boolean;

    constructor(id: string, content: string, date: Date, userEmail: string ) { 
        this.id = id;
        this.content = content;
        this.date = date;
        this.userEmail = userEmail;
    }

    setId(id: string): void {
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    setContent(content: string): void {
        this.content = content;
    }
    
    getContent(): string {
        return this.content;
    }

    setLikedByCurrentUser(value: boolean): void {
        this.likedByCurrentUser = value;
    }

    getLikedByCurrentUser(): boolean {
        return this.likedByCurrentUser;
    }

    setLikes(likes: number): void {
        this.likes = likes;
    }
    
    getLikes(): number {
        return this.likes;
    }
    
    setDate(date: Date): void {
        this.date = date;
    }
    
    getDate(): Date {
        return this.date;
    }
    
    setUserEmail(userEmail: string): void {
        this.userEmail = userEmail;
    }
    
    getUserEmail(): string {
        return this.userEmail;
    }

    getUserName(): string {
        return this.userName;
    }

    setUserName(userName: string): void {
        this.userName = userName;
    }

    toObject() {
        return JSON.parse(JSON.stringify(this))
    }
}    

export { MovieComment }