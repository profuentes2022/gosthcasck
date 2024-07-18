document.getElementById('Login').addEventListener("click", () => {   
    let us = document.getElementById('usuario').value;
    let cor = document.getElementById('email').value;
    let cla = document.getElementById('clave').value;
    
    let datos = {
        usuario: us,
        email: cor,
        clave: cla,

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
            alert('Inicio de sesion correcta');
        } else {
            alert('Error al iniciar sesion');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al iniciar sesion');
    });
});

function regis(){
    document.location.href="http://localhost:4000/sesiones/:id";
    
    }


    