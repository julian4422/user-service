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
    constructor (username, password, email, age) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
    }

    cambiarNombre(newUsername) {
        this.username = newUsername;
    }

    impresion() {
        console.log(`This is your username: ${this.username},`, `This is your password:  ${this.password},`, `this is your email: ${this.email}, this is your age: ${this.age}`);
    }
}

const yisus = new usuario ('drakekaiser', 'coco04', 'yisusChrist@gmail.com', 35)
// yisus.cambiarNombre('julihermoso')
// console.log(yisus.username)
 
yisus.impresion();