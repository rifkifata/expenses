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
  </div>
</template>

<script>
// carousel
import { ref } from 'vue'
//
import { expenses } from '../repository/database'
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
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      // this.$axios.get('https://jsonplaceholder.typicode.com/posts')
      this.$axios.get('https://api.jsonbin.io/v3/b/6347ed932b3499323bdd1e82')
      // this.$axios.get('./pages/database.json')
        .then((res) => {
          // console.log(res)
          this.posts = res.data.record
          // console.log(res.data.record)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
