getAllUsers()
document.getElementById('userEditButton').addEventListener("click", () => {
    editUser();})
document.getElementById('save-user-tab').addEventListener("click", () => {
    saveUser()
})

function saveUser() {
    let getRoles = [];
    let rolesCheckUser = document.querySelector("input[id='role-new-user']")
    let rolesCheckAdmin = document.querySelector("input[id='role-new-admin']")

    if (rolesCheckUser.checked){
        getRoles.push({
            id: 1,
            role: "USER_ROLE",
            authority: "USER_ROLE"
        })
    }
    if (rolesCheckAdmin.checked){
        getRoles.push({
            id: 2,
            role: "ADMIN_ROLE",
            authority: "ADMIN_ROLE"
        })
    }
    let data = document.forms["formNewUser"]
    let user = {
        userName: data.elements["userName"].value,
        password: data.elements["password"].value,
        roles: getRoles
    }
    console.log(user)
    fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json())
        .then(() => {
            document.getElementById('profile-tab').setAttribute('class', 'nav-link')
            document.getElementById('home-tab').setAttribute('class', 'nav-link active')
            document.getElementById('profile-show-tab').setAttribute('class', 'tab-pane fade')
            document.getElementById('home-show-tab').setAttribute('class', 'tab-pane fade show active border-dark')
            getAllUsers()
        })
        .then(()=>{
            document.querySelector("form[name='formNewUser']").reset()
        })

}

function getAllUsers() {
    fetch("/api/users", {
        method: "GET",
        headers: {"Accept": "application/json"}
    }).then(response => response.json()).then((response)=>{
        let users = response;
        document.querySelector('tbody').innerHTML = " "

        users.forEach(user => {
            const tbody = document.getElementById('admin-tableBody')
            const tr = document.createElement("tr");
            tr.setAttribute("data-id", user.id);

            const idTd = document.createElement("td");
            idTd.innerHTML=(user.id);
            tr.append(idTd);

            const nameTd = document.createElement("td");
            nameTd.innerHTML=(user.userName);
            tr.append(nameTd);

            const passTd = document.createElement("td");
            passTd.innerHTML=(user.password);
            tr.append(passTd);

            const roleTd = document.createElement("td")
            let x = "";
            let i;
            for (i = 0; i < user.roles.length; i++) {
                x += user.roles[i].role+" "
            }

            roleTd.innerHTML= x
            tr.append(roleTd)

            const linkEdit = document.createElement("td")
            const buttonEdit = document.createElement("button")
            buttonEdit.setAttribute("class", "btn btn-info")
            buttonEdit.setAttribute("type", "button")
            buttonEdit.setAttribute("data-bs-toggle", "modal")
            buttonEdit.setAttribute("data-bs-target", "#editUser")
            buttonEdit.append("Edit")
            buttonEdit.addEventListener("click", () => {
                getUserForEdit(user.id)
            })
            linkEdit.append(buttonEdit)
            tr.append(linkEdit)

            const linkDelete = document.createElement("td")
            const buttonDelete = document.createElement("button")
            buttonDelete.setAttribute("id", user.id)
            buttonDelete.setAttribute("class", "btn btn-danger")
            buttonDelete.setAttribute("type", "button")
            buttonDelete.append("Delete")
            buttonDelete.addEventListener("click", () => {
                remove(user.id).then(r => console.log(r))
            });

            linkDelete.append(buttonDelete)
            tr.append(linkDelete)

            tbody.append(tr)
        });
    });
}

async function remove(id) {
    await fetch("/api/users/" + id, {
        method: "DELETE"
    }).then(() => {
        console.log('removed');
    }).catch(err => {
        console.error(err)
    }).then(()=> document.querySelector("tr[data-id='"+id+"']").remove())

}

function getUserForEdit(id) {
    fetch("/api/users/"+id, {
        method: "GET",
        headers: {"Accept": "application/json"}
    }).then(response => response.json())
        .then((response)=> {
            let user = response
            console.log(user)
            if (user.roles.map(r => r.role).includes("ROLE_USER")) {
                document.getElementById('modal-check-user').setAttribute("checked", " ")
            } else {
                document.getElementById('modal-check-user').removeAttribute("checked")
            }
            if (user.roles.map(r => r.role).includes("ROLE_ADMIN")) {
                document.getElementById('modal-check-admin').setAttribute("checked", " ")
            } else {
                document.getElementById('modal-check-admin').removeAttribute("checked")
            }
            document.getElementById('userIdEdit').setAttribute("value", user.id)
            document.getElementById('userNameEdit').setAttribute("value", user.userName)
            document.getElementById('userPasswordEdit').setAttribute("value", user.password)
            // document.getElementById('userEditButton').addEventListener("click", () => {
            //     editUser();
            // })
        })

}

function editUser() {
    let getRoles = [];
    let rolesCheckUser = document.querySelector("input[id='modal-check-user']")
    let rolesCheckAdmin = document.querySelector("input[id='modal-check-admin']")

    if (rolesCheckUser.checked){
        getRoles.push({
            id: 1,
            role: "USER_ROLE",
            authority: "USER_ROLE"
        })
    }
    if (rolesCheckAdmin.checked){
        getRoles.push({
            id: 2,
            role: "ADMIN_ROLE",
            authority: "ADMIN_ROLE"
        })
    }
    let data = document.forms["editUser"]
    let user = {
        id: data.elements["userIdEdit"].value,
        userName: data.elements["userNameEdit"].value,
        password: data.elements["userPasswordEdit"].value,
        roles: getRoles
    }
    console.log(user)
    fetch('/api/users', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json())
        .then((response)=> console.log(response))
        .then(()=> document.querySelector("form[name='editUser']").reset())
        .then(()=> getAllUsers())

}


async function getAuthUser() {
    const response = await fetch("/api/auth", {
        method: "GET",
        headers: {"Accept": "application/json"}
    });
    if (response.ok === true) {
        const user = await response.json();
        const tbody = document.getElementById("user-tableBody")
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", user.id);

        const idTd = document.createElement("td");
        idTd.innerHTML=(user.id);
        tr.append(idTd);

        const nameTd = document.createElement("td");
        nameTd.innerHTML=(user.userName);
        tr.append(nameTd);

        const passTd = document.createElement("td");
        passTd.innerHTML=(user.password);
        tr.append(passTd);

        const roleTd = document.createElement("td")
        let x = "";
        let i;
        for (i = 0; i < user.roles.length; i++) {
            x += user.roles[i].role+" "
        }
        roleTd.innerHTML= x
        tr.append(roleTd)
        tbody.append(tr)
    }
}