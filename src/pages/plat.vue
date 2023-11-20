<template>
  <div class="q-pa-md center-screen">
    <q-card class="my-card">
      <q-card-section>
        <div class="q-subheading"
             style="margin-bottom: 30px; color:white;">
          <text-weight-bolder><b>Cek Lokasi Plat Kendaraan</b></text-weight-bolder>
        </div>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md row justify-between">
        <q-input color="white" dark v-model="txtAreaCode" :dense="dense" style="width:100vh;max-width:20%;font-size:50px" input-style="text-align: center"/>
        <q-input color="white" dark v-model="txtNumber" :dense="dense" style="width:100vh;max-width:40%;font-size:50px" input-style="text-align: center"/>
        <q-input color="white" dark v-model="txtSubAreaCode" :dense="dense" style="width:100vh;max-width:20%;font-size:50px" input-style="text-align: center"/>
        </q-form>
      </q-card-section>
      <p style="color:white;background-color:grey;margin-top:5px;font-size:20px">23 · 30</p>
    </q-card>
  </div>

  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    />
  </div>
</template>
<style>
  .center-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    background-color : #5E5E5E;
  }

  .my-card {
    width: 100vh;
    max-width: 95%;
    border-style:inset;
    background-color:#000000;
  }
</style>

<script lang="ts">
const columns = [
  { name: 'subAreaCode', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'subAreaName', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]

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
         columns,
      rows,
        txtAreaCode: ref('T'),
        txtNumber: ref('4899'),
        txtSubAreaCode: ref('IKY'),
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
    beforeMount() { },
    mounted() { },
    created() { },
    methods: {
      async copyToClipBoard() {
        await navigator.clipboard.writeText(this.result);
        this.showNotif('🖕 Copied 🖕');
      },
      async posts() {
        var validate = this.validate()
        const body = {
          "sourcePath": this.sourcePath,
          "shortedPath": this.shortedPath,
          "author": this.author
        }
        if (validate == true) {
          document.getElementById("txtResult").style.textDecoration = ""
          this.result = "Wait a moment"

          await this.$axios.post('https://teuku.cyclic.app/short/', body)
            .then((res) => {
              document.getElementById("txtResult").style.textDecoration = "underline"
              this.result = "teuku.my.id/" + res.data.props.shortedPath
              this.result = this.result.replaceAll(" ", "%20")
            }).catch((err) => {
              console.log(err.response.data)
              if (err.response.data.message) {
                this.showNotif('🖕 ' + err.response.data.message + ' 🖕');
                this.result = ""
              } else {
                console.log(err)
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
          sourcePath == "" ? animateCSS('#txtSourcePath', 'shakeX') : ""
          shortedPath == "" ? animateCSS('#txtShortedPath', 'shakeX') : ""
          console.log("sourcePath or shortedPath Cannot Empty")

          return false
        }

        if (/[^a-zA-Z0-9\-\/]/.test(shortedPath)) {
          alert('Input is not alphanumeric');
          return false;
        }
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
