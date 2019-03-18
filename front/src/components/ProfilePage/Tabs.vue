<template>
  <div class="tab-wrapper">
    <ul class="tab-menu">
      <li :class="[ tab === 'about' ? 'active': '']" @click="tab='about'">About</li>
      <li :class="[ tab === 'education' ? 'active': '']" @click="tab='education'">Interne opleidingen</li>
      <li :class="[ tab === 'diploma' ? 'active': '']" @click="tab='diploma'">Diploma’s</li>
    </ul>
    <ul v-if="tab === 'about'" class="about">
      <li>
        <div>In bezit van auto:</div>
        <div>{{specialist.drivers_license === "1" ? "Ja" : "Nee"}}</div>
      </li>
      <li>
        <div>Leeftijd:</div>
        <div>{{specialist.age}}</div>
      </li>
      <li>
        <div>Woonplaats:</div>
        <div>{{specialist.location}}</div>
      </li>
      <li>
        <div>Jaren ervaring:</div>
        <div>{{specialist.years_experience}}</div>
      </li>
      <li>
        <div>Relevante cursus/training:</div>
        <div>{{specialist.relevant_training}}</div>
      </li>
      <li>
        <div>Taal:</div>
        <div>
          <ul>
            <li v-for="lang in specialist.user_languages">{{lang}}</li>
          </ul>
        </div>
      </li>
    </ul>
    <div v-if="tab === 'education'" class="education">
      <div class=""
           v-for="certificate in specialist.user_education_certificats"
           v-if="certificate.type === 'certificate'"
           v-bind:key="certificate + Math.random()">
        <a target="_blank"
           :href="getBaseURL() + certificate.file_name">
          {{certificate.title || 'default name'}}
        </a>
      </div>
    </div>
    <div v-if="tab === 'diploma'" class="diploma">
      <div class=""
           v-for="diplom in specialist.user_education_certificats"
           v-if="diplom.type === 'diploma'"
           v-bind:key="diplom + Math.random()">
        <a target="_blank"
           :href="getBaseURL() + diplom.file_name">
          {{diplom.title || 'default name'}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data: function() {
          return {
            tab: 'about'
          }
        },
        props: ['specialist'],
    }
</script>

<style scoped lang="scss">
  .tab-wrapper {
    width: 100%;
    border-bottom: 1px solid #F7F7F7;
    margin-bottom: 10px;

    ul {
      list-style: none;
      padding: 0;
    }
  }

  .tab-menu {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0 0 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F7F7F7;

    li {
      font-size: 14px;
      padding: 0 0 8px;
      color: #646464;
      font-weight: 400;
    }

    .active {
      font-weight: 600;
      color: #333;
      position: relative;
    }

    .active:after {
      display: block;
      content: '';
      height: 2px;
      width: 100%;
      background: #36D0E1;
      position: absolute;
      left: 0;
      bottom: -1px;
    }
  }

  .about {
    > li {
      display: flex;
      justify-content: space-between;
      margin: 0 -15px;

      > div {
        padding: 0 15px;
      }

      > div:first-child {
        width: 40%;
        font-size: 12px;
        font-weight: 600;
        color: #333;
      }

      > div:last-child {
        width: 60%;
        font-size: 14px;
        font-weight: 400;
        color: #646464;

        ul {
          margin-left: 15px;
          list-style: disc;
        }
      }
    }
  }
</style>
