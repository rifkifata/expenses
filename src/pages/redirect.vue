<template>
  <div class="center-screen">
    <div class="row">
      <div id="coloumn1" class="col-12">
        <div class="q-subheading">{{ sourcePath }}</div>
      </div>
      <div class="col">
        <div id="element1" class="dot-carousel" />
      </div>
    </div>
    <br />
    <div class="q-subheading">Made With {{emoji}} by <a href="https://instagram.com/rifkifata">Teuku</a></div>
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
.dot-carousel {
    position: relative;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #000000;
    color: #000000;
    box-shadow: 9984px 0 0 0 #000000, 9999px 0 0 0 #000000, 10014px 0 0 0 #000000;
    animation: dot-carousel 1.5s infinite linear;
  }

  @keyframes dot-carousel {
    0% {
      box-shadow: 9984px 0 0 -1px #000000, 9999px 0 0 1px #000000, 10014px 0 0 -1px #000000;
    }

    50% {
      box-shadow: 10014px 0 0 -1px #000000, 9984px 0 0 -1px #000000, 9999px 0 0 1px #000000;
    }

    100% {
      box-shadow: 9999px 0 0 1px #000000, 10014px 0 0 -1px #000000, 9984px 0 0 -1px #000000;
    }
  }

  #element1 {
    margin-left: 10px;
    margin-top: 5px;
  }

  #coloumn1 {
      display:none;
  }


</style>
<script lang="ts">
  import 'animate.css';
  const delay = ms => new Promise(res => setTimeout(res, ms));
  export default {
    name: 'PageRedirect',
    setup() {
      return {}
    },
    data() {
      return {
        sourcePath: "",
        emoji: "🖕"

      }
    },
    beforeMount() {
      this.getByKey()
    },
    mounted() {
    },
    created() {

    },
    methods: {
      getParam () {
        let path = location.href.replace(location.origin, '');
        console.log(path);
        return path.replace("/#/", "");
      },

      async getByKey() {
        let param = this.getParam();
        await this.$axios.get(`https://teuku.cyclic.app/short/${param}`)
          .then(async (res) => {
            this.sourcePath = "Redirecting to " + res.data.sourcePath;
            document.getElementById("coloumn1").style.display = "block";

            console.log(res.data.sourcePath);
            await delay(5000);
            window.location.replace(res.data.sourcePath);

            //if 200 but no route handler found
            /*
            if (res.data.msg == "no route handler found") {
              console.log(err)
              await delay(5000);
              document.getElementById("element1").style.display = "none";
              document.getElementById("coloumn1").style.display = "block";
              this.sourcePath = "404 Not Found"
              this.emoji = "🖕"
            }*/
          })
          .catch(async (err) => {
            console.log(err)
            await delay(5000);
            document.getElementById("element1").style.display = "none";
            document.getElementById("coloumn1").style.display = "block";
            this.sourcePath = "404 Not Found"
            this.emoji = "🖕"
          })
      },

    }
  }
</script>
