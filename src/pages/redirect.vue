<template>
<h1>ygygyg</h1>
</template>
<style>

</style>
<script lang="ts">
  // Import the functions you need from the SDKs you need
  import {
    initializeApp
  } from "firebase/app";
  import {
    getAnalytics
  } from "firebase/analytics";
  import 'animate.css';

  import {
    ref
  } from 'vue'
  export default {
    name: 'PageRedirect',
    setup() {
      return {}
    },
    data() {
      return {

      }
    },
    beforeMount() {
      this.redirect()
    },
    mounted() {
    },
    created() {

    },
    methods: {
      getParam () {
        let path = location.href.replace(location.origin, '');
        return path.replaceAll("/#/","");
      },
      async getbykey () {
        await this.$axios.get(`https://teuku.cyclic.app/short/ ${this.getParam()}`)
          .then((res) => {
            return res.data.sourcePath
            })
          .catch((err) => {
            console.log(err)
          })
      },
      async redirect() {
            await location.href=getbykey();
         }
    }
  }
</script>
