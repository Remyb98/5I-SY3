import "datatables.net-bs5"

import $ from "jquery"
import {Modal} from "bootstrap";

let apiUrl;
let table;


export class Crud {
    constructor(url) {
        apiUrl = url;
    }

    loadDatatable() {
        table = $(".table").DataTable({
            "responsive": false,
            "ajax": apiUrl,
            "columns": [
                { "data": "id" },
                { "data": "firstname" },
                { "data": "lastname" },
                { "data": "age" },
                {
                    "data": null,
                    "defaultContent": "<button  type=\"button\" class=\"btn btn-warning mx-1\">Edit</button>" +
                        "<button type=\"button\" class=\"btn btn-danger\">Delete</button>"
                }
            ],
            dom: '<"toolbar">frtip',
            fnInitComplete: function fnInitComplete() {
                $('div.toolbar').html(
                    '<button type="button" class="btn btn-primary" data-bs-toggle="modal" ' +
                    'data-bs-target="#createModal">Add user</button>'
                );
                refreshButtonsListeners();
            }
        });
    }

    create(firstname, lastname, age) {
        document.getElementById("firstname-create").value = "";
        document.getElementById("lastname-create").value = "";
        document.getElementById("age-create").value = "";
        let payload = {
            firstname: firstname,
            lastname: lastname,
            age: age
        };
        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return console.log(response.statusCode);
        })["catch"](function (error) {
            return console.log(error);
        })["finally"](function () {
            return table.ajax.reload(function () {
                return refreshButtonsListeners();
            }, false);
        });
    }

    update(id, firstname, lastname, age) {
        let payload = {
            firstname: firstname,
            lastname: lastname,
            age: age
        };
        fetch("".concat(apiUrl, "/").concat(id), {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return console.log(response.statusCode);
        }).catch(function (error) {
            return console.log(error);
        }).finally(function () {
            return setTimeout(function () {
                return table.ajax.reload(function () {
                    return refreshButtonsListeners();
                }, false);
            }, 500);
        });
    }
}

function refreshButtonsListeners() {
    let removeButtons = document.querySelectorAll("table .btn-danger");
    for (let i = 0; i < removeButtons.length; ++i) {
        removeButtons[i].removeEventListener("click", deleteListener);
        removeButtons[i].addEventListener("click", deleteListener);
    }

    let warningButtons = document.querySelectorAll("table .btn-warning");
    for (let i = 0; i < removeButtons.length; ++i) {
        warningButtons[i].removeEventListener("click", editListener);
        warningButtons[i].addEventListener("click", editListener);
    }
}

function editListener(e) {
    new Modal(document.getElementById('editModal')).toggle();
    let row = e.currentTarget.parentNode.parentNode;
    document.getElementById("id-edit").value = row.children[0].textContent;
    document.getElementById("firstname-edit").value = row.children[1].textContent;
    document.getElementById("lastname-edit").value = row.children[2].textContent;
    document.getElementById("age-edit").value = row.children[3].textContent;
}

function deleteListener(e) {
    let id = e.currentTarget.parentNode.parentNode.firstChild.textContent;
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => console.log(response.statusCode))
        .catch(error => console.log(error))
        .finally(() => setTimeout(() => table.ajax.reload(() => refreshButtonsListeners(), false), 500));
}
