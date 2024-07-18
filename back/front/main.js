document.getElementById('Registrarse').addEventListener("click", () => {
    let nom = document.getElementById('usuario').value;
    let cor = document.getElementById('email').value;
    let rol = document.getElementById('rol').value;
    let cla = document.getElementById('password').value;
    let cas = document.getElementById('codigo').value;

    let datos = {
        nombre: nom,
        correo: cor,
        rol: rol,
        clave: cla,
        id_casco: cas
    };

    fetch("http://localhost:4000/sesiones", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            alert('Datos guardados correctamente');
        } else {
            alert('Error al guardar los datos');
        }
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al guardar los datos');
    });
});





document.getElementById('Login').addEventListener("click", () => {   
    let us = document.getElementById('usuario').value;
    let cor = document.getElementById('correo').value;
    let cla = document.getElementById('clave').value;
    
    let datos = {
        usuario: us,
        correo: cor,
        clave: cla
    };
    
    fetch("http://localhost:4000/usuarios", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            alert('Inicio de sesión correcto');
        } else {
            alert('Error al iniciar sesión');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    });
});