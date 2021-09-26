<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Angaryos Login</h3>
        <div class="alert alert-danger" role="alert" v-if="err">
          Boş data giremezsiniz
        </div>  
        <div class="alert alert-success" role="alert" v-if="(success==1)">
          Kayıt Başarılı
        </div>    
        <div class="alert alert-danger" role="alert" v-if="apiStatus=='error'">
          Backend Servisi Çalışmıyor
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="E posta yada telefon" value="iletisim@omersavas.com" v-model="userName">
          <br>
          <input type="password" class="form-control" placeholder="Şifre" value="1234Aa." v-model="password">

        </div>
        <button class="btn btn-primary" @click="saveuser()">Kaydet</button>
        <button class="btn btn-primary" @click="getUsers()">Verileri Getir</button>
        <button class="btn btn-primary" @click="clearData()">Formu Temizle</button>
        <button class="btn btn-primary" @click="loginUser()">Giriş Yap</button>
        <ul class="list-group">
          <li class="list-group-item" v-for="user in tableReturn">{{user.name_basic}}</li>
        </ul>
    
      </div>
      
    </div>
        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">title</th>
      <th scope="col">summarry</th>
      <th scope="col">content</th>
      <th scope="col">img</th>
    </tr>
  </thead>
  <tbody>
    <tr :key="data.id" v-for="data in tableReturn">
      <th scope="row">{{data.id}}</th>
      <td>{{data.name_basic}}</td>
      <td>{{data.summary}}</td>
      <td>{{data.content}}</td>
      <td :key="index" v-for="(img,index) in convertImage(data.images)" ><img width="100px" height="100px" :src="baseUrl+img.disk+'/'+img.destination_path+img.file_name" alt="" srcset=""></td>
      <!-- <td v-bind:key="img.file_name" v-for="img in data.images">,
        {{img}}
        <img :src=img.disk width="100" height="100"></td> -->
    </tr>
   
  </tbody>
</table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: "iletisim@omersavas.com",
        password : "1234Aa.",
        userList: [],
        err: null,
        success:null,
        apiStatus : "error",
        loginPostData : [],
        clientInfo: {type: "browser"},
        returnData : '',
        tableReturn : '',
        baseUrl : 'https://192.168.10.185/',
        
      }
    },
    mounted(){
        this.$http.get()
          .then((response) => {
              this.apiStatus = response.data.status;
            })
    },
    methods: {
      saveuser() {
        if (this.userName == null || this.userName == undefined || this.userName == 0){ this.err = 1;return;}
        this.$http.post("", {
            userName: this.userName
          })
          .then((response) => {
            this.success =1;
          })
      },
     getUsers() {
        this.$http.get()
          .then((response) => {
            if (this.userList.length > 0) {
              this.userList = [];
            }
              this.userList.push(response);
          
          })
      },
      clearData() {
        if (this.tableReturn.length > 0) {
          setTimeout(() => {  
            this.tableReturn = [alert]; }, 1000).then((response) => {this.tableReturn = [];});
        }
      },
      loginUser()
      {   
        this.loginPostData = {
          "clientInfo": {type: "browser"},
          "email" : this.userName,
          "password" : this.password
        }
          this.$http.post("login", this.loginPostData)
          .then((response) => {
            localStorage.token = response.data.data.token;
            this.navigateUrl();
          })
        
      },
      navigateUrl()
      {
        var temp = {
          "page":1,
          "limit":"10",
          "column_array_id":"0",
          "column_array_id_query":"0",
          "sorts":{},
          "filters":{}
        };
        var postData = {
          "params": JSON.stringify(temp)
        };
           this.$http.post(localStorage.getItem('token')+'/tables/public_contents',postData)
              .then((response) => {
            this.tableReturn = response.body.data.records;
          })
      },
      convertImage(data){
        var tmp = JSON.parse(data);
        return tmp;
      }
  }
}
</script>

<style>
</style>