// class Person {

//     constructor(name, lastName, age) {
//         this.name = name;
//         this.lastName = lastName;
//         this.age = age;
//     }

//     aumentarEdad() {
//         this.age =  this.age + 1;
//         return this.age;
//     }

// }


// const julian = new Person('julian', 'sanchez', 20);
// console.log(julian.aumentarEdad());


// user name username password email

// modificar nombre
// cambie el correo

class usuario {
    constructor (username, password, email) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    cambiarNombre(newUsername) {
        this.username = newUsername;
    }

    impresion() {
        console.log(`This is your username: ${this.username},`, `This is your password:  ${this.password},`, `this is your email: ${this.email},`);
    }
}

const yisus = new usuario ('drakekaiser', 'coco04', 'yisusChrist@gmail.com')
// yisus.cambiarNombre('julihermoso')
// console.log(yisus.username)
 
yisus.impresion();