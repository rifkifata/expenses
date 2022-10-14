<template>
  <div class="window-height">
    <q-table
          title="Treats"
          :rows="posts"
          :columns="columns"
          row-key="id"
          dark
          color="amber"
          class="col"
        />
        <q-btn @click.stop="getPosts()" color="red" icon="mail" icon-right="send" label="On Left and Right"/>
  </div>
</template>

<script>
// carousel
import { ref } from 'vue'
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
      posts: []
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
    this.getPosts()
  },
  methods: {
    getPosts () {
      this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
        .then((res) => {
          // let theDate = formatDate(new Date(new Date))
          let today = new Date()
          today.setHours(0,0,0,0)
          today = today.toISOString()

          let arr = res.data.record
          this.posts = arr.filter(({ date }) => date === today)
          console.log(this.posts)
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

        })
        .catch((err) => {
          console.log(err)
        })
    }
    //  filterByDate (arr, theDate) {
    //         const filtering = (theDate) => arr.filter(({ updated_date }) => updated_date === theDate)
    //         //console.log(filterByDate(theDate));
    //         //let theDate = '04-08-1999'

    //         return filtering
    //     }
    // get ketika tekan next () date -1 dari yang sekarang
    // dan gausah pake titik bawah itu
    // get ketika tekan left () date +1 dari yang sekarang

    //todo : BIKIN BISA NEXT DI CARAOUSEL
  }
}
</script>
