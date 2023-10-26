<template>
  <div class="q-pa-md center-screen">
    <q-card class="my-card">
      <q-card-section>
        <div class="q-subheading" style="margin-right:25px;margin-bottom:30px">
          <text-weight-bolder>Just an Abnormal<br><b>ShortLink Generator</b></text-weight-bolder>
        </div>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input outlined v-model="sourcePath" for="txtSourcePath" placeholder="www.longurl.com/url" hint="Your Destination Path Here!" :dense="dense">
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
          <q-btn class="arrow_downward" for="btnSend" round color="black" icon="arrow_downward" @click="posts() " />
          <!--<div><q-spinner-pie for="btnLoading" color="black" size="3em" style="display: none"/></div>-->
          <q-input outlined v-model="result" for="txtResult" :dense="dense" readonly @click="redirect()">
            <template v-slot:after>
              <q-icon name="content_copy" @click="copyToClipBoard()" class="cursor-pointer" />
            </template>
          </q-input>
        <div class="q-subheading" style="margin-right:25px">
          <text-weight-bolder>Made With 🖕 by <a href="https://instagram.com/rifkifata">Teuku</a></text-weight-bolder>
        </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
  <!-- Disable Special Character -->
</template>
<style>
.center-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    width: 100%;
  }
  .my-card {
    width:100vh;
    min-width : 50vh;
    max-width: 100%;
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
import { escapeLeadingUnderscores } from 'typescript';

  export default {
    name: 'PageIndex',
    setup() {
      const $q = useQuasar()
    return {
      matMenu,
      showNotif(msg) {
        $q.notify({
          message: msg
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
        this.showNotif('🖕 Copied 🖕');
      },
      async posts() {
        var validate = this.validate()
        if (validate == true) {
          document.getElementById("txtResult").style.textDecoration = ""
          this.result = "Wait a moment"
        await this.$axios.post('https://teuku.cyclic.app/short/', {
          "sourcePath": this.sourcePath,
          "shortedPath": this.shortedPath,
          "author": this.author
        })
          .then((res) => {
            document.getElementById("txtResult").style.textDecoration = "underline"
            this.result = "teuku.my.id/" + res.data.props.shortedPath
            this.result = this.result.replaceAll(" ","%20")
          }).catch((err) => {
            console.log(err.response.data)
            if (err.response.data.message) {
              this.showNotif('🖕 ' + err.response.data.message + ' 🖕');
              this.result = ""
            } else {
              this.showNotif('🖕 Be Patient & Try Again 🖕');
              this.result = ""
            }
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

      if( /[^a-zA-Z0-9\-\/]/.test( shortedPath ) ) {
          alert('Input is not alphanumeric');
          return false;
      }


    return true;

        animateCSS('.arrow_downward', 'shakeY');
        return true
      },
      redirect() {
        var result = this.result;
        if (result.length > 0) {
          window.location.assign("https://" + result)
        }
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
