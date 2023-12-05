document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('userForm').addEventListener('submit', function (event) {
        event.preventDefault();
        ADD_USER();
    });

    loadUsers();

    function ADD_USER() {
        var NAME = document.getElementById('name').value;
        var EMAIL = document.getElementById('email').value;
        var PASSWORD = document.getElementById('password').value;
        var MESSAGE = document.getElementById('message').value;

        if (NAME.trim() === '' || EMAIL.trim() === '' || PASSWORD.trim() === '' || MESSAGE.trim() === '') {
            alert('Por favor completa todos los campos.');
            return;
        }
        
        if (NAME.length < 6 || EMAIL.length < 6 || PASSWORD.length < 6 || MESSAGE.length < 6) {
            alert('Usuario no válido.');
            return;
        }

        var NEW_USER = document.createElement('li');
        NEW_USER.className = 'list-group-item';
        NEW_USER.innerHTML = `<strong>Nombre:</strong> ${NAME} | <strong>Email:</strong> ${EMAIL} | <strong>Password:</strong> ${PASSWORD}| <strong>Mensaje:</strong> ${MESSAGE}`;

        var BTN_DELETE = document.createElement('button');
        BTN_DELETE.className = 'btn btn-danger btn-sm float-end';
        BTN_DELETE.textContent = 'Delete';
        BTN_DELETE.addEventListener('click', function () {
            DELETE_USER(NEW_USER);
        });

        NEW_USER.appendChild(BTN_DELETE);

        document.getElementById('listUsers').appendChild(NEW_USER);

     
        saveUser({
            name: NAME,
            email: EMAIL,
            password: PASSWORD,
            message: MESSAGE
        });

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('message').value = '';
    }

    function DELETE_USER(element) {
        element.remove();
    }

    function saveUser(user) {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUsers() {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(function (user) {
            var userItem = document.createElement('li');
            userItem.className = 'list-group-item';
            userItem.innerHTML = `<strong>Nombre:</strong> ${user.name} | <strong>Email:</strong> ${user.email} | <strong>Password:</strong> ${user.password}| <strong>Mensaje:</strong> ${user.message}`;

            var deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm float-end';
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', function () {
                DELETE_USER(userItem);
                var updatedUsers = users.filter(function (u) {
                    return u !== user;
                });
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            });

            userItem.appendChild(deleteButton);

            document.getElementById('listUsers').appendChild(userItem);
        });
    }
});