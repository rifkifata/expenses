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

        <q-btn @click.stop="nextPrevPosts(-1)" color="red" icon="mail" icon-right="send" label="Left"/>
        <q-btn @click.stop="nextPrevPosts(1)" color="red" icon="mail" icon-right="send" label="Right"/>
        <q-btn @click.stop="sendUpdate()" color="red" icon="mail" icon-right="send" label="Send"/>
        <q-btn @click.stop="newRow()" color="red" icon="mail" icon-right="send" label="New Row"/>

        <div id="date" style="height:100px; width:300px;">
        </div>
        <button id="prev">prev</button>
            <button id="next">next</button>
          </div>
</template>

<script lang="ts">
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
function hitApi () {

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
      puts: ""
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
    this.getPosts()
  },
  mounted () {
    this.newRow()
  },
  methods: {
    getPosts () {
      this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
        .then((res) => {
          // let theDate = formatDate(new Date(new Date))
          dateToday.setHours(0,0,0,0)
          let dateTodayISO = dateToday.toISOString()

          this.title = getTheDate(dateToday)
          let arr = res.data.record
          this.posts = arr.filter(({ date }) => date === dateTodayISO)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    nextPrevPosts (n) {
      this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
        .then((res) => {
          dateToday.setDate(dateToday.getDate() + n)
          dateToday.setHours(0,0,0,0)
          let dateTodayISO = dateToday.toISOString()

          this.title = getTheDate(dateToday)
          console.log(this.title)

          let arr = res.data.record
          this.posts = arr.filter(({ date }) => date === dateTodayISO)

          console.log(this.posts)})
        .catch((err) => {
          console.log(err)
        })
    },
    sendUpdate () {
      this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
        .then((res) => {
          let arrOri = res.data.record
          let arrEdit = this.posts
          arrEdit.forEach(element => {
                      const itemIndex = arrOri.findIndex(o => o.trx_id === element.trx_id)
                      if(itemIndex > -1) {
                          arrOri[itemIndex] = element
                      } else {
                          arrOri = arrOri.push(element)
                      }
                  })
          this.posts = arrOri
        })
        .catch((err) => {
          console.log(err)
        })
        this.$axios.put('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82',
          this.posts,
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
    newRow () {
      let arrOri = this.posts

      const ids = arrOri.map(object => {
        return object.trx_id;
      });
      // const max = Math.max(...ids)
      let newObject =  {
        "trx_id": Math.max(...ids),
        "name": "",
        "price": "",
        "date": "2022-10-24T17:00:00.000Z",
        "time": "13.00",
        "is_deleted": 0,
        "created_date": "04-08-1999",
        "updated_date": "05-08-1999",
        "category": "",
        "type": ""
      }
      arrOri.push(newObject)
      this.posts = arrOri
       console.log(this.posts)
       console.log(newObject)

      // this.posts = arrOri.push(newObject)
    }
    // getDate() {
    //   if (!Date.now) {
    //     Date.now = function() {
    //       return new Date().getTime();
    //     }
    //   }
    //   var theDate = Date.now();

    //   document.getElementById('date').innerText = getTheDate(theDate)

    //   //hit prev
    //   document.getElementById('prev').addEventListener("click", function() {
    //     theDate -= 86400000;
    //     document.getElementById('date').innerText = getTheDate(theDate)

    //   })
    //   //hit next
    //   document.getElementById('next').addEventListener("click", function() {
    //     theDate += 86400000;
    //     document.getElementById('date').innerText = getTheDate(theDate)
    //     //getdata
    //     getDataByDate('2022-10-20T17:00:00.000Z')
    //   })



    //   // get for the nextday
    //   function getDataByDate(tanggalTemp){
    //     this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
    //     .then((res) => {
    //       // let theDate = formatDate(new Date(new Date))
    //       let tanggal = new Date(tanggalTemp)
    //       tanggal.setHours(0,0,0,0)
    //       tanggal = tanggal.toISOString()

    //       let arr = res.data.record
    //       this.posts = arr.filter(({ date }) => date === tanggal)

    //       console.log(this.posts)})
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //   }

    // },
    //  filterByDate (arr, theDate) {
    //         const filtering = (theDate) => arr.filter(({ updated_date }) => updated_date === theDate)
    //         //console.log(filterByDate(theDate));
    //         //let theDate = '04-08-1999'

    //         return filtering
    //     }
    // get ketika tekan next () date -1 dari yang sekarang
    // dan gausah pake titik bawah itu
    // get ketika tekan left () date +1 dari yang sekarang

    // todo : BIKIN BISA NEXT DI CARAOUSEL
    // todo : ubahdata itu (put) harus get dlu semuanya -> kirim ke function -> ubah data -> returned data ori + udah d ubah

    //HARUSNYA ADA FUNGSI BARU YANG DIJALANKAN UNTUK GET DATA FULL, TRS TAMPUNG KE VARIABLE GLOBAL
    //VARIABLE INILAH YANG HARUSNYA D OTAK ATIK NTUK EDIT/NEW ROW DLL, BUKANNYA MALAH GET AXIOS BARU.
  }
}
</script>
