import { createApp } from "vue";
import App from './App.vue'
import './styles/general_style.scss';
import {addText} from './modules/module_addText';
import ENG from './texts/ENG.txt';
import EST from './texts/EST.txt';
import FRA from './texts/FRA.txt';
import GER from './texts/GER.txt';

createApp(App).mount('#app');