<template>
    <div class="wrapp row px-3 px-sm-0">

      <div class="col-12 px-2 pl-sm-3 pr-sm-0 search-block order-1 order-lg-0 mt-5 mt-lg-0 mb-2 mb-lg-0">
        <div class="row justify-content-end w-100 m-0">
            <div class="col-lg-5 px-0 input-block">
                <i class="fas fa-search icon-input"></i>
                <input type="text" 
                        class="w-100 form-control-lg" 
                        placeholder="Probeer 'Graphic Design'" 
                        v-model="searchModel"
                        @input="onSearchChange">
            </div>
            <a class="btn btn-lg btn-info"
                @click="onSearchChange">
                Zoek nu!
            </a>
        </div>
      </div>    
      <div class="col-12 px-0 order-0 order-lg-1">
        <p class="mt-5 preCellMargin">Selecteer een vakgebied</p>
        <div class="row cellMargin mt-3 spec-list justify-content-between flex-nowrap">
            <HomeCellSkill v-for="(cell,index) in cells"
                        :key="Math.random()+index"
                        :img_url="cell.img_url"
                        :name="cell.name"
                        :role="filters.role"
                        @toFilters='onToFilters'>
            </HomeCellSkill>
        </div>    
      </div>

      <div class="filters order-2">
          <div class="filter-item">
              <vue-single-select
                v-model="filters.user_hourly_rate"
                placeholder="Uur tarief"
                :options="priceList"
                option-label="title"
                :required="true"
                class="input-cast"
              ></vue-single-select>
          </div>

          <div class="filter-item">
              <vue-single-select
                v-model="filters.user_place_to_work"
                placeholder="Locatie werkplek"
                :options="placesToWork"
                :required="true"
                class="input-cast"
              ></vue-single-select>
          </div>

          <div class="filter-item">
              <vue-single-select
                v-model="filters.user_region"
                placeholder="Regio"
                :options="regionsList"
                :required="true"
                class="input-cast"
              ></vue-single-select>
          </div>

          <div class="filter-item">
              <vue-single-select
                      :class="{disabled: !citiesList.length }"
                      v-model="filters.user_city"
                      placeholder="Locatie last"
                      :options="citiesList"
                      :required="true"
                      class="input-cast"
              ></vue-single-select>
          </div>
      </div>

      <b-container fluid class="anketa-items order-3">
        <b-row>
            <h3 v-if="notFound" class="col text-center text-muted">Geen specialist gevonden</h3>
        </b-row>
        <b-row>
            <b-col class="anketa-item" v-for="profile in filteredSpecialistList" xl="4" sm="6"
                :key="profile.id + Math.random()">
                <Anketa
                        :user_avatar_url="profile.user_avatar"
                        :name="profile.firstname"
                        :lastName="profile.lastname"
                        :role="profile.role"
                        :specialistId="profile.id"
                        :stars="Number(profile.rating)"
                        :type="'stars'"
                        :rate="profile.wage"
                        :years="profile.years_experience">
                </Anketa>
            </b-col>
        </b-row>
      </b-container>


    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import axios from "../../axios.config";
    import HomeCellSkill from '../HomePage/HomeCellSkill';
    import VueSingleSelect from "vue-single-select";
    import Anketa from '../Anketa';
    import AnketaDisabled from './AnketaDisabled';
    import AnketaInConversation from './AnketaInConversation';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';


    export default {
        data() {
            return {
                filters: {
                    user_hourly_rate: "",
                    role: '',
                    user_place_to_work: '',
                    user_region: '',
                    user_city: '',
                    searchReq: '',
                },
                priceList: [
                    {
                        title: "€30 - €35",
                        text: "30 p.u",
                        val: "30.00",
                    },
                    {
                        title: "€35 ­- €45",
                        text: "35 p.u",
                        val: "35.00",
                    },
                    {
                        title: "€45 +",
                        text: "45 p.u",
                        val: "45.00",
                    },
                ],
                searchModel: '',
                notFound: false,
                filtersNotEmpty: {}
            }

        },
        components: {
            VueSingleSelect,
            Anketa,
            HomeCellSkill,
            AnketaDisabled,
            AnketaInConversation
        },
        created(){
            let roleLink = this.roleLinks.filter(item => item.link === this.$route.params.role);
            this.filters.role =  roleLink[0] ? roleLink[0].name : this.$route.params.role; //this.$router.history.current.query.role;
            
            // let filtersNotEmpty = new Object();
            Object.keys(this.filters).forEach(key => {
                if (this.filters[key])
                    this.filtersNotEmpty[key] = this.filters[key];
            });
         
            if (this.filters.role) {

                /**** dynamic SEO start ****/
                this.$route.meta.title = roleLink[0] ? roleLink[0].title : "Freelancers";
                let descr = roleLink[0] ? roleLink[0].descr : "Freelancers";
                this.$route.meta.metaTags = [
                    {
                        name: 'description',
                        content: descr
                    }
                ]
                /**** dynamic SEO end ****/
                this.$router.push({ path: `/freelancers/${roleLink[0].link}` , query: {
                    ...this.filtersNotEmpty
                    }
                });
                
                
            } else {
                // console.log(this.filtersNotEmpty);
                this.$router.push({ path: `/freelancers`, query: {
                    ...this.filtersNotEmpty
                    }
                });
            }
            
            
        },
        mounted: function () {
          this.$store.dispatch('other_request/get_data_with_server');
          this.$store.dispatch('other_request/getCategoriesWithServer');
        //   this.$route.meta.title = this.$route.params.role;
        },
        methods: {
            onClickPrice: function (index) {
                this.filters.user_hourly_rate = index;
            },
            applyFilter: function (arr, key, value) {
                if ((key == "searchReq") && value) {
                    let matchSearch1 = [];
                    matchSearch1 = this.specialistList
                        .filter(item => item.firstname.toLowerCase().includes(this.searchModel.toLowerCase().trim()));

                    let matchSearch2 = [];
                        matchSearch2 = this.specialistList
                            .filter(item => item.role.toLowerCase().includes(this.searchModel.toLowerCase().trim()));

                    let matchSearch3 = [];
                    matchSearch3 = this.specialistList
                    .filter(
                        item => {
                            let matchSearchIn = item.skills.filter(
                                itemIn => 
                                    itemIn.name.toLowerCase().includes(this.searchModel.toLowerCase().trim())
                            )
                            if (matchSearchIn.length) {
                                return matchSearchIn;
                            }  
                            
                        }
                    );

                    var matchSearch = matchSearch1.concat(matchSearch2, matchSearch3);
                    if (!matchSearch.length)
                        this.notFound = true;
                    else 
                        this.notFound = false;
                        
                    return matchSearch.length ? matchSearch : [] ;
                } else {
                    return value ? arr.filter(item => item[key] === value) : arr;
                }   
                
            },
            onToFilters (data) {
                this.filters.role = data.role;
            },
            onSearchChange () {
                this.filters.searchReq = this.searchModel;
            }
        },
       
        computed: {
            ...mapGetters({
                specialistList: 'specialistList/getAllUsers',
                rolesList:      'other_request/getRolesListWithStore',
                placesToWork:   'other_request/getPlacesToWorkWithStore',
                regions:        'other_request/getRegionsWithStore',
                regionsList:    'other_request/getRegionsListWithStore',
                cities:         'other_request/getCitiesWithStore',
                // citiesList:     'other_request/getCitiesListListWithStore',
                cells: 'other_request/getCategoriesListListWithStore',
                roleLinks: 'other_request/getCategoriesLinksWithStore'
            }),
            citiesList:{
                get() {
                  return this.$store.state.other_request.citiesList
                },
                set(value){
                    this.$store.commit('other_request/cityDataMut', {data:[]})
                },
            },
            filteredSpecialistList() {
                // console.log(this.$route.params.role);
                let roleLink = this.roleLinks.filter(item => item.link === this.$route.params.role); 
                let roleLinkActive = roleLink[0] ? roleLink[0].name : "";
                this.filters.role = roleLinkActive; //this.filters.role ? this.filters.role : roleLinkActive;//this.$route.params.role;
                let priceId = this.filters.user_hourly_rate 
                    ? this.filters.user_hourly_rate.val
                    : ""; 

                

                let result = this.specialistList;

                let regionId = this.filters.user_region
                    ? this.regions.filter(item => item.title_en === this.filters.user_region)[0].region_id
                    : this.filters.user_region;

                let cityId = this.filters.user_city
                    ? this.cities.filter(item => item.title_en === this.filters.user_city)[0].city_id
                    : this.filters.user_city;



                regionId ? this.$store.dispatch('other_request/getCityWithServer', regionId) : this.citiesList = [];
                
                
                // let filtersCopy = {};
                if (this.filters.searchReq) {
                    Object.keys(this.filters).forEach(key => {
                        if (key !== "searchReq")
                            this.filters[key] = '';
                    });

                    priceId = '';
                    regionId = '';
                    cityId = '';
                    filtersCopy = {user_hourly_rate: "", role: "", user_region: "", user_city: "", searchReq: this.filters.searchReq};
                } 

                let filtersCopy = {user_hourly_rate: priceId, role: this.filters.role, user_place_to_work: this.filters.user_place_to_work, user_region: regionId, user_city: cityId, searchReq: this.filters.searchReq};
                
                if (priceId)
                    this.filtersNotEmpty.user_hourly_rate = priceId;
                else 
                    delete this.filtersNotEmpty.user_hourly_rate;

                Object.keys(filtersCopy).forEach(key => {
                    if (filtersCopy[key])
                        this.filtersNotEmpty[key] = filtersCopy[key];
                    else 
                       delete this.filtersNotEmpty[key]; 
                });

                if (this.filters.role && roleLink[0]) {
                    
                    /**** dynamic SEO start ****/
                    this.$route.meta.title = roleLink[0] ? roleLink[0].title : "Freelancers";
                    let descr = roleLink[0] ? roleLink[0].descr : "Freelancers";
                    this.$route.meta.metaTags = [
                        {
                            name: 'description',
                            content: descr
                        }
                    ]
                    /**** dynamic SEO end ****/
                    this.$router.push({ path: `/freelancers/${roleLink[0].link}` , query: {
                        ...this.filtersNotEmpty
                        }
                    });
                } else 
                    this.$router.push({ path: `/freelancers`, query: {
                        ...this.filtersNotEmpty
                        }
                    });

                Object.keys(this.filters).forEach(key => {
                    result = this.applyFilter(result, key, filtersCopy[key]);
                });
                // console.log(result);
                return result
            }
        },
    }
