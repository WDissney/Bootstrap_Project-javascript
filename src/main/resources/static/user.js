getAuthUser()
function getAuthUser() {
    fetch("/api/auth", {
        method: "GET",
        headers: {"Accept": "application/json"}
    }).then(response => response.json()).then((response)=>{
        let user = response
        let tbody = document.getElementById("user-tableBody")
        let tr = document.createElement("tr");
        tr.setAttribute("data-id", user.id);

        let idTd = document.createElement("td");
        idTd.innerHTML=(user.id);
        tr.append(idTd);

        let nameTd = document.createElement("td");
        nameTd.innerHTML=(user.userName);
        tr.append(nameTd);

        let passTd = document.createElement("td");
        passTd.innerHTML=(user.password);
        tr.append(passTd);

        let roleTd = document.createElement("td")
        let x = "";
        let i;
        for (i = 0; i < user.roles.length; i++) {
            x += user.roles[i].role+" "
        }
        roleTd.innerHTML= x
        tr.append(roleTd)
        tbody.append(tr)
    });

}