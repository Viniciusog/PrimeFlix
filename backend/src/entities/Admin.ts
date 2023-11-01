import { UserBase, UserRole } from "./UserBase";

class Admin extends UserBase {
    
    constructor (uid: string, email: string, name: string) {
        super(uid, name, email, UserRole.Admin)
    }

    toObject() {
        return JSON.parse(JSON.stringify(this))
    }

    printDetails(): void {
        console.log(`Nome: ${this.getName()}, email: ${this.getEmail()}`);
    }
}

export { Admin }