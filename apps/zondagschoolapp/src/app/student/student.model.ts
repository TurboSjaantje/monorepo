export class Student {

    _id: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    birthdate: Date | undefined;
    city: string | undefined;
    street: string | undefined;
    housenumber: number | undefined;
    postalcode: string | undefined;
    inclass: string | undefined;

    constructor(firstname: string, lastname: string, birthdate: Date, city: string, street: string, housenumber: number, postalcode: string, inclass: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.city = city;
        this.street = street;
        this.housenumber = housenumber;
        this.postalcode = postalcode;
        this.inclass = inclass;
    }

}