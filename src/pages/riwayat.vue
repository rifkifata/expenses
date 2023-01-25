<template>
  <!-- q-card -->
  <div class="q-pa-md row justify-center items-start q-gutter-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6 text-center">Hai, Kamu Apakabar?</div>
        <div class="text-subtitle3 text-center">Semoga baik-baik saja, jangan seperti aku ya :D</div>
        <div class="text-subtitle3 text-center">Laman ini dibuat atas dasar ketakutan hamba akan amnesia permanent.</div>
      </q-card-section>
    </q-card>
  </div>
  <!-- table -->
  <div class="window-width">
    <q-table
      :title="title"
      :rows="data"
      :columns="columns"
      row-key="key"
      dark
      no-data-label="Tunggu dikit"
      no-results-label="The filter didn't uncover any results"
      binary-state-sort
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="dr_name" :props="props">
            {{ props.row.dr_name }}
          </q-td>
          <q-td key="diagnose" :props="props">
            {{ props.row.diagnose }}
          </q-td>
          <q-td key="medicine_name" :props="props">
            <li v-for="(medicine_name, index) in props.row.medicine_name" :key="index">{{ medicine_name }}</li>
          </q-td>
          <q-td key="specialist" :props="props">
            {{ props.row.specialist }}
          </q-td>
          <q-td key="tindakan" :props="props">
            {{ props.row.tindakan }}
          </q-td>
          <q-td key="updatedAt" :props="props">
            {{ props.row.updatedAt }}
          </q-td>
          <q-td key="hospital" :props="props">
            {{ props.row.hospital }}
          </q-td>
          <q-td key="etc" :props="props">
            {{ props.row.etc }}
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon, message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Sabar napa,,,, {{ message }}
          </span>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 120px" align="center">
          <q-btn flat label="SUCCEEDED" v-close-popup/>
      </q-card>
    </q-dialog>

  </div>
<!-- q-card footer -->
<div class="q-pa-md row justify-center items-start q-gutter-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">{{titlefooter}}</div>
        <div class="text-subtitle3">
          <ul id="example-1">
            <li v-for="item in gejala">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="text-subtitle3">{{ story }}</div>
      </q-card-section>
    </q-card>
  </div>
<!-- popup -->
<div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6" id="textJame">Hy, Kalo mau liat full, Kenalan dulu dong</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Buka" v-close-popup :disabled="!address" @click="onSubmit(address)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { stringToByteArray } from "@firebase/util";
let dateToday = new Date ()
function getTheDate(getDate: string | number | Date) {
            var days = ["Sun", "Mon", "Tue",
              "Wed", "Thu", "Fri", "Sat"
            ];
            var months = ["January", "February", "March",
              "April", "May", "June", "July", "August",
              "September", "October", "November", "December"
            ];
            var theCDate = new Date(getDate);
            return days[theCDate.getDay()] + ', ' + theCDate.getDate() + ' ' + months[theCDate.getMonth()] + ' ' + theCDate.getFullYear();
          }
// import { expenses } from '../repository/database'
export default {
  name: 'PageIndex',
  data () {
    return {
      address: "",
      prompt: ref(true),
      columns: [
        {
          name: 'dr_name',
          label: 'Nama Dokter',
          field: 'dr_name',
          align: 'left',
          sortable: true
        },
        {
          name: 'diagnose',
          label: 'Diagnosa',
          field: 'diagnose',
          align: 'left',
          sortable: true
        },
        {
          name: 'medicine_name',
          label: 'Nama Obat',
          field: 'medicine_name',
          align: 'left',
          sortable: true
        },
        {
          name: 'specialist',
          label: 'Specialist',
          field: 'specialist',
          align: 'left',
          sortable: true
        },
        {
          name: 'tindakan',
          label: 'Tindakan',
          field: 'tindakan',
          align: 'left',
          sortable: true
        },
        {
          name: 'updatedAt',
          label: 'Waktu Kunjung',
          field: 'Waktu Kunjung',
          align: 'left',
          sortable: true
        },
        {
          name: 'hospital',
          label: 'Hospital',
          field: 'hospital',
          align: 'left',
          sortable: true
        },
        {
          name: 'etc',
          label: 'etc...',
          field: 'etc',
          align: 'left',
          sortable: true
        }
      ],
      posts: [],
      date: "",
      title: "Rekam Medik",
      puts: "",
      data: [],
      persistent: ref(false),
       pagination: {
        rowsPerPage: 0
      },
      titlefooter : "",
      story:"",
      gejala:""
    }
  },
  beforeMount () {
    this.getAllData()
  },
  mounted () {
    this.getFooter()
  },
  created () {},
  methods: {
    //function connecting axios to API bin
      async getAllData () {
        await this.$axios.get('https://tan-colorful-snail.cyclic.app/getall/riwayat/')
          .then((res) => {
            this.data = res.data.results

            })
          .catch((err) => {
            console.log(err)
          })
      },
      async getFooter () {
        await this.$axios.get('https://tan-colorful-snail.cyclic.app/getbykey/gejala/63d0e22627f1c35e7e36ee2f')
          .then((res) => {
            this.titlefooter = res.data.judul,
            this.story = res.data.story,
            this.gejala = res.data.gejala
            })
          .catch((err) => {
            console.log(err)
          })
      },
        async onSubmit(address){
          try{
            await this.$axios.post('https://tan-colorful-snail.cyclic.app/tamu', {
              "name" : address
            },{
                    headers : {}})
                    .then((res) => {
                    console.log(res)
                  }).catch((err)=> {
                    console.log(err)
                  })
          } catch(err){
          }

        },
    }
  }
</script>

