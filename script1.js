document.addEventListener("DOMContentLoaded", () => {
    loadUsers();

    document.getElementById("userForm").addEventListener("submit", saveUser);
    document.getElementById("searchInput").addEventListener("input", searchUser);
});

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


function saveUser(e) {
    e.preventDefault();

    const id = document.getElementById("userId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    let users = getUsers();

    if (id) {
        
        users = users.map(user =>
            user.id == id ? { id, name, email } : user
        );
        document.getElementById("form-title").textContent = "Agregar Usuario";
    } else {
        // Agregar
        const newUser = {
            id: Date.now(),
            name,
            email
        };
        users.push(newUser);
    }

    setUsers(users);
    document.getElementById("userForm").reset();
    loadUsers();
}


function loadUsers() {
    const users = getUsers();
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="actions">
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Eliminar</button>
                <button onclick="viewUser(${user.id})">Ver</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}


function viewUser(id) {
    const user = getUsers().find(u => u.id == id);
    alert(`ID: ${user.id}\nNombre: ${user.name}\nCorreo: ${user.email}`);
}


function editUser(id) {
    const user = getUsers().find(u => u.id == id);

    document.getElementById("userId").value = user.id;
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;

    document.getElementById("form-title").textContent = "Editar Usuario";
}


function deleteUser(id) {
    let users = getUsers().filter(u => u.id != id);
    setUsers(users);
    loadUsers();
}


function searchUser(e) {
    const text = e.target.value.toLowerCase();
    const users = getUsers().filter(u =>
        u.name.toLowerCase().includes(text)
    );

    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="actions">
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Eliminar</button>
                <button onclick="viewUser(${user.id})">Ver</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}