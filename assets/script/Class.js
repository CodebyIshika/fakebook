'use strict';

// User
class User {
    constructor(id, name, userName, email) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.email = email;
    }

    get fullName() {
        return `${this.name} (${this.userName})`;
    }

    getInfo() {
        return `Id: ${this.id}\n` +
        `Name: ${this.name}\n` + 
        `Username: ${this.userName}\n` + 
        `Email: ${this.email}\n`;
    }
}

// Subscriber
class Subscriber extends User {
    constructor(data) {
        super(data.id, data.name, data.userName, data.email);
        this.pages = data.pages || [];
        this.groups = data.groups || [];
        this.canMonetize = data.canMonetize || false;
    }

    getInfo() {
        return `
        ${super.getInfo()}
        Pages: ${this.pages.join(', ')}
        Groups: ${this.groups.join(', ')}
        Can Monetize: ${this.canMonetize ? 'Yes' : 'No'}
    `;      
    }
}

export { User, Subscriber };