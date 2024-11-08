document.addEventListener("DOMContentLoaded", () => {
    fetchServicios();
});

async function fetchServicios() {
    try {
        const response = await fetch("http://localhost:8001/servicio/lista"); // URL para obtener servicios
        const servicios = await response.json();
        
        renderServicios(servicios);
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        document.getElementById("servicios-container").innerHTML = "<p>Error al cargar los servicios.</p>";
    }
}

function renderServicios(servicios) {
    const container = document.getElementById("servicios-container");
    container.innerHTML = "";

    servicios.forEach(servicio => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");

        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${servicio.Tratamiento}</h5>
                    <p class="card-text"><strong>Costo:</strong> $${servicio.Costo}</p>
                    <p class="card-text"><strong>Descripción:</strong> ${servicio.Descripcion || "No especificada"}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}
