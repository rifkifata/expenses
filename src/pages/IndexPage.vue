<template>
  <div class="window-height">
    <q-table
          :title="title"
          :rows="posts"
          :columns="columns"
          row-key="id"
          dark
          color="amber"
          class="col"
        />

    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="id"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit v-model="props.row.calories" title="Update calories" buttons v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
            <q-popup-edit v-model="props.row.fat" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit v-model="props.row.carbs" title="Update carbs" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
        </q-tr>
      </template>
    </q-table>

        <q-btn @click.stop="prevPosts()" color="red" icon="mail" icon-right="send" label="Left"/>
        <q-btn @click.stop="nextPosts()" color="red" icon="mail" icon-right="send" label="Right"/>
        <div id="date" style="height:100px; width:300px;">
        </div>
        <button id="prev">prev</button>
            <button id="next">next</button>
          </div>
</template>

<script>
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
      title: ""
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
    //this.getDate()
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
          // let date = new Date();
          // add a day
          // date.setDate(date.getDate() + -1);
          // console.log(date.toLocaleDateString('id'))
          // const data = res.data.record

          // const groups = data.reduce((groups, game) => {
          //   const date = game.date.split('T')[0]
          //   if (!groups[date]) {
          //     groups[date] = []
          //   }
          //   groups[date].push(game)
          //   return groups
          // }, {})

          // const groupArrays = Object.keys(groups).map((date) => {
          //   return {
          //     date,
          //     games: groups[date]
          //   }
          // })

          // console.log(groupArrays)
          // let arr = res.data.record
          // console.log(arr[0].date)
          // const aquaticCreatures =  filtered.filter(function(filtered) {
          //   return filtered.date == "Ocean";
          // });

          // const filterByExpiration = (selectedDate) => arr.filter(({ updated_date }) => new Date(updated_date) <= new Date(selectedDate));

        })
        .catch((err) => {
          console.log(err)
        })
    },
    nextPosts () {
      this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
        .then((res) => {
          dateToday.setDate(dateToday.getDate() + 1)
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
    prevPosts () {
      this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
        .then((res) => {
          dateToday.setDate(dateToday.getDate() - 1)
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
  }
}
</script>
