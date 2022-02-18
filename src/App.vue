<template>
  <div class="flex flex-row justify-end h-20	"	>
    <button
      class="btn bg-blue-700 font-roboto font-bold text-white py-1 h-9
      px-3 rounded-md btn-primary hover:bg-blue-900 m-1"
      @click="linkHome"
      v-show="showHomeButton"
    >
       Home
    </button>
    <button
      class="btn bg-blue-700 font-roboto font-bold text-white py-1 h-9
      px-3 rounded-md btn-primary hover:bg-blue-900 m-1"
      @click="linkStats"
      v-show="showStatsButton"
    >
       Estadisticas
    </button>
  </div>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/stats">Estadísticas</router-link>
  </div> -->
  <router-view
    @toggleHome="toggleHome"
    @toggleStats="toggleStats"
  />
</template>

<script>
  export default {
    data(){
      return{
        showStatsButton: false,
        showHomeButton: false,
      }
    },
    methods: {
      linkStats(){
        this.$router.push({ name: "Stats" });
      },
      linkHome(){
        this.$router.push({ name: "Home" });
      },
      toggleHome(){
        this.showStatsButton = true
        this.showHomeButton = false
      },
      toggleStats(){
        this.showStatsButton = false
        this.showHomeButton = true
      },
    }
  }
</script>

<style>

</style>
