

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        addUser();
    });

    function addUser() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var message = document.getElementById('message').value;

        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || message.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        var newUser = document.createElement('li');
        newUser.className = 'list-group-item';
        newUser.innerHTML = `<strong>Name:</strong> ${name} | <strong>Email:</strong> ${email} | <strong>Password:</strong> ${password}| <strong>Message:</strong> ${message}`;

        var btnDelete = document.createElement('button');
        btnDelete.className = 'btn btn-danger btn-sm float-end';
        btnDelete.textContent = 'Delete';
        btnDelete.addEventListener('click', function () {
            deleteUser(newUser);
        });

        newUser.appendChild(btnDelete);

        document.getElementById('listUsers').appendChild(newUser);

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('message').value = '';
    }

    function deleteUser(element) {
        element.remove();
    }
});
