<template>
  <div class="q-pa-md example-row-all-breakpoints">
    <!-- <div class="q-gutter-y-md column" style="max-width: 1000px"> -->
    <div class="row items-center">
      <div class="col-2 q-mr-xs" align="right">https:// </div>
      <div class="col-10">
        <q-input class="my-element" outlined v-model="sourcePath" for="txtSourcePath" placeholder="www.verylongendpoint.com" :dense="dense">
          <template v-slot:after>
            <q-icon name="close" @click="sourcePath = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2" align="right">teuku.my.id/</div>
      <div class="col-10">
        <q-input outlined v-model="shortedPath" for="txtShortedPath" placeholder="short" :dense="dense">
          <template v-slot:after>
            <q-icon name="close" @click="shortedPath = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2" align="right">Submit By : </div>
      <div class="col-10">
        <q-input outlined v-model="author" for="txtAuthor" placeholder="ikyganteng" :dense="dense">
          <template v-slot:after>
            <q-icon name="close" @click="author = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2" align="right">
        <!--        <q-btn class="rotate-90" round color="black" icon="navigation" onclick="this.style['WebkitTransform'] = 'rotate(' + 180 +'deg)';validate()" /> -->
        <q-btn class="rotate-90" round color="black" icon="navigation" @click="validate()" />

      </div>
      <!-- hint="Made with Pride by Teuku Rifki Dhulul Fata" -->
      <div class="col-10">
        <q-input outlined v-model="result" :dense="dense" readonly>
          <template v-slot:after>
            <q-icon id="txtResult" name="content_copy" @click="copyToClipBoard()" class="cursor-pointer" />
          </template>
          <template v-slot:hint>
            Destination
          </template>
        </q-input>
      </div>
    </div>
    <div class="row item-center">
      <div class="col-2"></div>
      <div class="col10"></div>
    </div>
  </div>
  <!-- </div> -->



</template>
<style>
  .example-row-all-breakpoints {
    margin-top: 1rem;
  }
  
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
        result: '',
        ph: '',
        dense: true,
        show: false,

        sourcePath: "",
        shortedPath: "",
        author: null
      }
    },
    beforeMount() {},
    mounted() {},
    created() {},
    methods: {
      async copyToClipBoard() {
        await navigator.clipboard.writeText(this.result);
      },
      async post() {
        await this.$axios.post('https://teuku.cyclic.app/short/', {
          "sourcePath": this.sourcePath,
          "shortedPath": this.shortedPath,
          "author": this.author
        },{
          headers: {}
        })
          .then((res) => {
            this.result = "teuku.my.id/" + res.data.props.shortedPath
          }).catch((err) => {
            console.log(err.response.data)
            this.result = err.response.data.message
          })
      },
      validate() {
        var sourcePath = this.sourcePath
        var shortedPath = this.shortedPath
        var author = this.author
        var element = document.getElementById('txtSourcePath');
        if (sourcePath == "") {
          animateCSS('#txtSourcePath', 'shakeX');
          console.log("sourcePath Cannot Empty")
        }
        if (shortedPath == "") {
          animateCSS('#txtShortedPath', 'shakeX');
          console.log("shortedPath Cannot Empty")
        }
        return true
      }
    }
  }
  const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
</script>
