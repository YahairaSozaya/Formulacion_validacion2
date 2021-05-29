window.addEventListener("resize",anchoPagina());
//Permite refrescar la página cuando se cambia el tamaño
window.addEventListener('resize', (event)=>{location.reload();});

//permite verificar el tamaño de una ventana y ajusta el contenido dependiendo del tamaño
function anchoPagina(){
    if(window.innerWidth>850){
        document.getElementById('inicioSesion').style.display="block";
        document.getElementById('registro').style.display="none";
    } else{
        document.getElementById('uno').style.display="none";
        document.getElementById('inicioSesion').style.display="block";
        document.getElementById("caja__contenedora").style.bottom="100px";
    }
}


//Seleccionar el boton de registro
const boton_registro=document.getElementById('button-register');
boton_registro.addEventListener("click",(event)=>{

    //Evita que al cambiar de inicio de sesion a registro sigan las clases de errores 
    document.getElementById("grupo__correo").classList.remove('formulario__grupo-incorrecto');
    document.getElementById("grupo__password").classList.remove('formulario__grupo-incorrecto');
    document.querySelector(`#grupo__correo i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__password i`).classList.remove('fa-check-circle');
    
    if (window.innerWidth > 850){
        //Agregar display block al elemento con id registro
        const contenedor_registro=document.getElementById('registro');
        contenedor_registro.style.display="block";

        //Mover el contenedor del registro hacia a derecha
        const contenedor_box=document.getElementById("inicio-registro");
        contenedor_box.style.left="300px";
    } else{
        document.getElementById('registro').style.display="block";
        document.getElementById("uno").style.display="block";
        document.getElementById("uno").style.top="90px";
        document.getElementById("uno").style.left="30px";
        document.getElementById("dos").style.display="none";
    }
    
    
})

//Seleccionar el boton de inicio de sesion
const boton_sesion=document.getElementById('button-sesion')
boton_sesion.addEventListener("click",(event)=>{

    if (window.innerWidth > 850){
        //Agregar display block al elemento con id registro
        const contenedor_registro=document.getElementById('registro');
        contenedor_registro.style.display="none";

        //Mover el contenedor del registro hacia a derecha
        const contenedor_box=document.getElementById("inicio-registro");
        contenedor_box.style.left="10px";
    } else{
        document.getElementById('registro').style.display="none";
        document.getElementById("uno").style.display="none";
        document.getElementById("dos").style.top="90px";
        document.getElementById("dos").style.left="30px";
        document.getElementById("registro").style.top="20px";
        document.getElementById("dos").style.display="block";
    }
})







//VALIDACION DE RESULTADOS

const formulario=document.getElementById('formulario__inicio');

//trae un arreglo de todos los inputs que estan adentro del elemento con id formulario
const inputs=document.querySelectorAll('#formulario__inicio input')

const expresiones = {
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

//Verifica que todos los campos estén llenados para poder enviar el formulario. Al llenar 
//alguno pasa a ser true
const campos = {
	password: false,
	correo: false
}


//Esta función toma un elemento e=input y busca target.name (nombre del input)
const validarFormulario=(e)=>{
    switch (e.target.name){
        case "password":
            validarCampo(expresiones.password, e.target,'password');
        break

        case "correo":
            validarCampo(expresiones.correo, e.target,'correo');
        break
    }
}


const validarCampo=(expresion,input,campo)=>{
    if(expresion.test(input.value)){
        //elimina y agrega la clase para marcar correcto e incorrecto el input
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        //elimina y modifica el icono del input
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        //Sirve para decir que un campo se lleno correctamente
        campos[campo]=true;
    }else{
        //Agrega una clase al elemento grupo__usuario con el que se pinta de rojo el recuadro
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        //Sirve para decir que un campo no se lleno incorrectamente
        campos[campo]=false;
    }
}


//Por cada input del arreglo de inputs se ejecuta algo
inputs.forEach((input)=>{
    //Cada que agrega una letra al input ejecuta la función validarFormulario
    //Keyup sirve para que al apretar una letra se valide
    input.addEventListener('keyup', validarFormulario);

    //cuando se teclee algo y se de click en otro lado tambien validará
    input.addEventListener('blur', validarFormulario);
})


//Evita que al hacer click en el botón enviar realice algo (solo para en este ejemplo) 
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    //La constante terminos sirve para leer el check de terminos=> terminos.checked significa checado
    if(campos.password && campos.correo){
        //resetea todos los datos cuando se envíen correctamente
		formulario.reset();

        //Toma todos los elementos .formulario__grupo-correcto y lo elimina
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
    } 
});




