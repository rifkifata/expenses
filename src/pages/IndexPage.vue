<template>
  <div class="window-height">
    <q-table
      :title="title"
      :rows="posts"
      :columns="columns"
      row-key="id"
      dark
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" title="Update name" buttons v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus/>
            </q-popup-edit>
          </q-td>
          <q-td key="category" :props="props">
            {{ props.row.category }}
            <q-popup-edit v-model="props.row.category" title="Update category" buttons v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="type" :props="props">
            <div class="text-pre-wrap">{{ props.row.type }}</div>
            <q-popup-edit v-model="props.row.type" title="Update type" buttons v-slot="scope">
               <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
            <q-popup-edit v-model="props.row.price" title="Update price" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-teal text-white" style="width: 120px" align="center">
              <q-btn flat label="SUCCEEDED" v-close-popup/>
          </q-card>
        </q-dialog>

        <q-btn @click.stop="nextPrevPosts(-1)" color="red" icon="mail" icon-right="send" label="Left"/>
        <q-btn @click.stop="nextPrevPosts(1)" color="red" icon="mail" icon-right="send" label="Right"/>
        <q-btn @click.stop="sendUpdateData()" color="red" icon="mail" icon-right="send" label="Send"/>
        <q-btn @click.stop="newRow()" color="red" icon="mail" icon-right="send" label="New Row"/>

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
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'category',
          label: 'Category',
          field: 'category',
          align: 'right',
          sortable: true
        },
        {
          name: 'type',
          label: 'Debit/Kredit',
          field: 'type',
          align: 'right',
          sortable: true
        },
        {
          name: 'price',
          label: 'Price',
          field: 'price',
          align: 'right',
          sortable: true
        }

      ],
      posts: [],
      date: "",
      title: "",
      puts: "",
      data: [],
      persistent: ref(false)
      // carousel
      // controlType: ref('outline'),
      // controlTypeOptions: [
      //   { value: 'regular', label: 'regular' },
      //   { value: 'unelevated', label: 'unelevated' },
      //   { value: 'flat', label: 'flat (default)' },
      //   { value: 'outline', label: 'outline' },
      //   { value: 'push', label: 'push' }
      // ],

      // slide: ref('style'),
      // lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
      // Table
      // separator: ref('none')
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
      await this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
        .then((res) => {
          this.data = res.data.record
          })
        .catch((err) => {
          console.log(err)
        })
    },
    async updateData (arr) {
      await this.$axios.put('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82',
          arr,
        {
          headers : {
          'Content-Type' : 'application/json',
          'X-Master-Key'  : '$2b$10$qfhZvw7jnDo4msI1o/t8kuKntlVp6/tqS/FqNi659LVbmLOxfsm9u'
        }})
          .then((res) => {
          console.log(res)
        }).catch((err)=> {
          console.log(err)
        })
    },

    //utils Function
    async getPosts () {
      dateToday.setHours(0,0,0,0)
      let dateTodayISO = dateToday.toISOString()
      this.title = getTheDate(dateToday)
      await this.getAllData()
      let arr = this.data
      this.posts = arr.filter(({ date }) => date === dateTodayISO)
      this.date = this.sumToday(this.posts)
    },
    nextPrevPosts (n) {
        dateToday.setDate(dateToday.getDate() + n)
        dateToday.setHours(0,0,0,0)
        let dateTodayISO = dateToday.toISOString()
        this.title = getTheDate(dateToday)
        let arr = this.data
        this.posts = arr.filter(({ date }) => date === dateTodayISO)
    },
    async sendUpdateData () {
        let arrOri = this.data
        let arrEdit = this.posts
        arrEdit.forEach(element => {
                    const itemIndex = arrOri.findIndex(o => o.trx_id === element.trx_id)
                    if(itemIndex > -1) {
                        arrOri[itemIndex] = element
                    } else {
                        arrOri = arrOri.push(element)
                    }
                })
        this.data = arrOri
        await this.updateData(this.data)
        this.persistent = true
    },
    async newRow () {
      let arrOri = await this.data
      let arrEdit = await this.posts
      //format Date
      let dateTodayISO = dateToday.toISOString()

      //grouping the trx_id
      const ids = arrOri.map(object => {
        return object.trx_id
      })

      let newObject =  {
        "trx_id": Math.max(...ids) + 1,
        "name": "",
        "price": "",
        "date": dateTodayISO,
        "is_deleted": 0,
        "created_date": this.formatDate(),
        "category": "Primary",
        "type": "Debit"
      }
      arrOri.push(newObject)
      arrEdit.push(newObject)

      this.data = arrOri
      this.posts = arrEdit
    },
    formatDate () {
      const yyyy = dateToday.getFullYear()
      let mm = dateToday.getMonth() + 1
      let dd = dateToday.getDate()
      if (dd < 10) dd = '0' + dd
      if (mm < 10) mm = '0' + mm
      return dd + '-' + mm + '-' + yyyy
    },
    total() {

    },
    sumToday(arr) {
      let totalPrice = arr.reduce((accum,item) => accum + parseInt(item.price), 0)
      return totalPrice = totalPrice.toString()
    }

    // todo : BIKIN BISA NEXT DI CARAOUSEL
    //HARUSNYA ADA FUNGSI BARU YANG DIJALANKAN UNTUK GET DATA FULL, TRS TAMPUNG KE VARIABLE GLOBAL
    //VARIABLE INILAH YANG HARUSNYA D OTAK ATIK NTUK EDIT/NEW ROW DLL, BUKANNYA MALAH GET AXIOS BARU.
    //TODO: Updated Date!
    //TODO: TOTAL SUM / day!

  }
}
</script>
