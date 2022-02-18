<template>
  <div class="flex justify-center my-14">
    <h1 class="sm:text-8xl text-5xl font-bold text-blue-700">Tu Buscador</h1>
    <p class="font-semibold text-blue-500 text-sm sm:text-xl">Latino</p>
  </div>

  <form 
    @submit.prevent="eventSearch"
    class="flex justify-center form-search mb-3"
  >
    <div class="mt-3 mb-10 shadow-lg">
      <input
        class="sm:w-96 py-2 px-3 rounded-l-md font-roboto focus:outline-none 
        focus:ring-blue-500 focus:ring-2"
        maxlength="128"
        placeholder="Ingrese su búsqueda"
        size="15"
        type="text"
        v-model="toSearch"
      />
      <button
        class="btn bg-blue-700 font-roboto font-bold text-white py-2 
        px-3 rounded-r-md btn-primary hover:bg-blue-900"
      >
        Buscar
      </button>
    </div>
  </form>
  
  <div v-if="showNotFoundMsg" class="flex justify-center">
    <p class="font-medium	">No se encontraron resultados</p>
  </div>

  <div>
    <result-card
      v-for="result in results"
      :result="result"
      :key="result.pageid"
    />
  </div>

</template>

<script>
  const { convert } = require('html-to-text');
  import axios from "axios";
  import ResultCard from "../components/ResultCard.vue";

  export default {
    name: 'Home',
    components: {
      ResultCard,
    },
    data() {
      return {
        toSearch: "",
        results: [],
        showNotFoundMsg: false,
      };
    },
    methods: {
      async eventSearch() {
        if(!this.toSearch)
          return;

        let results = await this.getDataFromWiki(this.toSearch);
        
        // Validate results
        if(!results || !results.length){
          this.results = [];
          this.showNotFoundMsg = true;
          return;
        }
        this.showNotFoundMsg = false

        // Convert snipped to plain text
        this.results = results.map(function(obj){
          obj.snippet = convert(obj.snippet, {
            wordwrap: 130
          });
          return obj;
        })
      },
      organizeWikiURL(search){
        let url = "https://en.wikipedia.org/w/api.php"; 

        let params = {
            action: "query",
            list: "search",
            srsearch: search,
            format: "json",
            srprop: "snippet",
            srlimit: "20"
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        return url;
      },
      async getDataFromWiki(search) {
        try{
          let response = await axios.get(this.organizeWikiURL(search));
          if(response.status == 200)
            return response.data['query']['search']; 
        }
        catch (err){
          console.log(err);
        }
        return null
      },
    },
    created() {
      this.$emit("toggleHome");
    },
  };
</script>
