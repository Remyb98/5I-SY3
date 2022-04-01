import "bootstrap/dist/css/bootstrap.min.css";

import {Crud} from "./Crud"

let crud

window.addEventListener("DOMContentLoaded", function () {
    let url = window.location.href.includes("9000") ? "http://localhost:5000" : "http://localhost:1337";
    crud = new Crud(url);
    console.log("CRUD loaded with url: ".concat(url));
    crud.loadDatatable();
});

document.getElementById("create-button").addEventListener("click", () =>
    crud.create(
        document.getElementById("firstname-create").value,
        document.getElementById("lastname-create").value,
        document.getElementById("age-create").value
    )
);

document.getElementById("edit-button").addEventListener("click", () =>
    crud.update(
        document.getElementById("id-edit").value,
        document.getElementById("firstname-edit").value,
        document.getElementById("lastname-edit").value,
        document.getElementById("age-edit").value
    )
);
