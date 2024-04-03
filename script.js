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

  // Obtener y mostrar los datos almacenados al cargar la página
  const nombresGuardados = JSON.parse(localStorage.getItem("nombres"));
  const opcionesGuardadas = JSON.parse(localStorage.getItem("opciones"));

  if (nombresGuardados && opcionesGuardadas) {
    nombreInput.value = nombresGuardados;
    opciones.forEach((opcion, index) => {
      if (opcionesGuardadas.includes(index)) {
        opcion.classList.add("seleccionada");
        resultadosLista.innerHTML += `<li>${nombresGuardados}: Opción ${index + 1}</li>`;
      }
    });
  }

  // Agregar evento al botón Reset
  resetBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
  });

  // Agregar evento a las opciones
  opciones.forEach((opcion, index) => {
    opcion.addEventListener("click", function() {
      const nombre = nombreInput.value;
      if (nombre.trim() === "") {
        alert("Por favor ingrese un nombre antes de seleccionar una opción.");
        return;
      }
      if (!opcion.classList.contains("seleccionada")) {
        opcion.classList.add("seleccionada");
        nombreInput.value = ""; // Limpiar el campo de nombre
        localStorage.setItem("nombres", JSON.stringify(nombre));
        const opcionesGuardadas = JSON.parse(localStorage.getItem("opciones")) || [];
        opcionesGuardadas.push(index);
        localStorage.setItem("opciones", JSON.stringify(opcionesGuardadas));
        resultadosLista.innerHTML += `<li>${nombre}: Opción ${index + 1}</li>`;
      }
    });
  });

  // Habilitar el botón Reset solo si se ingresa "yscm" en el campo de nombre
  nombreInput.addEventListener("input", toggleResetButton);
});
