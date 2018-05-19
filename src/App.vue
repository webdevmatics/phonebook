<template>
  <v-app>
    <v-toolbar>
    <v-toolbar-title><v-btn flat :to="{name:'Home'}">{{title}}</v-btn></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat exact  v-for="(menu,index) in menus" :key='index' :to={name:menu.route}>
         {{menu.name}}
       </v-btn>

       <v-btn @click="getInfo" color="success">get userinfo</v-btn>
      </span>
     
    </v-toolbar-items>
  </v-toolbar>

  <router-view></router-view>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title:"PhoneBook",
      menus:[
      {name:"Signup",route:"Signup"},
      {name:"Login",route:"Login"}, 
      ]
    }
  },
  name: 'App',
  methods:{
    getInfo(){
      axios.get('/user').
      then(response=>{
        console.log(response)
      })
    }
  },
  mounted(){
    if(token){
      let authMenu=[{
        name:"Logout",route:"Logout"
      }]
      this.menus=authMenu;
    }
  }
}
</script>
