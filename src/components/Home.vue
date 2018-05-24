<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
       

        <!-- <div v-for="(contact,index) in contacts" :key='index'>

            <h3>{{contact.mobile}}</h3>
          
        </div> -->
  
    <phonebook-data-table></phonebook-data-table>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>  

import PhonebookDataTable from './PhonebookDataTable'

export default {

    data(){
      return {
       contacts:[]
      }
    },
    components:{
      PhonebookDataTable
    },
    methods:{
      fetchContacts(){
             axios.get('/contact')
          .then(response=>{
              console.log(response);
              this.contacts=response.data.data;
          })
      }
    },
    mounted(){
      this.fetchContacts();
    },

    created(){
    }

}

</script>