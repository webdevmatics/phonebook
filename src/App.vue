<template>
  <v-app>
    <v-toolbar>
    <v-toolbar-title><v-btn flat :to="{name:'Home'}">{{title}}</v-btn></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat exact  v-for="(menu,index) in menus" :key='index' :to={name:menu.route}>
         {{menu.name}}
       </v-btn>

      </span>
     
    </v-toolbar-items>
  </v-toolbar>

  <router-view></router-view>

  </v-app>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      title:"PhoneBook",
      
    }
  },
  name: 'App',
  computed:mapGetters(['isAuthenticated','menus']),

  created(){

    axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch('logout').then(()=>{
          this.$router.push('/login')
        })
      }
      throw err;
    });
  });

  }
  
 
}
</script>
