// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if (!localStorage.jwt) {
  location.replace('./index.html');
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const urlTareas = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
  const urlUsuario = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe'
  const token = JSON.parse(localStorage.jwt);

  const formCrearTarea = document.querySelector('.nueva-tarea');
  const nuevaTarea = document.querySelector('#nuevaTarea');
  const btnCerrarSesion = document.querySelector('#closeApp');

  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    const cerrarSesion = confirm("¿Desea cerrar sesión?");
    if (cerrarSesion) {
      //limpiamos el localstorage y redireccioamos a login
      localStorage.clear();
      location.replace('./index.html');
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: 'GET',
      headers: {
        authorization: token
      }
  };
  console.log("Consultando mi usuario...");
  fetch(urlUsuario,settings)
  .then(response => response.json())
  .then(data=>{
    console.log("Nombre de usuario:");
    console.log(data.firstName);
    const nombreUsuario = document.querySelector('.user-info p');
    nombreUsuario.innerText = data.firstName;
  })
  .catch(error => console.log(error));
  };

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: 'GET',
      headers: {
        authorization: token
      }
  };
  console.log("Consultando mis tareas...");
  fetch(urlTareas, settings)
  .then(response => response.json())
  .then(tareas => {
    console.log("Tareas del usuario");
    console.table(tareas);
  
    renderizarTareas(tareas);
    botonesCambioEstado();
    botonBorrarTarea();
  })
  .catch(error => console.log(error));
  };

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();
    const payload = {
      description: nuevaTarea.value,
      completed: false, 
    };
    const settings = {
      method: 'POST',
      headers: {
        authorization: token ,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }
    fetch(urlTareas, settings)
    .then(response => response.json())
    .then(tareas => {
      console.log(tareas);
    //  renderizarTareas();
  })
  .catch(error => console.log(error));
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {







  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});