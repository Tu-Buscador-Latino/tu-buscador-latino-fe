<template>
  <form 
    @submit.prevent="eventSearch"
    class="flex justify-center form-search mb-3"
  >
    <div class="my-3 shadow-lg">
      <input
        class="lg:w-96 py-2 px-3 rounded-l-md font-roboto"
        maxlength="128"
        placeholder="Ingrese su búsqueda"
        size="15"
        type="text"
        v-model="toSearch"
      />
      <button
        class="btn bg-blue-700 font-roboto font-bold text-white py-2 px-3 rounded-r-md btn-primary"
      >
        Buscar
      </button>
    </div>
  </form>
  
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Home',
    components: {
      
    },
    data() {
      return{
        eventQueries: {
          toSearch: "",
        },
      }
    },
    methods: {
      eventSearch() {
        console.log(this.toSearch);
        let data = this.getDataFromWiki(this.toSearch)
        console.log(data);
      },
      organizeWikiURL(search){
        let url = "https://en.wikipedia.org/w/api.php"; 

        let params = {
            action: "query",
            list: "search",
            srsearch: search,
            format: "json"
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        return url
      },
      getDataFromWiki: async function(search) {
        try{
          let result = await axios.get(this.organizeWikiURL(search))
          if(result.status == 200)
            return result.data['query']['search'] 
        }
        catch (err){
          console.log(err);
        }
        return null



        // await axios
        //   .get(this.organizeWikiURL(search))
        //   .then((result) => {
        //       console.log(result.data['query']['search']);
        //   })
        //   .catch(() => {
        //     console.log("Error al buscar")
        //   });
      },
    },
  }
</script>
