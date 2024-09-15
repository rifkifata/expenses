<template>
  <div class="q-pa-md center-screen">
    <q-card class="my-card">
      <q-card-section>
        <div class="q-subheading" style="margin-bottom: 20px; color: white">
          <text-weight-bolder
            ><b>Cek Lokasi Plat Motor dan Mobil</b></text-weight-bolder
          >
        </div>
        <q-form class="q-gutter-md row justify-between">
          <q-input
            class="uppercase"
            color="white"
            dark
            v-model="areaCode"
            for="txtAreaCode"
            style="width: 100vh; max-width: 20%; font-size: 40px"
            input-style="text-align: center"
            maxlength="2"
            @keydown="filterKeyAlphabetOnly"
            @click="activeButton()"
          />
          <q-input
            color="white"
            dark
            v-model="numberOnly"
            for="txtNumber"
            style="width: 100vh; max-width: 40%; font-size: 40px"
            input-style="text-align: center"
            maxlength="4"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            @click="activeButton()"
          />
          <q-input
            class="uppercase"
            color="white"
            dark
            v-model="subAreaCode"
            for="txtSubAreaCode"
            style="width: 100vh; max-width: 20%; font-size: 40px"
            input-style="text-align: center"
            maxlength="3"
            @keydown="filterKeyAlphabetOnly"
            @click="activeButton()"
          />
        </q-form>
      </q-card-section>
      <p
        style="
          color: white;
          background-color: grey;
          margin-top: 5px;
          font-size: 20px;
        "
      >
        {{ txtResult }}
      </p>
    </q-card>

    <q-btn
      class="directions_car"
      id="btnGet"
      ref="myBTN"
      round
      color="black"
      :icon="icons"
      style="margin-top: 10px"
      size="18px"
      @click="getByKey()"
    />
  </div>

  <q-dialog v-model="icon">
    <q-card style="">
      <q-card-section
        class="row items-center q-pb-none"
        style="width: 100vh; max-width: 100%; padding: 0px"
      >
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-table
        style="height: 400px; max-width: 100%"
        flat
        bordered
        :title="title"
        :rows="rows"
        :columns="columns"
        row-key="name"
        dark
        color="amber"
        virtual-scroll
        :virtual-scroll-item-size="48"
        :virtual-scroll-sticky-size-start="48"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        @virtual-scroll="onScroll"
        hide-bottom
      />
    </q-card>
  </q-dialog>
</template>
<style>
.uppercase input {
  text-transform: uppercase;
}

.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  width: 100%;
  background-color: #5e5e5e;
}

.my-card {
  width: 100vh;
  max-width: 95%;
  border-style: inset;
  background-color: #000000;
}
</style>

<script lang="ts">
const title = "";
const columns = [];
const rows = [];

import { useQuasar } from "quasar";
import { ref } from "vue";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "animate.css";
import { matMenu } from "@quasar/extras/material-icons";
import { escapeLeadingUnderscores } from "typescript";

export default {
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    return {
      //txtAreaCode: ref('T'),
      //txtNumber: ref('4899'),
      //txtSubAreaCode: ref('IKY'),
      //txtResult: ref("Loading..."),
      // icons: ref("directions_car"),
      matMenu,
      showNotif(msg) {
        $q.notify({
          message: msg,
        });
      },
    };
  },
  data() {
    return {
      title: "",
      icons: "directions_car",
      columns: [
        {
          name: "subAreaCode",
          label: "Kode",
          field: "subAreaCode",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          align: "center",
        },
        {
          name: "subAreaName",
          label: "Wilayah",
          field: "subAreaName",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          align: "center",
        },
      ],
      rows: [],
      result: "",
      ph: "",
      show: false,
      areaCode: "B",
      numberOnly: "0",
      subAreaCode: "S",
      author: null,
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
      txtResult: "asd",
      n: false,
      icon: false,
    };
  },
  beforeMount() {},
  mounted() {
    this.getTime();
  },
  created() {},
  methods: {
    async getByKey() {
      //call switch function
      //this.switch();
      if (this.n === false) {
        this.txtResult = "Loading ... ";
      }

      const body = {
        areaCode: this.areaCode,
        subAreaCode: this.subAreaCode,
      };
      await this.$axios
        .post("https://cek-lokasi-plat-motor-mobil.vercel.app/plat", body)
        .then((res) => {
          this.title = res.data.areaName;
          this.rows = res.data.subAreaArr;
          this.txtResult = res.data.areaName + " - " + res.data.subAreaName;
          if (this.n === false) {
            //activate expand button
            this.icons = "expand";
            this.n = true;
          } else {
            this.icons = "directions_car";
            this.n = false;
            this.icon = true;
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          this.txtResult = err.response.data.msg;
        });
    },
    filterKeyAlphabetOnly(e) {
      const key = e.key;
      if (/^[a-zA-Z]*$/.test(key) === false) return e.preventDefault();
    },
    filterKeyNumberOnly(e) {
      const key = e.key;
      console.log(key);
      // if (/^[0-9]*$/.test(key) === false) return e.preventDefault();
      // if (key !== "e") return e.preventDefault();
      // e.target.value = e.target.value.replace(/[^0-9]+/g, "");
    },
    filterKey(e) {
      const key = e.key;
      console.log(e);
      // if (/[0-9]/.test(key) === false) return e.preventDefault();
    },
    activeButton() {
      this.icons = "directions_car";
      this.n = false;
    },
    getTime() {
      let a;
      let time;
      //setInterval(() => {
      a = new Date();
      time = a.getHours() + ":" + String(a.getMinutes()).padStart(2, "0");
      //+ ":" +
      //a.getTime();
      this.txtResult = time;
      //}, 1000);
    },

    validate() {
      var sourcePath = this.sourcePath;
      var shortedPath = this.shortedPath;
      var author = this.author;
      if (sourcePath == "" || shortedPath == "") {
        sourcePath == "" ? animateCSS("#txtSourcePath", "shakeX") : "";
        shortedPath == "" ? animateCSS("#txtShortedPath", "shakeX") : "";
        console.log("sourcePath or shortedPath Cannot Empty");

        return false;
      }

      if (/[^a-zA-Z0-9\-\/]/.test(shortedPath)) {
        alert("Input is not alphanumeric");
        return false;
      }
      animateCSS(".arrow_downward", "shakeY");
      return true;
    },
    redirect() {
      var result = this.result;
      if (result.length > 0) {
        window.location.assign("https://" + result);
      }
    },
  },

  //getTime

  //
};
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
</script>
