let form = document.querySelector('.form');
let name = document.querySelector('.name');
let email = document.querySelector('.email');
let age = document.querySelector('.age');

let table = document.querySelector('.table');
let tableBody = document.querySelector('.table-content');

let linkModal = document.querySelector('.link-others');
let tableModal = document.querySelector('.table-content-modal');
let bgModal = document.querySelector('.container');

let successAlert = document.querySelector('.success-alert');
let warningAlert = document.querySelector('.warning-alert');
let loader = document.querySelector('.loader');

let btnNew = document.querySelector('.button-open');
let modalInsert = document.querySelector('.left');
let baseTr;
let msg;
let classNew;
let count;
let active = true;

form.addEventListener("submit",  (e) => {
    e.preventDefault();
    msg = verifyInputs(name, email, age);
    if (verifyInputs(name, email, age)) {
        
        showAlert(msg);

        table.style.opacity = 0;
        loader.style.opacity = 1;
        linkModal.style.opacity = 0;

        updateBaseTr();

        setTimeout(() => {
            table.style.opacity = 1;
            loader.style.opacity = 0;
            linkModal.style.opacity = 1;

            removeClass();
            addingData();
        }, 1500);

        
    } else {
        showAlert(msg);
    }
});

linkModal.addEventListener("click", (e) => {
   openModal();
});

btnNew.addEventListener("click", (e) => {
    openModalInsert();
});

bgModal.addEventListener("click", (e) => {
    closeModal();
});


function verifyInputs(name, email, age) {
    if (name.value == '') {
        name.classList.add('error');
        return false;
    } else {
        name.classList.remove('error');
    }

    if (email.value == '') {
        email.classList.add('error');
        return false;
    } else {
        email.classList.remove('error');
    }

    if (age.value == '') {
        age.classList.add('error');
        return false;
    } else {
        age.classList.remove('error');
    }

    return true;
}

function removeClass() {

    classNew = document.querySelectorAll('.new');

    classNew.forEach( (e) => {
        if (e.classList.contains('new')) {
            e.classList.remove('new');
        }        
    });

}

function addingData() {

    if (count < 3) {
        tableBody.innerHTML += (`
        <tr class="base">
            <td class="show-name new"> ${name.value.split(" ")[0]}</td>
    
            <td class="show-email new"> ${email.value}</td>
    
            <td class="show-age new"> ${age.value} anos</td>
        </tr>
        `);
    } else {

        linkModal.style.display = "block";

        tableModal.innerHTML += (`
            <tr class="base">
                <td class="show-name new"> ${name.value.split(" ")[0]}</td>
        
                <td class="show-email new"> ${email.value}</td>
        
                <td class="show-age new"> ${age.value} anos</td>
            </tr>
        `);

        if (active) {
            openModal();
        }

        if (count == 3) {
            active = confirm("Olá, a partir de agora, abriremos um modal com os novos dados cadastrados a cada nova inserção. Caso queira cancelar essa ação, clique em cancelar");
        }
    }
    
    if (modalInsert.classList.contains('left-active')) {
        closeModalInsert();
    }
    cleanInputs(name, email, age);
}

function cleanInputs(name, email, age) {
    name.value = '';
    email.value = '';
    age.value = '';
}

function showAlert(msg) {

    if (msg) {
        successAlert.style.display = "block";
        warningAlert.style.display = "none";
    } else {
        successAlert.style.display = "none";
        warningAlert.style.display = "block";
    }

    setTimeout( () => {
        successAlert.style.opacity = "0%";
        warningAlert.style.opacity = "0%";
    }, 2000);
}


function updateBaseTr() {

    baseTr = document.querySelectorAll('.base');
    
    count = baseTr.length;
    
    console.log(count);
    
}

function openModal() {
    bgModal.style.display = "flex";
}

function closeModal() {
    bgModal.style.display = "none";
}

function openModalInsert() {
    modalInsert.style.display = "block";
    modalInsert.classList.add("left-active");
    btnNew.style.opacity = 0;
}

function closeModalInsert() {
    modalInsert.style.display = "none";
    modalInsert.classList.remove("left-active");
    btnNew.style.opacity = 1;
}