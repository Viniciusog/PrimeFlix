class StandardError {
    private statusCode: number;
    private message: string;
    private date: Date;
    private path: string;

    constructor(statusCode: number, message: string, date: Date, path: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.date = date;
        this.path = path;
    }

    setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    setDate(date: Date): void {
        this.date = date;
    }

    getDate(): Date {
        return this.date;
    }

    setPath(path: string): void {
        this.path = path;
    }

    getPath(): string {
        return this.path;
    }
}

export { StandardError }