import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Filter from './views/Filter.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Rumah sakit',
      component: Home,
    },
    {
      path: '/filter',
      name: 'Pusat Kesehatan',
      component: Filter,
    },
  ],
});
