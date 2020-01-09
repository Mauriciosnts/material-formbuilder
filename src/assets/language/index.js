const optionLanguage = [
	{ key: 'pt-BR', value: 'pt-BR' },
	{ key: 'pt', value: 'pt-BR' },
	{ key: 'es', value: 'es' },
	{ key: 'en', value: 'en' },
	{ key: 'en-US', value: 'en' }
];

let chosenLanguage = optionLanguage.find((e) => e.key === navigator.language);
chosenLanguage = chosenLanguage ? chosenLanguage.value : 'en';

export const languageName = chosenLanguage;
export const language = require('./' + chosenLanguage + '.json');
