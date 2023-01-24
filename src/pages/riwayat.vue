<template>
  <div class="window-height">
    <q-table
      :title="title"
      :rows="posts"
      :columns="columns"
      row-key="key"
      dark
      no-data-label="I didn't find anything for you"
      no-results-label="The filter didn't uncover any results"
      binary-state-sort
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="dr_name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" title="Update name" buttons v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus/>
            </q-popup-edit>
          </q-td>
          <q-td key="diagnose" :props="props">
            {{ props.row.category }}
            <q-popup-edit v-model="props.row.category" title="Update category" buttons v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="medicine_name" :props="props">
            <div class="text-pre-wrap">{{ props.row.type }}</div>
            <q-popup-edit v-model="props.row.type" title="Update type" buttons v-slot="scope">
               <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="specialist" :props="props">
            {{ props.row.price }}
            <q-popup-edit v-model="props.row.price" title="Update price" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="tindakan" :props="props">
            {{ props.row.price }}
            <q-popup-edit v-model="props.row.price" title="Update price" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Well this is sad... {{ message }}
          </span>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-teal text-white" style="width: 120px" align="center">
              <q-btn flat label="SUCCEEDED" v-close-popup/>
          </q-card>
        </q-dialog>

        <div id="date" style="height:100px; width:300px;">
        </div>
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
let dateToday = new Date ()
function getTheDate(getDate) {
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
      columns: [
        {
          name: 'dr_name',
          label: 'dr_name',
          field: 'dr_name',
          align: 'left',
          sortable: true
        },
        {
          name: 'diagnose',
          label: 'diagnose',
          field: 'diagnose',
          align: 'right',
          sortable: true
        },
        {
          name: 'medicine_name',
          label: 'medicine_name',
          field: 'medicine_name',
          align: 'right',
          sortable: true
        },
        {
          name: 'specialist',
          label: 'specialist',
          field: 'specialist',
          align: 'right',
          sortable: true
        },
        {
          name: 'tindakan',
          label: 'tindakan',
          field: 'tindakan',
          align: 'right',
          sortable: true
        }

      ],
      posts: [],
      date: "",
      title: "",
      puts: "",
      data: [],
      persistent: ref(false),
       pagination: {
        rowsPerPage: 0
      }
    }
  },
  beforeMount () {
    this.getAllData()
  },
  mounted () {
    this.getPosts()
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
    }
    },
    formatDate () {
      const yyyy = dateToday.getFullYear()
      let mm = dateToday.getMonth() + 1
      let dd = dateToday.getDate()
      if (dd < 10) dd = '0' + dd
      if (mm < 10) mm = '0' + mm
      return dd + '-' + mm + '-' + yyyy
    }
  }
</script>

