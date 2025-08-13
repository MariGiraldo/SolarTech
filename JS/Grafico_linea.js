//linea
const d_9 = "../Recursos/documentacion/Info_general/14_solar-share-energy.csv"
const d_13 = "/Recursos/documentacion/13_installed-solar-PV-capacity.csv";
const d_17 = "/Recursos/documentacion/17_installed-geothermal-capacity.csv";

const archivos = [d_9, d_13, d_17]

async function datos_linea(archivos) {

    let eolica = []
    let solar = []
    let geotermica = []

    let energias = [eolica, solar, geotermica]

    let years = year()


    for (var q = 0; q <= archivos.length; q++) {

        if (q != archivos.length) {
            const datos = await fetch(archivos[q])
            const texto = await datos.text()

            const separador = texto.split("\n")
            const cuerpo = separador.slice(1)

            let arreglo = []
            // recorre los datos y los inserta

            cuerpo.forEach((separador) => {
                const columnas = separador.split(",")// esto separa cada columna de cada linea del archivo


                arreglo.push(columnas)

            })


            var x = 0;



            while (x != arreglo.length) {

                for (let p = 0; p < years.length; p++) {

                    if (arreglo[x][0] == "Spain" && parseInt(arreglo[x][2]) == years[p]) {

                        energias[q].push(arreglo[x][3])

                    }

                }



                x++
            }// fin while
        }

    }

    console.log(year[0])

    grafico(eolica, solar, geotermica)
}// fin de la funcióndatos_barra

datos_linea(archivos)

function grafico(arr1, arr2, arr3) {

    const ctx = document.getElementById('myChart')

    const labelst = ['Eólica', 'solar', 'Geotermica']

    const titulos = year()

    /*valores que se le da a cada linea */
    const valoresSolar = arr1
    const valoresEolica = arr2
    const valoreshidrica = arr3

    /*asigna color a cada punto de la linea */
    const coloresSolar = '#ddcb03'
    const coloesEolica = '#8e7f7f'
    const coloresHidrica = '#4000ff'

    /*dibuja la linea de cada valor */
    const bordesSolar = '#ddcb03'
    const bordesEolica = '#8e7f7f'
    const bordesHidrica = '#4000ff'

    const mychart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: titulos,//titulos de cada porcion
            datasets: [{
                label: labelst[0],// valores de cada porcion
                data: valoresSolar,
                backgroundColor: coloresSolar,// da color a las porciones
                borderColor: bordesSolar,
                borderWidth: 1.5
            },
            {
                label: labelst[1],// valores de cada porcion
                data: valoresEolica,
                backgroundColor: coloesEolica,// da color a las porciones
                borderColor: bordesEolica,
                borderWidth: 1.5

            },
            {
                label: labelst[2],// valores de cada porcion
                data: valoreshidrica,
                backgroundColor: coloresHidrica,// da color a las porciones
                borderColor: bordesHidrica,
                borderWidth: 1.5

            }]
        },

        options: {
            responsive: 'true',
            maintainAspectRatio: 'false'
        }
    })

}

function year() {

    const limite = 2021

    let arr = []

    for (let i = 2011; i <= limite; i++) {

        arr.push(i)

    }

    return arr


}