</script>

<style lang="css">
   .input-cast.disabled input {
        background-color: #CBCBCB !important;
   }
</style>

<style scoped lang="scss">
    input {
        font-family: GolanoRegular;
    }
    .search-block {
        ::placeholder {
            color: #969696;
            opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #969696;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color: #969696;
        }
        .input-block {
            max-width: calc(100% - 104px);
            height: 48px;
        }
        .form-control-lg {
            border: 1px solid #cacaca;
            border-radius: 0;
            vertical-align: middle;
            padding-left: 2.8rem;
            padding-top: 0.5rem;
            padding-bottom: 6px;
            font-size: 1.1rem;
            height: 48px;
            color: #495057;
        }
        .btn-info {
            color: #fff;
            background-color:  #2ad0e1;
            border-color:  #2ad0e1;
            border-radius: 0;
            font-size: 1.1rem;
            line-height: 1.7;
            width: 104px;
            height: 48px;
            &:hover {
                color: #2ad0e1;
                background: #fff;
            }
        }
        .icon-input {
            position: absolute;
            font-size: 1.1rem;
            color: var(--gray);
            left: 1rem;
            top: 1.05rem;
        }
    }

    .cellMargin{
      margin-top: 4%;
      margin-left: 2.5%;
      margin-right: 2.5%;
      width: 97.5%;
      overflow-x: auto;
    }
    
    .disabled {
        pointer-events:none;
        color: #bfcbd9;
        cursor: not-allowed;
    }

    .priceActive {
        opacity: 1 !important;
    }

    .slider-wrap-main {
        width: 100%;
        position: relative;
    }

    .slider-swiper-main {
        width: 90%;
    }

    .anketa-item {
        margin-right: 0;
    }

    .swiper-button-prev {
        width: 45px;
        height: 85px;
        left: -35px;
        top: 25%;
        background: url("../../assets/icons/arrow-carousel-left.png") no-repeat;

    }

    .swiper-button-next {
        width: 45px;
        height: 85px;
        right: -35px;
        top: 25%;
        background: url("../../assets/icons/arrow-carousel-right.png") no-repeat;
    }

    .slider-form {
        display: none;
    }

    p {
        margin: 0;
        color: #646464;
        font-family: GolanoRegular;
        font-size: 25px;
        font-weight: 400;
        line-height: 30.54px;
        &.preCellMargin {
            font-size: 20px;
            margin-left: 2.5%;
        }
    }

    .price-items {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-left: 4%;
        img {
            opacity: 0.2;
        }
    }

    .price-item {
        width: 160px;
        text-align: center;
        padding-top: 2%;
        margin-right: 2%;
        cursor: pointer;

        img {
            width: 90%;
            margin-bottom: 12%;
        }
        h2 {
            color: #646464;
            font-family: GolanoSemi;
            font-size: 29px;
            margin: 0;
        }
        span {
            color: #646464;
            font-family: GolanoRegular;
            font-size: 29px;
        }
    }

    .filters, .filter-item {
        display: flex;
    }

    .filters {
        width: 100%;
        margin-top: 4%;
        margin-left: 2.5%;
        justify-content: space-around;
    }

    .filter-item {
        width: 32%;
        div {
            width: 100%;
        }
    }

    .input-cast {
        font-family: GolanoRegular;
        font-size: 20px;
        font-weight: 400;
        line-height: 30.54px;

    }

    .anketa-items {
        margin-top: 4%;
        margin-left: 1%;
        width: 84vw;
    }

    .anketa-item {
        margin-bottom: 4%;
    }

    @media screen and (max-width: 1780px) {
        button {
            font-size: 0.8rem;
            padding: 3% 0 !important;
        }
    }

    @media screen and (max-width: 1440px) {
        button {
            font-size: 0.7rem;
        }
    }

    @media screen and (max-width: 1090px) {
        .input-cast {
            font-size: 1rem;
        }
        .anketa-item {
            padding: 0;
        }
    }

    @media screen and (max-width: 900px) {
        .filters {
            flex-direction: column;
        }
        .filter-item {
            width: 100%;
        }

    }

    @media screen and (max-width: 575px) {
        .anketa-items {
          padding: 25px;
        }
        .slider-form {
            display: block;
        }
    }

    @media screen and (max-width: 500px) {
        .price-item {
            img {
                width: 70%;
            }
            h2 {
                font-size: 1.5rem;
            }
            span {
                font-size: 1.2rem;
            }
        }
    }

    @media screen and (max-width: 440px) {
        .anketa-item {
            padding: 0;
        }
    }

    @media screen and (max-width: 425px) {
        .cellMargin{
            width: 95%;
        }
        .filters {
            margin-left: 0;
            padding: 3%;
        }
        .anketa-items {
            margin-left: 0;
            width: 100%;
        }
        .slider-swiper-main {
            width: 100%;
        }
        .anketa-item {
            margin-right: 0;
        }
        .swiper-button-prev {
            background-size: contain;
            width: 35px;
            top: 43%;
            height: 65px;
            left: 10px;
        }
        .swiper-button-next {
            background-size: contain;
            width: 35px;
            height: 65px;
            top: 43%;
            right: 10px;
        }
    }

    @media screen and (max-width: 410px) {
        .price-item {
            img {
                width: 60%;
            }
            h2 {
                font-size: 1.3rem;
            }
            span {
                font-size: 1rem;
            }
        }
    }

    @media screen and (max-width: 320px) {
        .price-items {
            margin-left: 0;
            margin-bottom: 10%;
        }
        .filter-item div {
            width: 100%;
        }
        .anketa-items {
            margin-left: 0;
            padding: 0;
            .anketa-item {
                padding: 0;
            }
        }
    }
</style>

