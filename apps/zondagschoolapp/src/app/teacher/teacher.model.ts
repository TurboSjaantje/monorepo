export class Teacher {
    emailaddress: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    birthdate: Date | undefined;
    city: string | undefined;
    street: string | undefined;
    housenumber: number | undefined;
    postalcode: string | undefined;

    constructor(emailaddress: string, firstname: string, lastname: string, birthdate: Date, city: string, street: string, housenumber: number, postalcode: string) {
        this.emailaddress = emailaddress;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.city = city;
        this.street = street;
        this.housenumber = housenumber;
        this.postalcode = postalcode;
    }
}