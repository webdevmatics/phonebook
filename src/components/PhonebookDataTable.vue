<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fullName" label="Full Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.mobile" label="Mobile"></v-text-field>
              </v-flex>
              
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


     <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="contacts"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >





      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.fullName }}</td>
        <td class="text-xs-right">{{ props.item.mobile }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

     <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
       search: '',
       pagination:{rowsPerPage:10},
      dialog: false,
      headers: [
       
        { text: 'Full Name', value: 'fullName' },
        { text: 'Mobile', value: 'mobile' },
        { text: 'Actions', value: 'id', sortable: false }
      ],
      contacts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
       pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
        fetchContacts(){
             axios.get('/contact')
          .then(response=>{
              console.log(response);
              this.contacts=response.data.data;
          })
      },
      initialize(){
          this.fetchContacts();
      },
      

      editItem (item) {
        this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        console.log(item);
        
        const index = this.contacts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.contacts.splice(index, 1)
          console.log('deleted data');

          axios.delete('/contact/'+item.id)
          .then(response=>{
            console.log(response);
            
          })

      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          console.log('edited data');
          console.log(this.editedItem);
          

          axios.put('/contact/'+this.editedItem.id,{name:this.editedItem.fullName, phone: this.editedItem.mobile})
          .then(response=>{
            console.log(response);
            
          })

          
          Object.assign(this.contacts[this.editedIndex], this.editedItem)
        } else {
          console.log('created data');
          console.log(this.editedItem);

           axios.post('/contact',{name:this.editedItem.fullName, phone: this.editedItem.mobile})
          .then(response=>{
            console.log(response);
            
          })

          this.contacts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>