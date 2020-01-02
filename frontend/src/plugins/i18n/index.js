import Vue from 'vue'
import VueI18n from 'vue-i18n'

import de from './de.json'
import en from './en.json'
import pl from './pl.json'

Vue.use(VueI18n)

const messages = {
  en,
  de,
  pl
}

const i18n = new VueI18n({
  locale: 'en',
  messages
});

export default i18n