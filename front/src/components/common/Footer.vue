<template>
  <b-container fluid class="footer-wrapp">
    <HomeFastRegistrate></HomeFastRegistrate>
    <div v-bind:class="classObject">
      <b-row>
          <b-col md="3" cols="6" class="no-padding" v-for="social in social_network" :key="social.classes">
            <a :href="social.url" class="social-item">
              <i class="fab" :class="social.classes"></i>
            </a>
          </b-col>
      </b-row>
      <div class="mobile-socials">
        <a v-for="social in social_network" :key="social.classes" :href="social.url">
          <i class="fab" :class="social.classesMobile"></i>
        </a>
      </div>

    </div>
  </b-container>
</template>
<script>
  import HomeFastRegistrate from '../HomePage/HomeFastRegistrate';
  export default {
    data(){
      return{
        social_network:[
          {
            url:     'https://www.facebook.com/CauseffectNL/',
            classes: 'fa-facebook-square',
            classesMobile: 'fa-facebook-f circle'
          },{
            url:     'https://www.instagram.com/causeffectnl/?hl=nl',
            classes: 'fa-instagram',
            classesMobile: 'fa-instagram circle'
          },{
            url:     'https://twitter.com/CauseffectNL',
            classes: 'fa-twitter',
            classesMobile: 'fa-twitter circle'
          },{
            url:     'https://www.linkedin.com/company/causeffect-nl/',
            classes: 'fa-linkedin-in',
            classesMobile: 'fa-linkedin-in circle'
          },
        ]
      }
    },
    computed: {
      classObject: function () {
        return {profilePage: this.$route.name === 'profile'}
      }
    },
    components:{
      HomeFastRegistrate
    },
  }
</script>
<style scoped>
  .no-padding {
    padding: 0;
  }
  .social-item {
    text-decoration: none;
    color: #00c7d6;
    text-align: center;
    font-size: 4vw;
    padding-top: 3.3%;
    padding-left: 2%;
    padding-bottom: 3.3%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 160px;

  }
  .footer-wrapp {
    padding: 0;
  }
  .social-item:hover {
    color: white;
    background: black;
  }
  @media screen  and (max-width: 767px){
    .social-item {
      font-size: 10vw;
      padding-top: 4.3%;
      padding-bottom: 4.3%;
    }

  }
  @media screen  and (max-width: 440px){
    .social-item {
      height: 80px;
    }

  }
  @media screen  and (max-width: 320px){
    .footer-wrapp {
      padding: 0;
    }
    .social-item {
      height: 60px;
    }
    .row {
      margin: 0;
    }
  }

  @media screen and (min-width: 769px) {
    .mobile-socials {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .profilePage {
      padding: 20px 15px 40px;
      display: flex;
      justify-content: center;
    }

    .profilePage .no-padding {
      display: none;
    }

    .mobile-socials {display: none}

    .profilePage .mobile-socials {
      width: 60%;
      display: flex;
      justify-content: space-between;
    }

    .profilePage .circle {
      border-radius: 50%;
      height: 30px;
      width: 30px;
      background: #333;
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    .profilePage .circle:hover {
      cursor: pointer;
      opacity: 0.75;
    }

    .profilePage .fab {
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>
