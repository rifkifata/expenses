<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-input outlined v-model="text" hint="ex : www.google.com">
        <template v-slot:append>
          <q-btn round color="purple" icon="navigation" class="rotate-90" id="btnPost" v-on:click="show = !show"/>
        </template>
      </q-input>
    </div>
  </div>
  <q-spinner-orbit color="purple" size="3em"/>
  <div class="q-pa-md" style="max-width: 500px;">
   <transition appear enter-active-class="animated bounceInDown" leave-active-class="animated flipOutY" :duration="1000">
        <a class="text-body2" id="txtResult" href="https://www.youtube.com/" color="red" v-show="show">www.youtube.com</a>
      </transition>
  </div>
</template>

<script lang="ts">

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
import { ref } from 'vue'

export default {
  name: 'PageIndex',
  setup () {
  },
 data () {
    return {
      text: '',
      ph: '',
      dense: false,
      show: false
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  created () {
  },
  methods: {

  }
}
</script>
