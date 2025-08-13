(() => {
  const csvSolar = "../Recursos/documentacion/Info_general/14_solar-share-energy.csv";

  // Función para obtener años 2012-2021
  function years() {
    let arr = [];
    for (let i = 2012; i <= 2021; i++) arr.push(i);
    return arr;
  }

  // Carga los datos del CSV para España
  async function datosBarras() {
    const res = await fetch(csvSolar);
    const text = await res.text();
    const filas = text.split("\n").slice(1); // omite encabezado
    const datos = [];
    const yr = years();

    yr.forEach((anio) => {
      const fila = filas.find(f => f.startsWith("Spain") && parseInt(f.split(",")[2]) === anio);
      if (fila) {
        datos.push(parseFloat(fila.split(",")[3].trim()));
      } else {
        datos.push(0); // Si no hay dato
      }
    });

    return datos;
  }

  function dibujaBarras(valores) {
    const canvas = document.getElementById("solarChart");
    if (!canvas) {
      console.error("No existe el canvas con id 'solarChart'");
      return;
    }
    const ctx = canvas.getContext("2d");

    if (window.solarChartInstance) window.solarChartInstance.destroy();

    const años = years();
    const barColors = [
      'rgba(33, 150, 243, 0.8)',
      'rgba(25, 118, 210, 0.8)',
      'rgba(21, 101, 192, 0.8)',
      'rgba(13, 71, 161, 0.8)',
      'rgba(2, 119, 189, 0.8)',
      'rgba(3, 169, 244, 0.8)',
      'rgba(100, 181, 246, 0.8)',
      'rgba(79, 195, 247, 0.8)',
      'rgba(0, 188, 212, 0.8)',
      'rgba(0, 151, 167, 0.8)'
    ];
    const borderColors = barColors.map(c => c.replace("0.8", "1"));

    window.solarChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: años,
        datasets: [{
          label: "Producción Solar (TWh)",
          data: valores,
          backgroundColor: barColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Producción Solar en España (TWh)",
            color: "#0d47a1",
            font: { size: 16, weight: "bold" }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#0d47a1", font: { weight: "bold" } },
            grid: { color: "#d0e3f0" }
          },
          x: {
            ticks: { color: "#0d47a1", font: { weight: "bold" } },
            grid: { color: "#f0f4f8" }
          }
        }
      }
    });
  }

  // Ejecuta al cargar la página
  document.addEventListener("DOMContentLoaded", async () => {
    const valores = await datosBarras();
    dibujaBarras(valores);
  });
})();
