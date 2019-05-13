// initial state


import axios from "../../axios.config";

const state = {
  regions: [],
  regionsList: [],
  rolesList: [],
  placesToWork: [],
  cities: [],
  citiesList: [],
  cells:[]
};


/**
 * ----- GETTERS -----
 **/

const getters = {
  getRegionsWithStore() {
    return state.regions
  },
  getRegionsListWithStore() {
    return state.regionsList
  },
  getRolesListWithStore() {
    return state.rolesList
  },
  getPlacesToWorkWithStore() {
    return state.placesToWork
  },
  getCitiesWithStore() {
    return state.cities
  },
  getCitiesListListWithStore() {
    return state.citiesList
  },
  getCategoriesListListWithStore() {
    return state.cells
  },
  getCategoriesLinksWithStore() {
    return [
      {
          name: "Motion graphic designer",
          link: "motion-graphics",
          title: "Op zoek naar een motion graphics designer? Boek nu jouw specialist",
          descr: "Vergelijk motion graphic freelancers. Je cijfers en statistieken komen tot leven. Overgehaald? Laat een uitleg animatie op maat maken. 2D & 3D animaties✓"
      },
      {
          name: "Fotograaf",
          link: "fotograaf",
          title: "Op zoek naar een Fotograaf? Boek eenvoudig jouw Fotograaf in",
          descr: "Maak keuze uit verschillende professionele fotografen op ons platform. Professionele shoot voor bedrijven? Productfotografie ✓ Portretfotografie✓"
      },
      {
          name: "Copywriter",
          link: "copywriter",
          title: "Op zoek naar een copywriter? Plan direct kennismakingsgesprek in",
          descr: "Via Causeffect on demand is het mogelijk om je copywriter in te boeken voor 27,50 per uur ✓ 5 dagen per week Klantenservice! ✓ geen dure agency kosten ✓ Gescreende specialisten"
      },
      {
          name: "Social media marketeer",
          link: "socialmediamarketeer",
          title: "Op zoek naar een social media marketeer? Boek jouw communicatie specialist nu",
          descr: "Via Causeffect on demand plan je nu eenvoudig een social media marketeer online in  al vanaf 30,00 per uur. ✓ geen dure agency kosten ✓ Gescreende specialisten ✓ 5 dagen per week Klantenservice!"
      },
      {
          name: "SEO specialist",
          link: "seospecialist",
          title: "Op zoek naar een SEO specialist? Boek direct jouw in-house SEO specialist",
          descr: "Op een veilige manier hoger komen in Google? Schakel een SEO specialist in! Maak jouw website op een effectieve manier beter vindbaar. Gecertificeerde SEO freelancers ✓"
      },
      {
          name: "SEA specialist",
          link: "adwordsspecialist",
          title: "Op zoek naar een Adwords specialist? Boek nu jouw communicatie specialist.",
          descr: "Laat je Google ads campagne door een Adwords specialist opzetten en/of beheren en behaal je gewenste resultaat. Gecertificeerde Google adwords freelancers ✓"
      },
      {
          name: "Camera operator",
          link: "cameraman",
          title: "Op zoek naar een cameraman? Plan jouw cameraman nu in",
          descr: "Aanbod van diverse freelance cameraman voor al jouw wensen en eisen. Vind de specialist die bij jou past. Gecertificeerde camera man- en vrouw ✓"
      },
      {
          name: "Video editor",
          link: "videoeditor",
          title: "Op zoek naar een video editor? Boek direct jouw video editor",
          descr: "Zoekt u iemand die ervaring heeft met video editen. Laat uw video’s bewerken door één van onze gescreende specialisten.  Skills, snelheid en kwaliteit✓"
      },
      {
          name: "Graphic designer",
          link: "grafischontwerper",
          title: "Op zoek naar grafisch ontwerper? Boek nu jouw communicatie specialist",
          descr: "Een grafisch ontwerper boek je nu eenvoudig in via Causeffect on demand vanaf 30,- per uur. ✓ geen dure agency kosten ✓ Gescreende specialisten ✓ 5 dagen per week Klantenservice!"
      }
    ]
  }
}

const actions = {
    get_data_with_server({commit}) {
      request('/public/api/get_all_roles.php', 'allDataSpecialistListMut', 'rolesList');
      request('/public/api/get_all_places_to_work.php', 'allDataSpecialistListMut', 'placesToWork');
      request('/public/api/get_region.php', 'allDataSpecialistListMut', ['regions', 'regionsList']);
      function request(url, name_commit, name_mutations) {
        axios.get(url)
          .then(response => commit(name_commit, {data:response.data, name: name_mutations}))
          .catch(err => console.log(err))
      }
    },

    getCityWithServer({commit}, regionId){
      axios
        .get(`/public/api/get_city.php?region_id=${regionId}`)
        .then(cities => {
          commit('cityDataMut', cities)
        })
        .catch(err => console.log(err))
    },

    getCategoriesWithServer({commit}){
      axios
        .get('/public/api/home_page_categories.php')
        .then(response => {
          commit('CategoriesMut', response.data)
        })
        .catch(err => console.log(err))
    },
};

const mutations = {
  allDataSpecialistListMut (state, value) {
    switch(value.name){
      case 'rolesList':
        state[value.name] = value.data.map(item => item.name);
        break;
      case 'placesToWork':
        state[value.name] = Object.keys(value.data).map(key => value.data[key]);
        break;
    }
    if(typeof value.name === 'object') {
      state[value.name[0]] = value.data;
      state[value.name[1]] = value.data.map(item => item.title_en);
    }
  },
  cityDataMut(state, value){
    state.citiesList = value.data.map(item => item.title_en);
    state.cities = value.data;
  },
  CategoriesMut(state, value){
    state.cells = value
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
