document.addEventListener("DOMContentLoaded", () => {
    fetchCatalogoPsicologos();
});

let psicologos = []; // Guarda la lista completa de psicólogos

async function fetchCatalogoPsicologos() {
    try {
        const response = await fetch("http://localhost:8001/psicologo/lista");
        psicologos = await response.json(); // Almacena la lista en una variable global
        
        renderCatalogo(psicologos);
    } catch (error) {
        console.error("Error fetching catalog:", error);
        document.getElementById("catalogo-container").innerHTML = "<p>Error al cargar el catálogo.</p>";
    }
}

function renderCatalogo(listaPsicologos) {
    const container = document.getElementById("catalogo-container");
    container.innerHTML = "";

    listaPsicologos.forEach(psicologo => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Asignar imágenes condicionalmente según el nombre del psicólogo
        let imagenSrc;
        if (psicologo.Nombre === "Marco Antonio") {
            imagenSrc = "img/psic1.jpg"; // Imagen específica para Juan
        } else if (psicologo.Nombre === "Ana") {
            imagenSrc = "img/psic2.jpg"; // Imagen específica para Ana
        } else {
            imagenSrc = "img/psic2.jpg"; // Imagen predeterminada
        }

        card.innerHTML = `
            <img src="${imagenSrc}" alt="Foto de ${psicologo.Nombre}" class="psicologo-img">
            <div class="card-content">
                <h3>${psicologo.Nombre} ${psicologo.Apellido_p} ${psicologo.Apellido_m}</h3>
                <p><strong>Especialidad:</strong> ${psicologo.Especialidad || "No especificada"}</p>
                <p><strong>Ubicación:</strong> ${psicologo.Estado}, ${psicologo.Ciudad}, ${psicologo.Colonia}, ${psicologo.Calle} ${psicologo.Numero}</p>
                <p><strong>Teléfono:</strong> ${psicologo.Telefono}</p>
                <p><strong>Correo:</strong> ${psicologo.Correo}</p>
                <p class="descripcion" style="display: none;"><strong>Descripción:</strong> ${psicologo.Descripcion || "Sin descripción"}</p>
                <button class="toggle-description-btn" onclick="toggleDescripcion(this)">Ver más</button>
                <button class="ver-disponibilidad-btn">Ver disponibilidad</button>
            </div>
        `;

        container.appendChild(card);
    });
}


function toggleDescripcion(button) {
    const descripcion = button.previousElementSibling;
    const isHidden = descripcion.style.display === "none";
    
    descripcion.style.display = isHidden ? "block" : "none";
    button.textContent = isHidden ? "Ver menos" : "Ver más";
}

function filtrarPorUbicacion() {
    const ubicacionSeleccionada = document.getElementById("ubicacion-filter").value;
    
    const psicologosFiltrados = ubicacionSeleccionada
        ? psicologos.filter(psicologo => 
              psicologo.Estado.includes(ubicacionSeleccionada) || 
              psicologo.Ciudad.includes(ubicacionSeleccionada))
        : psicologos;

    renderCatalogo(psicologosFiltrados);
}
