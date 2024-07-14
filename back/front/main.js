document.getElementById('Registrarse').addEventListener("click", () => {   
    let nom = document.getElementById('usuario').value;
    let cor = document.getElementById('email').value;
    let rol = document.getElementById('rol').value;
    let cla = document.getElementById('password').value;
    let cas = document.getElementById('codigo').value;
    
    let datos = {
        id_casco: cas,
        correo: cor,
        clave: cla,
        rol: rol,
        nombre: nom
    };
    
    fetch("http://localhost:4000/sesiones", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            alert('Datos guardados');
        } else {
            alert('Error al guardar los datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar los datos');
    });
});
