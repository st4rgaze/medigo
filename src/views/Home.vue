<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card href="#" width="100%" v-for="hospital in hospitals" :key="hospital.id" class="mb-1"
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
        <div class="nav-below">
          <v-layout row>
          <v-btn block flat>
            <v-icon>tune</v-icon> Filter
          </v-btn>
          <v-btn block flat>
            <v-icon>sort</v-icon> Urutkan
          </v-btn>
          </v-layout>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hospitals: [],
    };
  },
  mounted() {
    this.getHospitals();
  },
  methods: {
    getHospitals: function () {
      axios
        .get('http://v-latest.medigo.id/health-center')
        .then(response => {
          this.hospitals = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-below {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 6px #232323;
  height: 56px;
}
.nav-below button {
  height: 56px;
  margin: 0;
  color: #046E89;
  border: 1px solid rgb(243, 243, 243);
  text-transform: initial;
  font-size: 16px;
  font-weight: 400;
}
.nav-below i {
  color: #757575 !important;
  margin-right: 15px;
}
</style>
