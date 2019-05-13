<template>
    <div class="cellScill" @click="toFilters(name)" v-bind:class="{ active: mutableRole==name }">
        <img :src="img_url" :alt="name">
        <hr>
        <p>{{name}}</p>
    </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
    export default {
        props:{
            img_url:{
                type:String
            },
            name:{
                type:String
            },
            role:{
                type:String
            },
        },
        data: function () {
            return {
                mutableRole: this.role,
                
            }
        },
        methods:{
            toFilters(value){
                // this.mutableRole = value;
                let roleLink = this.roleLinks.filter(item => item.name === value);
                if (roleLink[0].link == this.$route.params.role) {
                  this.$router.push({ path: `/freelancers/`, query: {user_hourly_rate:'30.00', role: "", user_place_to_work:'', user_region:'', user_city:''}});
                  this.$emit('toFilters', {
                    role: ""
                  })
                } else {
                  this.$router.push({ path: `/freelancers/${roleLink[0].link}`, query: {user_hourly_rate:'30.00', role: value, user_place_to_work:'', user_region:'', user_city:''}});
                  this.$emit('toFilters', {
                    role: value
                  })
                }
                
                
            },
        },
        computed: {
            ...mapGetters({
                roleLinks: 'other_request/getCategoriesLinksWithStore'
            }),
        },
        components: {
        },
    }
</script>
<style scoped lang="scss">
    .cellScill{
        img{
            max-width: 100%;
            filter: invert(.8);
        }
        width: 33.3%;
        padding-top: 2%;
        border: 1px solid #cacaca;
        text-align: center;
        &:hover, &.active{
            hr{
                border-color: white;
            }
            p{
                color: white;
            }
            background-color: #2ad0e1;
            border-color: #2ad0e1;
            color: white;
        }
        
    }
    .cellScill.active, 
    .cellScill:hover {
        img {
            filter:none;
        }
    }
    hr{
        border: 0.5px solid #cacaca;
        width: 30%;
        margin-bottom: 4%;
    }
    p{
        color: #969696;
        font-family:GolanoRegular;
        font-size:1.3vw;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 6%;
    }
    /**** Cell style for SpecialistsPage: ****/
    .spec-list {
      .cellScill {
        width: 11.11%;
        min-width: 115px;
        padding: 1.5rem 0.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      img {
        // max-width: 35%;
        height: 45%;
        filter: invert(.5);
      }
      p {
        font-size: 0.8rem;
        line-height: 1.2;
      }
      hr {
        margin-top: 0.5rem;
      }
    }
    
    @media screen  and (max-width: 1200px){
      p {
        font-size: 1.4rem;
      }
    }
    @media screen and (max-width: 790px){
      p{
        font-size: 1.2rem;
      }
    }
    @media screen and (max-width: 767px){
      .cellScill img{
          max-width: 40%;
      }
    }
    @media screen and (max-width: 575px){
      .cellScill {
        width: 70%;
        padding: 5% 0;
      }
    }
    @media screen  and (max-width: 450px) {
      h2 {
        font-size: 2.5rem;
      }
      p{
        font-size: 1.2rem;
      }
    }
    @media screen and (max-width: 414px){
      .cellScill {
        width: 100%;
      }
    }
    @media screen  and (max-width: 360px) {
      h2 {
        font-size: 2rem;
      }
      p{
        font-size: 1.5rem;
      }
    }

</style>
