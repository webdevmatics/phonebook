<template>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
           <h3>You are logged out</h3>
          </v-flex>
        </v-layout>
</template>


<script>  

export default {

    data(){
      return {
        email:null,
        password:null
      }
    },

    created(){
      Bus.$emit('logout');
      this.$store.dispatch('logout').then(()=>{
        this.$router.push('/login')
      })
    }

}

</script>

