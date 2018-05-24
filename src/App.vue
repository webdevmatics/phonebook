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
export default {
  data () {
    return {
      title:"PhoneBook",
      menus:[],
      noAuthMenu:[
      {name:"Signup",route:"Signup"},
      {name:"Login",route:"Login"}, 
      ],
      authMenu:[{
        name:"Logout",route:"Logout"
      }]
    }
  },
  name: 'App',
  methods:{

    onLoggedIn(){
     
      this.menus=this.authMenu;
    },
    onLogout(){
     
      this.menus=this.noAuthMenu;
    }
  },
  mounted(){
    if(token){
      this.onLoggedIn();
    }
  },

  created(){
    this.menus=this.noAuthMenu;
    Bus.$on('loggedIn',()=>{
        this.onLoggedIn();
    });

    Bus.$on('logout',()=>{
        this.onLogout();
    });


  }
}
</script>
