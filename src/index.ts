const fetchLanguage = (languageCode) => {
  const applicationCode = localStorage.getItem('sx-application-code');
  const applicationServer = localStorage.getItem('sx-application-server');
  return fetch(`${applicationServer}/api/Applications/GetLanguageByApplicationCodeAndLanguageKey/${applicationCode}/${languageCode}`);
}

const setLanguage = (i18n, languageCode) => {
  if (localStorage.getItem(`locale-${languageCode}`)) {
    const locales = JSON.parse(localStorage.getItem(`locale-${languageCode}`));
    setLocaleMessage(i18n, languageCode, locales);
  } else {
    fetchLanguage(languageCode)
      .then(response => response.json())
      .then(data => {
        setLocaleMessage(i18n, languageCode, data);
        localStorage.setItem(`locale-${languageCode}`, JSON.stringify(data));
      });
  }
}

const setLocaleMessage = (i18n, languageCode, locales) => {
  const messages = {
    [languageCode]: locales
  };
  i18n.locale = languageCode;
  i18n.setLocaleMessage(languageCode, messages[languageCode]);
}

const useSlmAdapter = (Vue, VueI18n, { applicationServer, applicationCode, fallbackLocale, loadOnMount = true }) => {
  Vue.use(VueI18n);
  localStorage.setItem('sx-application-code', applicationCode);
  localStorage.setItem('sx-application-server', applicationServer);
  const i18n = new VueI18n({
    locale: fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: {},
  });
  Vue.filter("sx-translate", (value) => !value ? '' : i18n.t(value));
  if (loadOnMount) {
    setLanguage(i18n, fallbackLocale);
  }
  return i18n;
}

export default useSlmAdapter;
export { setLanguage };