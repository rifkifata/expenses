<template>
  <div class="q-pa-md center-screen">
    <q-card class="my-card">
      <q-card-section>
        <div class="q-subheading" style="margin-bottom:30px;margin-right:25px">
          <text-weight-bolder>Made With 🖕 by <a href="https://instagram.com/rifkifata">Teuku</a></text-weight-bolder>
        </div>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input outlined v-model="sourcePath" for="txtSourcePath" placeholder="www.verylongendpoint.com/fuckyou" hint="Your Destination Path Here!" :dense="dense">
            <template v-slot:after>
              <q-icon name="close" @click="sourcePath = ''" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input outlined v-model="shortedPath" for="txtShortedPath" placeholder="fuckyou" hint="Will Be : teuku.my.id/fuckyou" :dense="dense">
            <template v-slot:after>
              <q-icon name="close" @click="shortedPath = ''" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input outlined v-model="author" for="txtAuthor" label="By The Name Of" placeholder="Ikyganteng" hint="Not Required" :dense="dense">
            <template v-slot:after>
              <q-icon name="close" @click="author = ''" class="cursor-pointer" />
            </template>
          </q-input>
          <q-btn class="arrow_downward" for="btnSend" round color="black" icon="arrow_downward" @click="posts()" />
          <q-input outlined v-model="result" :dense="dense" readonly>
            <template v-slot:after>
              <q-icon for="txtResult" name="content_copy" @click="copyToClipBoard()" class="cursor-pointer" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>
   
  </div>
</template>
<style>
.center-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
  }
  .my-card {
    width: 100%;
    max-width: 250px;
    border: none;
    border: 2px dotted black;
  }
</style>

<script lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
  // Import the functions you need from the SDKs you need
  import {
    initializeApp
  } from "firebase/app";
  import {
    getAnalytics
  } from "firebase/analytics";
  import 'animate.css';
  import { matMenu } from '@quasar/extras/material-icons'

  export default {
    name: 'PageIndex',
    setup() {
      const $q = useQuasar()
    return {
      matMenu,
      showNotif() {
        $q.notify({
          message: '🖕 Copied 🖕'
        })
      },
     }
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
        this.showNotif();
      },
      async posts() {
        var validate = this.validate()
        if (validate == true){
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
        }

      },
      validate() {
        var sourcePath = this.sourcePath
        var shortedPath = this.shortedPath
        var author = this.author
        if (sourcePath == "" || shortedPath == "") {
          sourcePath == "" ? animateCSS('#txtSourcePath', 'shakeX'):""
          shortedPath == "" ? animateCSS('#txtShortedPath', 'shakeX'):""
          console.log("sourcePath or shortedPath Cannot Empty")
          return false
        }
        animateCSS('.arrow_downward', 'shakeY');
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
