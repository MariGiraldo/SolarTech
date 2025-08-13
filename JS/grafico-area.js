(() => {
  // Rutas de los archivos CSV
  const d_9 = "../Recursos/documentacion/Info_general/14_solar-share-energy.csv";
  const d_13 = "../Recursos/documentacion/13_installed-solar-PV-capacity.csv";
  const d_17 = "../Recursos/documentacion/17_installed-geothermal-capacity.csv";

  const archivos = [d_9, d_13, d_17];

  // Función para obtener años del 2011 al 2021
  function year() {
    const limite = 2021;
    let arr = [];
    for (let i = 2011; i <= limite; i++) {
      arr.push(i);
    }
    return arr;
  }

  // Función para cargar datos desde los CSV y devolver arreglos con los valores para cada energía
  async function datos_linea(archivos) {
    let eolica = [];
    let solar = [];
    let geotermica = [];
    let energias = [eolica, solar, geotermica];
    let years = year();

    for (var q = 0; q < archivos.length; q++) {
      const datos = await fetch(archivos[q]);
      const texto = await datos.text();
      const separador = texto.split("\n");
      const cuerpo = separador.slice(1);
      let arreglo = [];
      cuerpo.forEach((separador) => {
        const columnas = separador.split(",");
        arreglo.push(columnas);
      });

      let x = 0;
      while (x != arreglo.length) {
        for (let p = 0; p < years.length; p++) {
          if (arreglo[x][0] == "Spain" && parseInt(arreglo[x][2]) == years[p]) {
            energias[q].push(arreglo[x][3]);
          }
        }
        x++;
      }
    }

    return { eolica, solar, geotermica };
  }

  // Función que dibuja el gráfico de área
  function graficoArea(arr1, arr2, arr3) {
    const ctxArea = document.getElementById("myAreaChart");
    if (!ctxArea) {
      console.error("No existe el canvas con id 'myAreaChart'");
      return;
    }

    if (window.areaChartInstance) {
      window.areaChartInstance.destroy();
    }

    const labelst = ["Eólica", "Solar", "Geotérmica"];
    const titulos = year();

    const valoresSolar = arr1;
    const valoresEolica = arr2;
    const valoreshidrica = arr3;

    const coloresSolar = "rgba(221, 203, 3, 0.5)";
    const coloesEolica = "rgba(142, 127, 127, 0.5)";
    const coloresHidrica = "rgba(64, 0, 255, 0.5)";

    const bordesSolar = "rgba(221, 203, 3, 1)";
    const bordesEolica = "rgba(142, 127, 127, 1)";
    const bordesHidrica = "rgba(64, 0, 255, 1)";

    window.areaChartInstance = new Chart(ctxArea, {
      type: "line",
      data: {
        labels: titulos,
        datasets: [
          {
            label: labelst[0],
            data: valoresSolar,
            backgroundColor: coloresSolar,
            borderColor: bordesSolar,
            borderWidth: 1.5,
            fill: true,
            tension: 0.4,
          },
          {
            label: labelst[1],
            data: valoresEolica,
            backgroundColor: coloesEolica,
            borderColor: bordesEolica,
            borderWidth: 1.5,
            fill: true,
            tension: 0.4,
          },
          {
            label: labelst[2],
            data: valoreshidrica,
            backgroundColor: coloresHidrica,
            borderColor: bordesHidrica,
            borderWidth: 1.5,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const { eolica, solar, geotermica } = await datos_linea(archivos);
    graficoArea(eolica, solar, geotermica);
  });
})();
