<template>
  <div class="flex justify-center mt-2 mb-10">
    <h1 class="font-roboto sm:text-7xl text-5xl font-bold text-blue-700">Lo más buscado</h1>
  </div>
  <div class="w-screen xl:w-8/12 mt-20 mb-52 px-4 mx-auto">
    <div class="block w-full overflow-x-auto">
      <form 
        @submit.prevent="getStats"
        class="flex justify-center form-search mb-3"
      >
        <div class="mt-3 mb-10">
          <label for="amount" class="mr-5 font-roboto font-medium text-lg text-blue-700">
            ¿Cuantas palabras desea ver?
          </label>
          <input
            class="sm:w-20 py-2 px-3 rounded-l-md font-roboto focus:outline-none 
            focus:ring-blue-500 focus:ring-2 shadow-lg"
            maxlength="128"
            placeholder="Ingrese su búsqueda"
            size="15"
            type="number"
            v-model="numberWords"
            id="amount"
          />
          <button
            class="btn bg-blue-700 font-roboto font-bold text-white py-2 
            px-3 rounded-r-md btn-primary hover:bg-blue-900"
          >
            Ver
          </button>
        </div>
      </form>
      <table class="items-center w-full border-collapse">
        <thead>
          <tr>
            <th
              class="bg-blue-700 px-6 text-white font-bold font-roboto align-middle 
              border border-solid py-3 uppercase border-l-1 border-r-1 text-left"
            >
              Palabras
            </th>
            <th
             class="bg-blue-700 px-6 text-white font-bold font-roboto align-middle 
              border border-solid py-3 uppercase border-l-1 border-r-1 text-left"
            >
              Total Consultas
            </th>
            <th
             class="bg-blue-700 px-6 text-white font-bold font-roboto align-middle 
              border border-solid py-3 uppercase border-l-1 border-r-1 text-left"
            >
              Primera Consulta
            </th>
            <th
             class="bg-blue-700 px-6 text-white font-bold font-roboto align-middle 
              border border-solid py-3 uppercase border-l-1 border-r-1 text-left"
            >
              Ultima consulta
            </th>
            <th
             class="bg-blue-700 px-6 text-white font-bold font-roboto align-middle 
              border border-solid py-3 uppercase border-l-1 border-r-1 text-left"
            >
              Resultados recientes
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="search in statsList" :key="search.id">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0
              whitespace-nowrap p-4 text-left"
            >
              {{ search.word }}
            </th>
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0
              whitespace-nowrap p-4 text-left"
            >
              {{ search.count }}
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0
              whitespace-nowrap p-4 text-left"
            >
              {{ formatDate(search.start_date) }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0
              whitespace-nowrap p-4 text-left"
            >
              {{ formatDate(search.last_date) }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0
              whitespace-nowrap p-4 text-left"
            >
              {{ search.last_results }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-5 mb-3 flex justify-center">
        <button
              class="btn bg-blue-700 font-roboto font-bold text-white py-2
              px-3 rounded-md btn-primary hover:bg-blue-900"
              @click="generatePdfReport"
            >
              Generar Reporte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { DateTime } from "luxon";
  import { jsPDF } from "jspdf";
  const urlStatsBase = "http://127.0.0.1:8000/search/stats/?max="

  export default {
    name: 'Stats',
    data(){
      return{
        numberWords: 5,
        statsList: []
      }
    },
    methods: {
      getStats(){
        const url = urlStatsBase + this.numberWords.toString();
        axios
          .get(url)
          .then((result) => {
            console.log(result.data);
            this.statsList = result.data;
          })
          .catch(() => {
            console.log('Error getting stats');
          });
      },
      formatDate(dateIso){
        if(dateIso == "")
          return "";

        const date = DateTime
          .fromISO(dateIso)
          .toLocaleString(
            DateTime.DATETIME_SHORT
          );
        return date;
      },
      generatePdfReport(){
        const doc = new jsPDF();

        const headers = ["word", 
                         "count", 
                         "start_date", 
                         "last_date", 
                         "last_results"]

        let rows = this.statsList.map(obj => {
          return {
            word: obj.word,
            count: obj.count.toString(),
            start_date: this.formatDate(obj.start_date),
            last_date: this.formatDate(obj.last_date),
            last_results: obj.last_results.toString()
          };
        })
        const currentTime = DateTime.now().toLocaleString(
                            DateTime.DATETIME_SHORT)
        // Organize PDF
        doc.setFontSize(20)
        doc.text("Tu Buscador Latino", 60, 10)
        doc.setFontSize(13)
        doc.text("Las palabras mas buscadas", 10, 20)
        doc.text("Hora: " + currentTime, 10, 30)
        doc.table(10, 40, rows, headers)
        doc.save("statsReport.pdf");
      },
    },
    created() {
        this.$emit("toggleStats");
        this.getStats();
    },
  }
</script>