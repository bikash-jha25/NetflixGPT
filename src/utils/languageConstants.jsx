const lang = {
  en: {//en is key => en.search=search
    search: "Search",
    placeholder: "What would you like to watch:",
  },
  hi: {
    search: "खोजें",//hi is key => hi.search=खोजें
    placeholder: "आप क्या देखना चाहते हैं:",
  },
  fr: {
    search: "Rechercher",
    placeholder: "Que voulez-vous regarder:",
  },
};

export default lang;

export const supportedLangArray = [
  { identifier: "en", name: "English" },
  { identifier: "hi", name: "Hindi" },
  { identifier: "fr", name: "French" },
];
