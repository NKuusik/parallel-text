import { createApp } from "vue";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import './styles/general_style.scss';
import ENG from './texts/ENG.txt';
import EST from './texts/EST.txt';
import FRA from './texts/FRA.txt';
import GER from './texts/GER.txt';

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App).use(vuetify).mount('#app');