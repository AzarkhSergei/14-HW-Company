class Person {
  constructor(id, firstName, lastName, birthDate) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthDate = new Date(birthDate);
  }

  get id() {
    return this._id;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName) {
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  get birthDate() {
    return this._birthDate;
  }

  get age() {
    const ageDiffMs = new Date() - this._birthDate;
    const ageDate = new Date(ageDiffMs);
    return ageDate.getUTCFullYear() - 1970;
  }
}

class Employee extends Person {
  constructor(id, firstName, lastName, birthDate, salary) {
    super(id, firstName, lastName, birthDate);
    this._salary = salary;
  }

  get salary() {
    return this._salary;
  }

  set salary(value) {
    this._salary = value;
  }

  fullInfo = function () {
    return `${this._id} ${this._firstName} ${this._lastName} ${this._salary} NIS`;
  };
}

class Company {
  constructor() {
    this._employees = [];
  }

  addEmployee(employee) {
    const index = this._employees.findIndex((e) => e.id === employee.id);
    if (index < 0) {
      this._employees.push(employee);
    } else {
      return "Bad man";
    }
  }

  get employees() {
    return [...this._employees];
  }

  removeEmployee(id) {
    const index = this._employees.findIndex((e) => e.id === id);
    if (index > 0) {
      this._employees.splice(index, 1);
    }
    return index >= 0;
  }
}

const myCompany = new Company();
const personId = document.getElementById("personId");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const birthDate = document.getElementById("birthDate");
const salary = document.getElementById("salary");
const addButton = document.getElementById("addEmployee");
const companyStatus = document.getElementById("companyStatus");
const employeesList = document.getElementById("employeesList");
const statusList = document.getElementById("status");

addButton.onclick = addEmployees;
companyStatus.onclick = myCompanyStatus;

function addEmployees() {
  if (
    personId.value.trim() === "" ||
    firstName.value.trim() === "" ||
    lastName.value.trim() === "" ||
    new Date(birthDate.value.trim()) === "" ||
    salary.value.trim() === ""
  ) {
    alert("Please fill all fields");
    return;
  }
  const employee = new Employee(
    personId.value.trim(),
    firstName.value.trim(),
    lastName.value.trim(),
    new Date(birthDate.value.trim()),
    salary.value.trim()
  );

  if (myCompany.addEmployee(employee) !== "Bad man") {
    const li = createElement(
      `ID: ${employee.id}, First name: ${employee.firstName}, 
      Last name: ${employee.lastName}, Age: ${employee.age}, Salary: ${employee.salary} NIS`,
      "li"
    );
    employeesList.appendChild(li);
    console.log(myCompany.employees);
  } else {
    alert(`This ID: ${employee.id} already exists!`);
  }
}

function myCompanyStatus() {
  statusList.innerHTML = "";
  myCompany.employees.forEach((e) => {
    const li = createElement(e.fullInfo(), "li");
    statusList.appendChild(li);
    const changeSalary = document.createElement("button");
    changeSalary.innerHTML = "Change Salary";
    changeSalary.classList.add("btn", "btn-warning");
    li.appendChild(changeSalary);
    changeSalary.onclick = function () {
      const newSalary = +prompt(`${e.salary} New Salary`);
      e.salary = newSalary;
      li.firstChild.textContent = e.fullInfo();
    };
  });
}

function createElement(text, tag) {
  const element = document.createElement(tag);
  const textElement = document.createTextNode(text);
  element.append(textElement);
  return element;
}
