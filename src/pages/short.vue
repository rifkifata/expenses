<template>
  <div class="q-pa-md example-row-all-breakpoints">
    <div class="row items-center">
      <div class="col-2">https:// </div>
      <div class="col-10">
        <q-input outlined v-model="text" label="www.youtube.com" :dense="dense">
          <template v-slot:after>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2">teuku.my.id/</div>
      <div class="col-10">
        <q-input outlined v-model="text" label="ikyganteng" :dense="dense">
          <template v-slot:after>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2">
          <!-- <q-btn round color="purple" icon="navigation" class="square" id="btnPost" /> -->
          <img class="tombol" src="https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg" alt="Quasar Logo" width="48" height="48">
      </div>
      <div class="col-10">
        <q-input outlined v-model="text" hint="Made with Pride by Teuku Rifki Dhulul Fata" :dense="dense" readonly>
        <template v-slot:after>
            <q-icon name="content_copy" @click="text = ''" class="cursor-pointer" />
          </template>
          <template v-slot:hint> Destination </template>
        </q-input>
      </div>
    </div>
    <div class="row item-center">
      <div class="col-2"></div>
      <div class="col10"></div>
    </div>
  </div>



</template>
<style lang="sass">
.example-row-all-breakpoints
  .row > div
  .row + .row
    margin-top: 1rem

#checkbox
  display: yea

.tombol
  transform: rotate(0)
  transition: transform .8s ease-in-out
  transition-property: transform
  transition-duration: 0.8s
  transition-timing-function: ease-in-out
  transition-delay: 0s


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
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBRWZ5eeZ1YpgYTgVqEGpzAS6iTa3elDy0",
    authDomain: "expenses-bae47.firebaseapp.com",
    projectId: "expenses-bae47",
    storageBucket: "expenses-bae47.appspot.com",
    messagingSenderId: "585378571530",
    appId: "1:585378571530:web:3b6a6d83688e3f2000c6f3",
    measurementId: "G-PPRPC8F4ZG"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  // carousel
  import {
    ref
  } from 'vue'
  export default {
    name: 'PageIndex',
    setup() {
      return {}
    },
    data() {
      return {
        text: '',
        ph: '',
        dense: true,
        show: false
      }
    },
    beforeMount() {},
    mounted() {},
    created() {},
    methods: {}
  }
</script>
