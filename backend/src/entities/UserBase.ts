enum UserRole {
    User = "USER",
    Admin = "ADMIN",
    Visitor = "VISITOR"
}  

abstract class UserBase {
    private uid: string;
    private name: string;
    private email: string;
    private role: UserRole;

    constructor(uid: string, name: string, email: string, userRole: UserRole) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.role = userRole;
    }

    getUid(): string {
        return this.uid;
    }

    setUid(uid: string): void {
        this.uid = uid;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getRole(): UserRole {
        return this.role;
    }
  
    setRole(role: UserRole) {
        this.role = role;
    } 
    
    abstract toObject()
}

export { UserBase, UserRole }