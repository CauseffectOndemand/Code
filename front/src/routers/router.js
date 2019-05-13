const Home = () => import('../components/HomePage/index.vue');
const OnsVerhaal = () => import('../components/OnsVerhaalPage/index.vue');
const Contact = () => import('../components/ContactPage/index.vue');
const RegistrationSpecialist = () => import('../components/RegistrationSpecialistPage/index.vue');
const Specialist = () => import('../components/SpecialistsPage/index.vue');
const Profile = () => import('../components/ProfilePage/index.vue');
const OrderSpecialist = () => import('../components/OrderSpecialistPage/index.vue');
// const HuurEenSpecialist = () => import('../components/HuurEenSpecialist.vue');
// const ConfirmationSpecialist = () => import('../components/ConfirmationSpecialist.vue');


export default [
    { path: '/', 
      component: Home, 
      meta: {
        title: 'Causeffect: Boek direct jouw in-house communicatiespecialist',
        metaTags: [
          {
            name: 'description',
            content: 'Via Causeffect on demand boek je nu eenvoudig een communicatiespecialist online al vanaf 27,50 per uur. ✓ geen dure agency kosten ✓ Gescreende specialisten ✓ 5 dagen per week Klantenservice!'
          }
        ]
      },
    },
    { path: '/freelancers', 
      component: Specialist,
      meta: {
        title: 'Freelancer nodig? Boek direct jouw in-house communicatie freelancer',
        metaTags: [
          {
            name: 'description',
            content: 'Via Causeffect on demand boek je nu eenvoudig een communicatie Freelancer online al vanaf 27,50 per uur. ✓ geen dure agency kosten ✓ Gescreende specialisten ✓ 5 dagen per week Klantenservice!'
          }
        ]
      }, 
      beforeRouteUpdate: (to, from, next) => {
      },
    },
    { path: '/freelancers/:role', 
      component: Specialist, 
      props: true, 
      meta: {
        title: 'Freelancer nodig? Boek direct jouw in-house communicatie freelancer',
        metaTags: [
          {
            name: 'description',
            content: 'Via Causeffect on demand boek je nu eenvoudig een communicatie Freelancer online al vanaf 27,50 per uur. ✓ geen dure agency kosten ✓ Gescreende specialisten ✓ 5 dagen per week Klantenservice!'
          }
        ]
      },  
      beforeRouteUpdate: (to, from, next) => {
        next();
      } 
    },
    { path: '/onsVerhaal', component: OnsVerhaal },
    { path: '/orderSpecialist/:id', component: Profile },
    { path: '/contact', component: Contact },
    { path: '/specialist', component: RegistrationSpecialist },
    { path: '/profile', component: OrderSpecialist },
    { path: '/profile', component: OrderSpecialist },
    // { path: '/registrationSpecialist', component: HuurEenSpecialist },
    // { path: '/confirmationSpecialist', component: HuurEenSpecialist },
];
