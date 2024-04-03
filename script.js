document.addEventListener("DOMContentLoaded", function() {
  const nombreInput = document.getElementById("nombreInput");
  const opciones = document.querySelectorAll(".opcion");
  const resultadosLista = document.getElementById("resultadosLista");
  const resetBtn = document.getElementById("resetBtn");

  // Función para habilitar o deshabilitar el botón Reset
  function toggleResetButton() {
    resetBtn.disabled = (nombreInput.value.toLowerCase() !== "yscm");
  }

  // Al cargar la página, el botón Reset está bloqueado
  toggleResetButton();

  // Agregar evento al botón Reset
  resetBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
  });

  // Obtener opciones seleccionadas desde localStorage
  const opcionesGuardadas = JSON.parse(localStorage.getItem("opciones")) || [];
  const resultadosGuardados = JSON.parse(localStorage.getItem("resultados")) || [];

  // Agregar evento a las opciones
  opciones.forEach((opcion, index) => {
    // Desactivar opción si ya ha sido seleccionada
    if (opcionesGuardadas.includes(index)) {
      opcion.classList.add("seleccionada");
      opcion.removeEventListener("click", seleccionarOpcion);
    } else {
      opcion.addEventListener("click", seleccionarOpcion);
    }
  });

  // Función para seleccionar una opción
  function seleccionarOpcion() {
    const nombre = nombreInput.value.trim(); // Obtener el nombre y eliminar espacios en blanco
    if (nombre === "") {
      alert("Por favor, ingrese un nombre antes de seleccionar una opción."); // Mostrar alerta de error
      return;
    }
    const index = Array.from(opciones).indexOf(this); // Obtener el índice de la opción seleccionada
    if (!this.classList.contains("seleccionada")) {
      this.classList.add("seleccionada");
      nombreInput.value = ""; // Limpiar el campo de nombre
      const bloque = document.createElement("div"); // Crear un nuevo bloque
      bloque.classList.add("resultado-bloque"); // Agregar clase al bloque
      bloque.textContent = `${nombre}: Opción ${index + 1}`; // Establecer el texto del bloque
      resultadosLista.appendChild(bloque); // Agregar bloque a la lista de resultados
      // Almacenar el nombre y la opción seleccionada en localStorage
      const resultadosGuardados = JSON.parse(localStorage.getItem("resultados")) || [];
      resultadosGuardados.push({ nombre, opcion: index + 1 });
      localStorage.setItem("resultados", JSON.stringify(resultadosGuardados));
      // Desactivar el evento click para esta opción
      this.removeEventListener("click", seleccionarOpcion);
      // Almacenar la opción seleccionada en localStorage
      const opcionesGuardadas = JSON.parse(localStorage.getItem("opciones")) || [];
      opcionesGuardadas.push(index);
      localStorage.setItem("opciones", JSON.stringify(opcionesGuardadas));
    }
  }

  // Cargar opciones seleccionadas al cargar la página
  opcionesGuardadas.forEach(index => {
    opciones[index].classList.add("seleccionada");
  });

  // Mostrar resultados guardados al cargar la página
  resultadosGuardados.forEach(resultado => {
    const bloque = document.createElement("div");
    bloque.classList.add("resultado-bloque");
    bloque.textContent = `${resultado.nombre}: Opción ${resultado.opcion}`;
    resultadosLista.appendChild(bloque);
  });

  // Función para habilitar el botón Reset solo si se ingresa "yscm" en el campo de nombre
  nombreInput.addEventListener("input", toggleResetButton);
});

