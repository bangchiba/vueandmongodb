<template>
  <div class="content profile">
    <header class="bar bar-nav">
      <a class="button button-link button-nav pull-left" v-link="{path: '/home', replace: true}">
        <span class="icon icon-left"></span>
      </a>
      <h1 class="title">Dokter di sekitar</h1>
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
              <div class="item-subtitle">
                <input type="text" placeholder="Cari nama dokter..." />
              </div>
            </div>
          </div>
        </li>
      </ul>
      
      <h4 style="margin-left:.5rem">Spesialisasi Dokter</h4>

      <ul style="margin-top:.3rem">
        <li v-for="specialis in spesialis" v-bind:key="specialis.id">
          <div class="item-link item-content">
            <div class="item-inner">
              <div type="title-row">
                <div class="item-text">{{specialis.title}}</div>
                <div class="item-desc">Praktisi umum</div>
              </div>
            </div>
          </div>
        </li>                
      </ul>
    </div>
  
  </div>
</template>
<script>
  export default {
    data () {
      return {
        spesialis: [
          {
            id: 1,
            title: 'Dokter Umum',
            description: 'Praktisi Umum'
          },
          {
            id: 2,
            title: 'Dokter Gigi',
            description: 'Praktisi gigi, rongga mulut dan rahang'
          },
          {
            id: 3,
            title: 'Dokter Spesialis Jantung',
            description: 'Kardiologi'
          },
          {
            id: 4,
            title: 'Dokter Spesialis Kulit dan Kelamin',
            description: 'Dermatologi'
          },
          {
            id: 5,
            title: 'Dokter Spesialis THT',
            description: 'Otolaringologi'
          }
        ]
      }
    },
    computed: {
      length () {
        return this.spesialis.length
      }
    }
  }
</script>

<style>
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
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
</style>
