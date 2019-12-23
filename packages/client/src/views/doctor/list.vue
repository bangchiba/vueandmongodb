<template>
  <div class="content profile">
    <header class="bar bar-nav">
      <a class="button button-link button-nav pull-left" v-link="{path: '/home', replace: true}">
        <span class="icon icon-left"></span>
      </a>
      <h3 class="title">Dokter Umum di sekitar</h3>
    </header>
    <div class="list-block">
      <ul>
        <li style="height: 3rem;">
          <div class="item-content" style="min-height: 3rem;">
            <div class="item-media">
              <i class="icon icon-instagram"></i>
            </div>
            <div class="item-inner" style="min-height: 3rem;">
              <!-- <div class="item-title-row"></div> -->
              <!-- <div class="item-subtitle">
                <input type="text" placeholder="Cari nama dokter..." />
              </div> -->
              <div class="type">
                <div class="active">
                  <a href="">Semua</a>
                </div>
                <div class="inactive"><a href="">Praktek Hari Ini</a></div>
                <div class="inactive"><a href="">Booking Online</a></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <v-card-container v-for="list in doctors" v-bind:key="list.id" style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; padding-right:15px">
        <div style="display:flex; flex:3; flex-direction:column">
            <card type="header" class="nama">{{list.nama}}</card>
            <card type="content">
                <card type="content-inner">
                    <p> {{list.rs}}</p>
                    <p style="color: #10e76a">{{list.waktu}}</p>
                </card>
            </card>
        </div>
        <div style="background-color: #ebecec; border-radius:50%; height:80px; width:80px;">
            
        </div>
    </v-card-container>

    <bar>
      <bar-item path="/home" label="Filter" icon="home"></bar-item>
      <bar-item path="/user" label="Sort" icon="me"></bar-item>
    </bar>
  </div>
  
</template>
<script>
  import axios from 'axios'
  import VCardContainer from '../../components/Card'
  import Card from '../../components/CardItem'

  import Bar from '../../components/Bar'
  import BarItem from '../../components/BarItem'

  export default {
    data () {
      return {
        doctors: [
          {
            id: 1,
            nama: 'dr. Agieta Zulkifli. SpTHT-KL',
            rs: 'RS Pusat Pertamina',
            waktu: 'Praktik hari ini (10.00 - 12.00)'
          },
          {
            id: 2,
            nama: 'dr. Adisti M R,SpTHT-KL(K)',
            rs: 'RS Pusat Pertamina',
            waktu: 'Praktik hari ini (10.00 - 12.00)'
          },
          {
            id: 3,
            nama: 'Dr. dr. Mirta H, SpTHT-KL(K)',
            rs: 'RS Pusat Pertamina',
            waktu: 'Praktik Kamis (9.00 - 11.00)'
          }
        ]
      }
    },
    mounted () {
      axios.get('http://localhost:5000/').then(data => {
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
    },
    computed: {},
    components: {
      VCardContainer,
      Card,
      Bar,
      BarItem
    }
  }
</script>

<style>
.nama {
    font-size: 16px;
    color: #106de7;
}

.type {
  width: 100%;
  height: 37.333331px;
  margin-top: 3px;
}
.type .active {
  display: inline-block;
  width: 20%;
  height: 37px;
  border-radius: 15px;
  text-align: center;
  line-height: 37.333331px;
  color: #106de7;
  font-size: 12.7999992px;
  background-color: #d9e9d7;
  margin-right: 7px;
}

.type .inactive {
  display: inline-block;
  width: 30%;
  height: 37px;
  border-radius: 15px;
  text-align: center;
  line-height: 37.333331px;
  color: #6f7072;
  border: .5px solid;
  font-size: 12.7999992px;
  border-color: #6f7072;
  background-color: #fafafa;
}

.profile .list-block {
  margin: 2.4rem 0 1rem 0;
  font-size: 0.65rem;
}
.profile .list-block .item-subtitle {
  font-size: 0.65rem;
}
.profile .list-block .item-input {
  margin-top: 0.06rem;
  margin-bottom: 0.06rem;
}
.profile .list-block input {
  font-size: 0.65rem;
}
.profile .list-block select {
  font-size: 0.65rem;
}
.profile .list-block textarea {
  font-size: 0.65rem;
}
.profile .list-block .item-title.label {
  width: 30%;
}
.profile .submit-button {
  margin: 0 auto 2rem auto;
  width: 100%;
  padding: 0 0.45rem;
}
.profile .submit-button button {
  background-color: #07ed13;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
</style>
