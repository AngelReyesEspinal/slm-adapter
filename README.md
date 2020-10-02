# ❗️ Dependencies

You must install the internationalization plugin vue-i18n with de command.

```sh
npm i vue-i18n
```

# 📖 Implementation

Copy the following code in the entry point of your application for example: **main.ts** or **main.js**.

```sh
import VueI18n from "vue-i18n"
import useSlmAdapter from "slm-adapter"

const i18n = useSlmAdapter(Vue, VueI18n, {
  applicationServer: 'the server of the SLM API from where your are trying to get the translations',
  applicationCode: 'your application code',
  fallbackLocale: 'your default locale',
  loadOnMount: 'by default is true'
}) 
```

Now you must pass the const **i18n** obtained from the useSlmAdapter() method to the new Vue instance, 
your entry point should look like this:

```sh
import Vue from 'vue'
import App from './App.vue'
import VueI18n from "vue-i18n"
import useSlmAdapter from "slm-adapter"

Vue.config.productionTip = false

const i18n = useSlmAdapter(Vue, VueI18n, {
  applicationServer: 'the server of the SLM API from where your are trying to get the translations',
  applicationCode: 'your application code',
  fallbackLocale: 'your default locale',
  loadOnMount: 'by default is true'
}) 

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
```

# 🔥 Usage

In your vue template you need to put your key and label as you specified in **SLM** and the filter sx-translate

```sh
<template>
  <div>
    <p>{{ "placeholder.value" | sx-translate }}</p>
  </div>
</template>
```

In the component that selects the current language of the application, import the following function:

```sh
import { setLanguage } from 'slm-adapter'
```

Now create a method that receives the locale you want to display. In my case changeLocale:

```sh
    changeLocale(locale) {
        setLanguage(this.$i18n, locale)
    }
```
📢 Note that  **Vue-I18n** instance must be passed to it in the first parameter.

[public repository](https://github.com/AngelReyesEspinal/slm-adapter)


