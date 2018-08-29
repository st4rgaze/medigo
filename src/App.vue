<template>
  <v-app>
    <v-toolbar extended color="white">
      <v-btn flat icon @click="back">
        <v-icon color="#BABABA">arrow_back</v-icon>
      </v-btn>
      <v-layout align-left justify-center column>
        <div>
          <span class="navbar-subtitle">{{ metaTitle }} di sekitar</span>
        </div>
        <div class="location-col">
          <span class="navbar-location">
            Jakarta Selatan
          </span>
          <v-icon>expand_more</v-icon>
        </div>
      </v-layout>
      <v-layout align-center justify-space-between row slot="extension" v-if="['Pusat Kesehatan', 'register'].indexOf($route.name)">
        <v-chip color="secondary" text-color="primary">Lihat semua</v-chip>
        <v-chip color="white" text-color="primary">Buka 24 jam</v-chip>
        <v-chip color="white" text-color="primary">Terima BPJS</v-chip>
      </v-layout>

      <v-layout align-center justify-space-between row slot="extension" v-if="['Rumah sakit', 'register'].indexOf($route.name)">
        <!-- <v-form> -->
        <v-text-field
            v-model="keywords"
            placeholder="Cari rumah sakit, klinik, apotek..."
            prepend-icon="search"
            @click:prepend="search"
            @keyup.enter="search"
            @keyup.delete="search"
            hide-details
          ></v-text-field>
          <!-- </v-form> -->
      </v-layout>
      <v-spacer></v-spacer>

    <v-btn icon to="filter" v-if="['Pusat Kesehatan', 'register'].indexOf($route.name)">
      <v-icon color="primary">search</v-icon>
    </v-btn>
  </v-toolbar>
    <v-content>
      <div class="container" v-if="searching == 1">
      <v-layout column align-center>
        <v-card href="#" width="100%" v-for="hospital in results" :key="hospital.id" class="mb-1"
        >
         <v-card-title primary-title>
           <v-layout column>
            <v-layout align-center justify-space-between row>
              <div>
                <h6 class="headline">
                  {{ hospital.name }}
                </h6>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-icon size="12" color="#62e3cf">star</v-icon> {{ hospital.rating }}
              </div>
            </v-layout>
            <h6 class="subtitle pb-2">
              {{ hospital.type }}
            </h6>

            <v-layout column>
              <v-layout row>
                <v-icon size="12" class="mr-2">place</v-icon> {{ hospital.addressDetail | truncate }} {{ hospital.city.label }}
              </v-layout>
              <v-layout row>
                <v-icon size="12" class="mr-2">phone</v-icon> {{ hospital.telephone }}
              </v-layout>
              <v-layout row class="info--text">
                <v-icon size="12" color="info" class="mr-2">access_time</v-icon> {{ hospital.statusOpen }}
              </v-layout>
            </v-layout>
           </v-layout>
          </v-card-title>
        </v-card>
      </v-layout>
      </div>
      <router-view v-if="searching == 0"/>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import HospitalService from '@/services/HospitalService';

Vue.filter('truncate', function (value) {
  const tvalue = value.toString();
  const tempV = tvalue.split(',');
  return tempV[0] + ', ' + tempV[1];
});
export default {
  name: 'App',
  data() {
    return {
      location: [
        { text: 'Jakarta Barat' },
        { text: 'Jakarta Utara' },
        { text: 'Jakarta Selatan' },
        { text: 'Jakarta Pusat' },
      ],
      metaTitle: null,
      keywords: null,
      results: [],
      searching: 0,
    };
  },
  computed: {
    hospitals() {
      return this.$store.state.hospitals[0];
    },
  },
  mounted() {
    this.setTitle();
  },
  methods: {
    back() {
      window.history.back();
    },
    setTitle() {
      this.metaTitle = this.$route.name;
    },
    async search() {
      const response = await HospitalService.getHospital({
        word: this.keywords,
      });
      const responses = response.data;
      if (responses.length > 0) {
        this.results = responses;
        this.searching = 1;
        this.$store.commit('addHospital', this.results);
      }
    },
  },
  watch: {
    $route: 'setTitle',
    keywords() {
      this.search();
    },
  },
};
</script>

<style>
.navbar-subtitle {
  color: #757575;
  font-size: 12px;
}

.navbar-location {
  color: #046e89;
  font-size: 16px;
}

.location-col i {
  font-size: 16px;
}

.v-toolbar {
  -webkit-box-shadow: 0px 1px 1px -2px rgba(0, 0, 0, 0.2),
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 1px 1px -2px rgba(0, 0, 0, 0.2),
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.theme--light.application {
  background-color: #f5f8f9;
}

.v-card .headline {
  font-size: 16px !important;
  color: #046e89;
}

.v-card .subtitle {
  font-size: 14px;
  font-weight: 400;
}

.theme--light.v-card {
  color: #757575;
}

.v-toolbar .v-chip.white {
  border: 1px solid #eaeaea !important;
  color: #757575 !important;
}

.v-toolbar .v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  display: none;
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: #757575;
}
</style>
