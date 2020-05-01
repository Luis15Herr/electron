$('.dropdown-toggle').dropdown();
var example = flatpickr('#flatpickr');

function clearData(){
    localStorage.clear();
    getLs()
}

$("button#getNewSuccess").click(function () {
    $(".check-icon").hide();
    setTimeout(function () {
        $(".check-icon").show();
    }, 10);
});

function hideLogin() {
    if ($('#UserInput').val() === "admin" && $('#PwdInput').val() === "admin123.") {
        $('#ModalLogin').addClass('d-none-animation');
    } else if ($('#UserInput').val() != "admin" && $('#PwdInput').val() === "admin123.") {
        $('.loginAlertU').addClass('d-block');
    } else if ($('#UserInput').val() === "admin" && $('#PwdInput').val() != "admin123.") {
        $('.loginAlertP').addClass('d-block');
    }
}

//Descartar cambios
function discardChange() {
    document.getElementById("discard").style.display = "none";
}

function discardChangeSure() {
    $('#addStudent')[0].reset();
}

//Variables
const addStudentForm = document.querySelector('#addStudent');
const studentsAddedList = document.querySelector('#addedStudentsList tbody');
const studentsLessedList = document.querySelector('#lessedStudentsList tbody');
const actualStudents = document.querySelector('#actualStudentsList tbody')
const lessStudentForm = document.querySelector('#lessStudentForm');
const infoStudentForm = document.querySelector('#infoStudentForm')

let studentAddedArray = [];
let studentLessedArray = [];
let allStudentsArray = [
    {id: "10428153", name: "Gabriel Andres", lastName: "Urbina Lopez", birthDate: "2020-04-06", gender: "M"},
    {id: "11123145", name: "Carolina Josefina", lastName: "Perez Gonzales", birthDate: "2020-04-06", gender: "F"},
    {id: "11121455", name: "Andrea Valentina", lastName: "Herrera Sinfonte", birthDate: "2020-04-06", gender: "F"},
    {id: "28123145", name: "Manuel Carolino", lastName: "Uzcategui Nava", birthDate: "2020-04-06", gender: "M"
    }
];

//Clase de objeto estudiante, con un constructor de objeto para hacer el trabajo mas facil
class Student {
    constructor(id, name, lastName, birthDate, gender, status) {
        this.id = id,
            this.name = name,
            this.lastName = lastName,
            this.birthDate = birthDate,
            this.gender = gender,
            this.status = status
    }
}

//Escribir en la consola el array de studiantes para confirmar que funcione
console.log(studentAddedArray);

//Guardar en el local storage
const saveLs = () => {
    localStorage.setItem('students', JSON.stringify(studentAddedArray));
    localStorage.setItem('allStudents', JSON.stringify(allStudentsArray));
    localStorage.setItem('studentsLess', JSON.stringify(studentLessedArray));
}

//Obtener lista de estudiantes y mostrarlas
const getLs = () => {
    studentsAddedList.innerHTML = '';
    studentAddedArray = JSON.parse(localStorage.getItem('students'));
    if (studentAddedArray === null) {
        studentAddedArray = [];
    } else {
        studentAddedArray.forEach(element => {
            studentsAddedList.innerHTML += ` 
                        <tr>
                            <th scope="row" class="d-none">1</th>
                            <td>${element.id}</td>
                            <td>${element.name.toString().split(" ")[0]} ${element.lastName.toString().split(" ")[0]}</td>
                        </tr>`;
            console.log(element)
        })
    }
    studentsLessedList.innerHTML = '';
    studentLessedArray = JSON.parse(localStorage.getItem('studentsLess'));
    if (studentLessedArray === null) {
        studentLessedArray = [];
    } else {
        studentLessedArray.forEach(element => {
            studentsLessedList.innerHTML += ` 
                        <tr>
                            <th scope="row" class="d-none">1</th>
                            <td>${element.id}</td>
                            <td>${element.name.toString().split(" ")[0]} ${element.lastName.toString().split(" ")[0]}</td>
                        </tr>`;
            console.log(element)
        })
    }

    actualStudents.innerHTML = '';
    allStudentsArray = JSON.parse(localStorage.getItem('allStudents'));
    if (allStudentsArray === null) {
        allStudentsArray = [];
    } else {
        allStudentsArray.forEach(element => {
            actualStudents.innerHTML += `
                        <tr>
                            <th scope="row" class="d-none">1</th>
                            <td>${element.id}</td>
                            <td>${element.name.toString().split(" ")[0]} ${element.lastName.toString().split(" ")[0]}</td>
                        </tr>`;
            console.log(element)
        })
    }
}

