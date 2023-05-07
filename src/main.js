import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import CalculatorPage from './pages/CalculatorPage.vue';
import CharacterInfoPage from './pages/CharacterInfoPage.vue';
import ModalInfo from './components/ModalInfo.vue';


const app = createApp(App);

app.use(store);
app.use(router);

app.component('calculator-page', CalculatorPage);
app.component('character-page', CharacterInfoPage);
app.component('info-page', ModalInfo);

app.mount('#app')
