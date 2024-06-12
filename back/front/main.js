document.getElementById('Regus').addEventListener("click",()=>{
let nom=document.getElementById('name').value;
let cla=document.getElementById('clave').value;
let cor=document.getElementById('correo').value;
let rol=document.getElementById('rol').value;

let datos={

    nombre:nom,
    correo:cor,
    clave:cla,
    rol:rol
};



fetch("http://localhost:3333/login",{

method:'POST',
    headers: {
    'Content-Type':'application/json;charset=utf-8'

},
body:JSON.stringify(datos)


})

.then(response=>{alert('datos almacenados')});

});



document.getElementById('ingreso').addEventListener("click",()=>{

let cor=document.getElementById("lcorreo").value;
let cla=document.getElementById("lclave").value;

fetch("http://localhost:3333/login?correo="+ cor + "&clave="+ cla)
.then(response=>response.json())
.then(datos=>{
console.log(datos);
if(datos.alerta=='no existe'){
alert("usuario no existe");

}else{
    alert("usuario encontrado");
    if(datos.rol=="administrador"){
        document.location.href="admin.html"

    }

    

}

})

});