//Formulario para añadir estudiante
addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let names = $('#newStudentNames').val();
    let lastNames = $('#newStudentLastnames').val();
    let studentId = $('#newStudentId').val();
    if ($('#newStudentGenderM').prop("checked") == true)
        gender = 'M';
    else if ($('#newStudentGenderF').prop("checked") == true)
        gender = 'F';
    let studentBirthDate = $('#flatpickr').val();
    let students = new Student(studentId, names, lastNames, studentBirthDate, gender, 0);
    studentsArray = JSON.parse(localStorage.getItem('students'));
    studentAddedArray.push(students);
    addStudentForm.reset();
    saveLs();
    getLs();
});
document.addEventListener('DOMContentLoaded', getLs);

//Eliminar estudiantes
function deleteStudents(id) {
    return studentAddedArray.some(function (el) {
        if (el.id === id) {
            lessStudentForm.innerHTML = '';
            lessStudentForm.innerHTML += `
                <div class="col-md-6 ml-auto">
                    <form>
                        <div class="form-group">
                            <label for="formGroupExampleInput">Nombres</label>
                            <p>${el.name}</p>
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput2">Apellidos</label>
                            <p>${el.lastName}</p>
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput2">Cedula</label>
                            <p>${el.id}</p>
                        </div>
                    </form>
                </div>
                <div class="col-md-6 ml-auto">
                    <form>
                        <div class="form-group">
                            <label for="formGroupExampleInput">Fecha de nacimento</label>
                            <p>${el.birthDate}</p>
                        </div>
                        <div class="form-group">
                             <label for="formGroupExampleInput">Genero</label>
                            <p>${el.gender}</p>
                        </div>
                    </form>
                </div>`;
        }
    });
}

function lessStudent(id) {
    return studentAddedArray.some(function (el) {
        if (el.id === id) {
            let n = studentAddedArray.indexOf(el);
            studentLessedArray.push(studentAddedArray[n]);
            studentAddedArray.splice(studentAddedArray[n]);
            allStudentsArray.splice(allStudentsArray[n]);
        }
        saveLs();
        getLs();
    });
}

function clearStudents() {
    lessStudentForm.innerHTML = '';
    $('#lessId').val('');
}

//Informacion estudiantes
function showInfo(id) {
    return allStudentsArray.some(function (el) {
        if (el.id === id) {
            infoStudentForm.innerHTML = '';
            infoStudentForm.innerHTML += `

                                                                <div class="col-md-6 ml-auto">
                                                    <form>
                                                        <div class="form-group">
                                                            <label for="formGroupExampleInput">Nombres</label>
                                                            <p>${el.name}</p>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="formGroupExampleInput2">Apellidos</label>
                                                            <p>${el.lastName}</p>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-md-6 ml-auto">
                                                    <form>
                                                        <div class="form-group">
                                                            <label for="formGroupExampleInput">Cedula de
                                                                identidad</label>
                                                            <p>${el.id}</p>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="formGroupExampleInput2">Fecha de
                                                                nacimiento</label>
                                                            <p>${el.birthDate}</p>
                                                        </div>

                                                    </form>
</div>`
        }
    });
}
function closeInfo() {
    infoStudentForm.innerHTML = '';
    $('#infoId').val('');
}