class MovieGenre {
    private id: number;
    private name: string;
    
    constructor(id: number, name: string) 
    {
        this.id = id;
        this.name = name;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}

export { MovieGenre}