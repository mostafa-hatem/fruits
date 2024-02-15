class Person {
    constructor(name, payed) {
        this.name = name || "";
        this.payed = payed || 0;
        this.bought = [];
        this.totalBought = 0;
        this.change = payed;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPayed() {
        return this.payed;
    }

    setPayed(payed) {
        this.payed = payed;
    }

    getTotalBought() {
        return this.totalBought;
    }

    setTotalBought(num) {
        this.totalBought += num;
    }

    calcTotalBought() {
        this.totalBought = 0;
        for (const fruit of this.bought) {
            this.totalBought += fruit.getPrice();
        }
    }

    setChange() {
        this.change = this.payed - this.totalBought;
    }

    addBought(fruit, quantity, price) {
        this.bought.push(new Bought(fruit, quantity, price));
    }

    getBought() {
        return this.bought;
    }

    toString() {
        return `Name: ${this.name}, Amount Paid: ${this.payed}, Items Bought: ${this.bought.toString()}`;
    }
}

class Bought {
    constructor(fruit, quantity, price) {
        this.fruit = fruit || "";
        this.quantity = quantity || 0;
        this.price = price || 0;
    }

    getFruit() {
        return this.fruit;
    }

    getQuantity() {
        return this.quantity;
    }

    getPrice() {
        return this.price;
    }

    setFruit(fruit) {
        this.fruit = fruit;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    setPrice(price) {
        this.price = price;
    }

    toString() {
        return `${this.fruit}, Quantity: ${this.quantity}, Price: ${this.price}`;
    }
}

class Fruit {
    constructor(name, price, quantity) {
        this.name = name || "";
        this.price = price || 0;
        this.quantity = quantity || 0;
        this.pricePerKg = price / quantity || 0;
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
        if (price !== 0) {
            this.pricePerKg = this.price / this.quantity;
        }
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
        if (this.price !== 0) {
            this.pricePerKg = this.price / this.quantity;
        }
    }

    getPricePerKg() {
        return this.pricePerKg;
    }

    updateQuantity(quantity) {
        this.quantity -= quantity;
    }

    changeQuantity(oldQuantity, newQuantity) {
        this.quantity += oldQuantity;
        this.updateQuantity(newQuantity);
    }

    toString() {
        return `Name: ${this.name}, Quantity: ${this.quantity}, Price Per Kg: ${this.pricePerKg}`;
    }
}

// make person and fruit arrays
let people = [];
let fruits = [];

addPerson = () => {
    // get the name and amount paid from prompt
    let name = prompt("Enter name of person");
    let payed = parseFloat(prompt("Enter amount paid"));
    if (isNaN(payed) || payed <= 0) {
        alert("Invalid amount paid. Please enter a valid number greater than 0.");
        return;
    }
    // create a person object
    let person = new Person(name, payed);
    // add the person to the list
    people.push(person);
    // add the person to the table
    addPersonToTable(person);
    console.log(people);
}

addPersonToTable = (person) => {
    // get the table
    let table = document.getElementById("people-table");
    // create a row
    let row = table.insertRow(table.rows.length);
    // create cells
    let nameCell = row.insertCell(0);
    let payedCell = row.insertCell(1);
    let totalBoughtCell = row.insertCell(2);
    let changeCell = row.insertCell(3);
    let buycell = row.insertCell(4);
    let viewBoughtCell = row.insertCell(5);
    let editCell = row.insertCell(6);

    // add the person to the table
    nameCell.innerHTML = person.getName();
    payedCell.innerHTML = person.getPayed();
    totalBoughtCell.innerHTML = person.getTotalBought();
    changeCell.innerHTML = person.change;
    buycell.innerHTML = `<button onclick="buyFruit(${people.indexOf(person)})">شراء</button>`;
    viewBoughtCell.innerHTML = `<button onclick="viewBought(${people.indexOf(person)})">روئة المشتريات</button>`;
    editCell.innerHTML = `<button disabled onclick="editPerson(${people.indexOf(person)})">تعديل</button>`;
}

addFruit = () => {
    // get the name, price and quantity from prompt
    let name = prompt("Enter name of fruit");
    let price = parseFloat(prompt("Enter price of fruit"));
    let quantity = parseFloat(prompt("Enter quantity of fruit"));
    //validate the price and quantity
    if (isNaN(price) || price <= 0) {
        alert("Invalid price. Please enter a valid number greater than 0.");
        return;
    }
    // create a fruit object
    let fruit = new Fruit(name, price, quantity);
    // add the fruit to the list
    fruits.push(fruit);
    // add the fruit to the table
    addFruitToTable(fruit);
    console.log(fruits);
}
addFruitToTable = (fruit) => { 
    // get the table
    let table = document.getElementById("fruits-table");
    // create a row
    let row = table.insertRow(table.rows.length);
    // create cells
    let nameCell = row.insertCell(0);
    let quantityCell = row.insertCell(1);
    let pricePerKgCell = row.insertCell(2);
    let divideCell = row.insertCell(3);
    let editCell = row.insertCell(4);
    

    // add the fruit to the table
    nameCell.innerHTML = fruit.getName();
    quantityCell.innerHTML = fruit.getQuantity();
    pricePerKgCell.innerHTML = fruit.getPricePerKg();
    divideCell.innerHTML = `<button disabled onclick="divideFruit(${fruits.indexOf(fruit)})">تقسيم</button>`;
    editCell.innerHTML = `<button disabled onclick="editFruit(${fruits.indexOf(fruit)})">تعديل</button>`;
}

buyFruit = (personIndex) => {
    // get the person
    let person = people[personIndex];
    // get the fruit
    let fruitName = prompt("Enter the name of the fruit");
    //search for the fruit in the fruits array
    let selectedFruit = fruits.find(fruit => fruit.getName() === fruitName);
    if (!selectedFruit) {
        alert("Selected fruit not found. Please enter a valid fruit name.");
        return;
    }
    // get the quantity
    let quantity = parseFloat(prompt("Enter the quantity"));
    if (isNaN(quantity) || quantity <= 0) {
        alert("Invalid quantity. Please enter a valid number greater than 0.");
        return;
    }
    // Check if there is enough quantity in stock
    if (quantity > selectedFruit.getQuantity()) {
        alert("Not enough quantity in stock. Please enter a lower quantity.");
        return;
    }
    // calculate the price
    let price = selectedFruit.getPricePerKg() * quantity;
    // add the bought to the person
    person.addBought(fruitName, quantity, price);
    // update the total bought
    person.calcTotalBought();
    // update the change
    person.setChange();
    // update the table
    updatePersonTable(personIndex);
    // update the fruit quantity
    selectedFruit.updateQuantity(quantity);
    //update the fruit price
    let newprice = selectedFruit.getPricePerKg() * selectedFruit.getQuantity();
    selectedFruit.setPrice(newprice);
    // update the table
    updateFruitTable(fruits.indexOf(selectedFruit));
}

updatePersonTable = (personIndex) => {
    // get the person
    let person = people[personIndex];
    // get the table
    let table = document.getElementById("people-table");
    // get the row
    let row = table.rows[personIndex + 1];
    // update the cells
    row.cells[2].innerHTML = person.getTotalBought();
    row.cells[3].innerHTML = person.change;
}

updateFruitTable = (fruitIndex) => {
    // get the fruit
    let fruit = fruits[fruitIndex];
    // get the table
    let table = document.getElementById("fruits-table");
    // get the row
    let row = table.rows[fruitIndex + 1];
    // update the cells
    row.cells[1].innerHTML = fruit.getQuantity();
}

viewBought = (personIndex) => {
    // get the person
    let person = people[personIndex];
    // get the bought
    let bought = person.getBought();
    // create a string
    let boughtString = "";
    for (const b of bought) {
        boughtString += b.toString() + "\n";
    }
    // display the bought
    alert(boughtString);
    console.log(person.toString());
}










