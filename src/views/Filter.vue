<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column v-if="results.length < 1">
        <p class="helper-text">Cari berdasarkan tipe</p>
        <v-card href="#" width="100%"
        >
         <v-list>
          <v-list-tile color=""
            v-for="item in items"
            :key="item.title"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>chevron_right</v-icon>
              </v-list-tile-action>
          </v-list-tile>
        </v-list>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
  props: ['searching'],
  data() {
    return {
      items: [
        { title: 'Rumah sakit' },
        { title: 'Klinik' },
      ],
      results: [],
    };
  },
  computed: {
    hospitals() {
      this.results = this.$store.state.hospitals[0];
      return this.$store.state.hospitals[0];
    },
  },
};
</script>

<style scoped>
.helper-text {
  color: #757575;
}
</style>

