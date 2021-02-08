// List of languages
const languages = [
    { id: 1, name: 'Abkhazian' }
    ,
    { id: 2, name: 'Afar' }
    ,
    { id: 3, name: 'Afrikaans' }
    ,
    { id: 4, name: 'Akan' }
    ,
    { id: 5, name: 'Albanian' }
    ,
    { id: 6, name: 'Amharic' }
    ,
    { id: 7, name: 'Arabic' }
    ,
    { id: 8, name: 'Aragonese' }
    ,
    { id: 9, name: 'Armenian' }
    ,
    { id: 10, name: 'Assamese' }
    ,
    { id: 11, name: 'Avaric' }
    ,
    { id: 12, name: 'Avestan' }
    ,
    { id: 13, name: 'Aymara' }
    ,
    { id: 14, name: 'Azerbaijani' }
    ,
    { id: 15, name: 'Bambara' }
    ,
    { id: 16, name: 'Bashkir' }
    ,
    { id: 17, name: 'Basque' }
    ,
    { id: 18, name: 'Belarusian' }
    ,
    { id: 19, name: 'Bengali' }
    ,
    { id: 20, name: 'Bihari' }
    ,
    { id: 21, name: 'Bislama' }
    ,
    { id: 22, name: 'Bosnian' }
    ,
    { id: 23, name: 'Breton' }
    ,
    { id: 24, name: 'Bulgarian' }
    ,
    { id: 25, name: 'Burmese' }
    ,
    { id: 26, name: 'Catalan' }
    ,
    { id: 27, name: 'Central Khmer' }
    ,
    { id: 28, name: 'Chamorro' }
    ,
    { id: 29, name: 'Chechen' }
    ,
    { id: 30, name: 'Chichewa' }
    ,
    { id: 31, name: 'Chinese' }
    ,
    { id: 32, name: 'Old Bulgarian' }
    ,
    { id: 33, name: 'Chuvash' }
    ,
    { id: 34, name: 'Cornish' }
    ,
    { id: 35, name: 'Corsican' }
    ,
    { id: 36, name: 'Cree' }
    ,
    { id: 37, name: 'Croatian' }
    ,
    { id: 38, name: 'Czech' }
    ,
    { id: 39, name: 'Danish' }
    ,
    { id: 40, name: 'Divehi' }
    ,
    { id: 41, name: 'Dutch' }
    ,
    { id: 42, name: 'Dzongkha' }
    ,
    { id: 43, name: 'English' }
    ,
    { id: 44, name: 'Esperanto' }
    ,
    { id: 45, name: 'Estonian' }
    ,
    { id: 46, name: 'Ewe' }
    ,
    { id: 47, name: 'Faroese' }
    ,
    { id: 48, name: 'Fijian' }
    ,
    { id: 49, name: 'Finnish' }
    ,
    { id: 50, name: 'French' }
    ,
    { id: 51, name: 'Fulah' }
    ,
    { id: 52, name: 'Gaelic' }
    ,
    { id: 53, name: 'Galician' }
    ,
    { id: 54, name: 'Ganda' }
    ,
    { id: 55, name: 'Georgian' }
    ,
    { id: 56, name: 'German' }
    ,
    { id: 57, name: 'Gikuyu' }
    ,
    { id: 58, name: 'Greek' }
    ,
    { id: 59, name: 'Greenlandic' }
    ,
    { id: 60, name: 'Guarani' }
    ,
    { id: 61, name: 'Gujarati' }
    ,
    { id: 62, name: 'Haitian' }
    ,
    { id: 63, name: 'Hausa' }
    ,
    { id: 64, name: 'Hebrew' }
    ,
    { id: 65, name: 'Herero' }
    ,
    { id: 66, name: 'Hindi' }
    ,
    { id: 67, name: 'Hiri Motu' }
    ,
    { id: 68, name: 'Hungarian' }
    ,
    { id: 69, name: 'Icelandic' }
    ,
    { id: 70, name: 'Ido' }
    ,
    { id: 71, name: 'Igbo' }
    ,
    { id: 72, name: 'Indonesian' }
    ,
    {
        id: 73,
        name: 'Interlingua '
    }
    ,
    { id: 74, name: 'Interlingue' }
    ,
    { id: 75, name: 'Inuktitut' }
    ,
    { id: 76, name: 'Inupiaq' }
    ,
    { id: 77, name: 'Irish' }
    ,
    { id: 78, name: 'Italian' }
    ,
    { id: 79, name: 'Japanese' }
    ,
    { id: 80, name: 'Javanese' }
    ,
    { id: 81, name: 'Kannada' }
    ,
    { id: 82, name: 'Kanuri' }
    ,
    { id: 83, name: 'Kashmiri' }
    ,
    { id: 84, name: 'Kazakh' }
    ,
    { id: 85, name: 'Kinyarwanda' }
    ,
    { id: 86, name: 'Komi' }
    ,
    { id: 87, name: 'Kongo' }
    ,
    { id: 88, name: 'Korean' }
    ,
    { id: 89, name: 'Kwanyama' }
    ,
    { id: 90, name: 'Kurdish' }
    ,
    { id: 91, name: 'Kyrgyz' }
    ,
    { id: 92, name: 'Lao' }
    ,
    { id: 93, name: 'Latin' }
    ,
    { id: 94, name: 'Latvian' }
    ,
    { id: 95, name: 'Luxembourgish' }
    ,
    { id: 96, name: 'Limburgish ' }
    ,
    { id: 97, name: 'Lingala' }
    ,
    { id: 98, name: 'Lithuanian' }
    ,
    { id: 99, name: 'Luba-Katanga' }
    ,
    { id: 100, name: 'Macedonian' }
    ,
    { id: 101, name: 'Malagasy' }
    ,
    { id: 102, name: 'Malay' }
    ,
    { id: 103, name: 'Malayalam' }
    ,
    { id: 104, name: 'Maltese' }
    ,
    { id: 105, name: 'Manx' }
    ,
    { id: 106, name: 'Maori' }
    ,
    { id: 107, name: 'Marathi' }
    ,
    { id: 108, name: 'Marshallese' }
    ,
    { id: 109, name: 'Romanian' }
    ,
    { id: 110, name: 'Mongolian' }
    ,
    { id: 111, name: 'Nauru' }
    ,
    { id: 112, name: 'Navajo' }
    ,
    { id: 113, name: 'Northern Ndebele' }
    ,
    { id: 114, name: 'Ndonga' }
    ,
    { id: 115, name: 'Nepali' }
    ,
    { id: 116, name: 'Northern Sami' }
    ,
    { id: 117, name: 'Norwegian' }
    ,
    { id: 118, name: 'Norwegian Bokmål' }
    ,
    { id: 119, name: 'Norwegian Nynorsk' }
    ,
    { id: 120, name: 'Nuosu, Sichuan Yi' }
    ,
    { id: 121, name: 'Occitan' }
    ,
    { id: 122, name: 'Ojibwa' }
    ,
    { id: 123, name: 'Oriya' }
    ,
    { id: 124, name: 'Oromo' }
    ,
    { id: 125, name: 'Ossetian' }
    ,
    { id: 126, name: 'Pali' }
    ,
    { id: 127, name: 'Panjabi' }
    ,
    { id: 128, name: 'Pashto' }
    ,
    { id: 129, name: 'Persian' }
    ,
    { id: 130, name: 'Polish' }
    ,
    { id: 131, name: 'Portuguese' }
    ,
    { id: 132, name: 'Quechua' }
    ,
    { id: 133, name: 'Romansh' }
    ,
    { id: 134, name: 'Rundi' }
    ,
    { id: 135, name: 'Russian' }
    ,
    { id: 136, name: 'Samoan' }
    ,
    { id: 137, name: 'Sango' }
    ,
    { id: 138, name: 'Sanskrit' }
    ,
    { id: 139, name: 'Sardinian' }
    ,
    { id: 140, name: 'Serbian' }
    ,
    { id: 141, name: 'Shona' }
    ,
    { id: 142, name: 'Sindhi' }
    ,
    { id: 143, name: 'Sinhala' }
    ,
    { id: 144, name: 'Slovak' }
    ,
    { id: 145, name: 'Slovenian' }
    ,
    { id: 146, name: 'Somali' }
    ,
    { id: 147, name: 'Sotho' }
    ,
    { id: 148, name: 'South Ndebele' }
    ,
    { id: 149, name: 'Spanish' }
    ,
    { id: 150, name: 'Sundanese' }
    ,
    { id: 151, name: 'Swahili' }
    ,
    { id: 152, name: 'Swati' }
    ,
    { id: 153, name: 'Swedish' }
    ,
    { id: 154, name: 'Tagalog' }
    ,
    { id: 155, name: 'Tahitian' }
    ,
    { id: 156, name: 'Tajik' }
    ,
    { id: 157, name: 'Tamil' }
    ,
    { id: 158, name: 'Tatar' }
    ,
    { id: 159, name: 'Telugu' }
    ,
    { id: 160, name: 'Thai' }
    ,
    { id: 161, name: 'Tibetan' }
    ,
    { id: 162, name: 'Tigrinya' }
    ,
    { id: 163, name: 'Tonga' }
    ,
    { id: 164, name: 'Tsonga' }
    ,
    { id: 165, name: 'Tswana' }
    ,
    { id: 166, name: 'Turkish' }
    ,
    { id: 167, name: 'Turkmen' }
    ,
    { id: 168, name: 'Twi' }
    ,
    { id: 169, name: 'Uighur' }
    ,
    { id: 170, name: 'Ukrainian' }
    ,
    { id: 171, name: 'Urdu' }
    ,
    { id: 172, name: 'Uzbek' }
    ,
    { id: 173, name: 'Venda' }
    ,
    { id: 174, name: 'Vietnamese' }
    ,
    { id: 175, name: 'Volap_k' }
    ,
    { id: 176, name: 'Walloon' }
    ,
    { id: 177, name: 'Welsh' }
    ,
    { id: 178, name: 'Western Frisian' }
    ,
    { id: 179, name: 'Wolof' }
    ,
    { id: 180, name: 'Xhosa' }
    ,
    { id: 181, name: 'Yiddish' }
    ,
    { id: 182, name: 'Yoruba' }
    ,
    { id: 183, name: 'Zhuang' }
    ,
    { id: 184, name: 'Zulu' },
];

export default languages;