export class Teacher {
    emailAddress: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    birthDate: Date | undefined;
    city: string | undefined;
    street: string | undefined;
    houseNumber: number | undefined;
    postalCode: string | undefined;

    constructor(emailAddress: string, firstName: string, lastName: string, birthDate: Date, city: string, street: string, houseNumber: number, postalCode: string) {
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
    }
}