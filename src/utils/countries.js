// List of countries
const countries = [
    { name: 'Afghanistan', id: 1 }
    ,
    { name: 'land Islands', id: 2 }
    ,
    { name: 'Albania', id: 3 }
    ,
    { name: 'Algeria', id: 4 }
    ,
    { name: 'American Samoa', id: 5 }
    ,
    { name: 'Andorra', id: 6 }
    ,
    { name: 'Angola', id: 7 }
    ,
    { name: 'Anguilla', id: 8 }
    ,
    { name: 'Antarctica', id: 9 }
    ,
    { name: 'Antigua and Barbuda', id: 10 }
    ,
    { name: 'Argentina', id: 11 }
    ,
    { name: 'Armenia', id: 12 }
    ,
    { name: 'Aruba', id: 13 }
    ,
    { name: 'Australia', id: 14 }
    ,
    { name: 'Austria', id: 15 }
    ,
    { name: 'Azerbaijan', id: 16 }
    ,
    { name: 'Bahamas', id: 17 }
    ,
    { name: 'Bahrain', id: 18 }
    ,
    { name: 'Bangladesh', id: 19 }
    ,
    { name: 'Barbados', id: 20 }
    ,
    { name: 'Belarus', id: 21 }
    ,
    { name: 'Belgium', id: 22 }
    ,
    { name: 'Belize', id: 23 }
    ,
    { name: 'Benin', id: 24 }
    ,
    { name: 'Bermuda', id: 25 }
    ,
    { name: 'Bhutan', id: 26 }
    ,
    { name: 'Bolivia', id: 27 }
    ,
    { name: 'Bosnia and Herzegovina', id: 28 }
    ,
    { name: 'Botswana', id: 29 }
    ,
    { name: 'Bouvet Island', id: 30 }
    ,
    { name: 'Brazil', id: 31 }
    ,
    { name: 'British Indian Ocean Territory', id: 32 }
    ,
    { name: 'Brunei Darussalam', id: 33 }
    ,
    { name: 'Bulgaria', id: 34 }
    ,
    { name: 'Burkina Faso', id: 35 }
    ,
    { name: 'Burundi', id: 36 }
    ,
    { name: 'Cambodia', id: 37 }
    ,
    { name: 'Cameroon', id: 38 }
    ,
    { name: 'Canada', id: 39 }
    ,
    { name: 'Cape Verde', id: 40 }
    ,
    { name: 'Cayman Islands', id: 41 }
    ,
    { name: 'Central African Republic', id: 42 }
    ,
    { name: 'Chad', id: 43 }
    ,
    { name: 'Chile', id: 44 }
    ,
    { name: 'China', id: 45 }
    ,
    { name: 'Christmas Island', id: 46 }
    ,
    { name: 'Cocos (Keeling) Islands', id: 47 }
    ,
    { name: 'Colombia', id: 48 }
    ,
    { name: 'Comoros', id: 49 }
    ,
    { name: 'Congo', id: 50 }
    ,
    { name: 'Congo, The Democratic Republic of the', id: 51 }
    ,
    { name: 'Cook Islands', id: 52 }
    ,
    { name: 'Costa Rica', id: 53 }
    ,
    { name: 'Cote DIvoire', id: 54 }
    ,
    { name: 'Croatia', id: 55 }
    ,
    { name: 'Cuba', id: 56 }
    ,
    { name: 'Cyprus', id: 57 }
    ,
    { name: 'Czech Republic', id: 58 }
    ,
    { name: 'Denmark', id: 59 }
    ,
    { name: 'Djibouti', id: 60 }
    ,
    { name: 'Dominica', id: 61 }
    ,
    { name: 'Dominican Republic', id: 62 }
    ,
    { name: 'Ecuador', id: 63 }
    ,
    { name: 'Egypt', id: 64 }
    ,
    { name: 'El Salvador', id: 65 }
    ,
    { name: 'Equatorial Guinea', id: 66 }
    ,
    { name: 'Eritrea', id: 67 }
    ,
    { name: 'Estonia', id: 68 }
    ,
    { name: 'Ethiopia', id: 69 }
    ,
    { name: 'Falkland Islands (Malvinas)', id: 70 }
    ,
    { name: 'Faroe Islands', id: 71 }
    ,
    { name: 'Fiji', id: 72 }
    ,
    { name: 'Finland', id: 73 }
    ,
    { name: 'France', id: 74 }
    ,
    { name: 'French Guiana', id: 75 }
    ,
    { name: 'French Polynesia', id: 76 }
    ,
    { name: 'French Southern Territories', id: 77 }
    ,
    { name: 'Gabon', id: 78 }
    ,
    { name: 'Gambia', id: 79 }
    ,
    { name: 'Georgia', id: 80 }
    ,
    { name: 'Germany', id: 81 }
    ,
    { name: 'Ghana', id: 82 }
    ,
    { name: 'Gibraltar', id: 83 }
    ,
    { name: 'Greece', id: 84 }
    ,
    { name: 'Greenland', id: 85 }
    ,
    { name: 'Grenada', id: 86 }
    ,
    { name: 'Guadeloupe', id: 87 }
    ,
    { name: 'Guam', id: 88 }
    ,
    { name: 'Guatemala', id: 89 }
    ,
    { name: 'Guernsey', id: 90 }
    ,
    { name: 'Guinea', id: 91 }
    ,
    { name: 'Guinea-Bissau', id: 92 }
    ,
    { name: 'Guyana', id: 93 }
    ,
    { name: 'Haiti', id: 94 }
    ,
    { name: 'Heard Island and Mcdonald Islands', id: 95 }
    ,
    { name: 'Holy See (Vatican City State)', id: 96 }
    ,
    { name: 'Honduras', id: 97 }
    ,
    { name: 'Hong Kong', id: 98 }
    ,
    { name: 'Hungary', id: 99 }
    ,
    { name: 'Iceland', id: 100 }
    ,
    { name: 'India', id: 101 }
    ,
    { name: 'Indonesia', id: 102 }
    ,
    { name: 'Iran, Islamic Republic Of', id: 103 }
    ,
    { name: 'Iraq', id: 104 }
    ,
    { name: 'Ireland', id: 105 }
    ,
    { name: 'Isle of Man', id: 106 }
    ,
    { name: 'Israel', id: 107 }
    ,
    { name: 'Italy', id: 108 }
    ,
    { name: 'Jamaica', id: 109 }
    ,
    { name: 'Japan', id: 110 }
    ,
    { name: 'Jersey', id: 111 }
    ,
    { name: 'Jordan', id: 112 }
    ,
    { name: 'Kazakhstan', id: 113 }
    ,
    { name: 'Kenya', id: 114 }
    ,
    { name: 'Kiribati', id: 115 }
    ,
    { name: 'Korea, Democratic PeopleS Republic of', id: 116 }
    ,
    { name: 'Korea, Republic of', id: 117 }
    ,
    { name: 'Kuwait', id: 118 }
    ,
    { name: 'Kyrgyzstan', id: 119 }
    ,
    { name: 'Lao PeopleS Democratic Republic', id: 120 }
    ,
    { name: 'Latvia', id: 121 }
    ,
    { name: 'Lebanon', id: 122 }
    ,
    { name: 'Lesotho', id: 123 }
    ,
    { name: 'Liberia', id: 124 }
    ,
    { name: 'Libyan Arab Jamahiriya', id: 125 }
    ,
    { name: 'Liechtenstein', id: 126 }
    ,
    { name: 'Lithuania', id: 127 }
    ,
    { name: 'Luxembourg', id: 128 }
    ,
    { name: 'Macao', id: 129 }
    ,
    { name: 'Macedonia, The Former Yugoslav Republic of', id: 130 }
    ,
    { name: 'Madagascar', id: 131 }
    ,
    { name: 'Malawi', id: 132 }
    ,
    { name: 'Malaysia', id: 133 }
    ,
    { name: 'Maldives', id: 134 }
    ,
    { name: 'Mali', id: 135 }
    ,
    { name: 'Malta', id: 136 }
    ,
    { name: 'Marshall Islands', id: 137 }
    ,
    { name: 'Martinique', id: 138 }
    ,
    { name: 'Mauritania', id: 139 }
    ,
    { name: 'Mauritius', id: 140 }
    ,
    { name: 'Mayotte', id: 141 }
    ,
    { name: 'Mexico', id: 142 }
    ,
    { name: 'Micronesia, Federated States of', id: 143 }
    ,
    { name: 'Moldova, Republic of', id: 144 }
    ,
    { name: 'Monaco', id: 145 }
    ,
    { name: 'Mongolia', id: 146 }
    ,
    { name: 'Montenegro', id: 147 }
    ,
    { name: 'Montserrat', id: 148 }
    ,
    { name: 'Morocco', id: 149 }
    ,
    { name: 'Mozambique', id: 150 }
    ,
    { name: 'Myanmar', id: 151 }
    ,
    { name: 'Namibia', id: 152 }
    ,
    { name: 'Nauru', id: 153 }
    ,
    { name: 'Nepal', id: 154 }
    ,
    { name: 'Netherlands', id: 155 }
    ,
    { name: 'Netherlands Antilles', id: 156 }
    ,
    { name: 'New Caledonia', id: 157 }
    ,
    { name: 'New Zealand', id: 158 }
    ,
    { name: 'Nicaragua', id: 159 }
    ,
    { name: 'Niger', id: 160 }
    ,
    { name: 'Nigeria', id: 161 }
    ,
    { name: 'Niue', id: 162 }
    ,
    { name: 'Norfolk Island', id: 163 }
    ,
    { name: 'Northern Mariana Islands', id: 164 }
    ,
    { name: 'Norway', id: 165 }
    ,
    { name: 'Oman', id: 166 }
    ,
    { name: 'Pakistan', id: 167 }
    ,
    { name: 'Palau', id: 168 }
    ,
    { name: 'Palestinian Territory, Occupied', id: 169 }
    ,
    { name: 'Panama', id: 170 }
    ,
    { name: 'Papua New Guinea', id: 171 }
    ,
    { name: 'Paraguay', id: 172 }
    ,
    { name: 'Peru', id: 173 }
    ,
    { name: 'Philippines', id: 174 }
    ,
    { name: 'Pitcairn', id: 175 }
    ,
    { name: 'Poland', id: 176 }
    ,
    { name: 'Portugal', id: 177 }
    ,
    { name: 'Puerto Rico', id: 178 }
    ,
    { name: 'Qatar', id: 179 }
    ,
    { name: 'Reunion', id: 180 }
    ,
    { name: 'Romania', id: 181 }
    ,
    { name: 'Russian Federation', id: 182 }
    ,
    { name: 'RWANDA', id: 183 }
    ,
    { name: 'Saint Helena', id: 184 }
    ,
    { name: 'Saint Kitts and Nevis', id: 185 }
    ,
    { name: 'Saint Lucia', id: 186 }
    ,
    { name: 'Saint Pierre and Miquelon', id: 187 }
    ,
    { name: 'Saint Vincent and the Grenadines', id: 188 }
    ,
    { name: 'Samoa', id: 189 }
    ,
    { name: 'San Marino', id: 190 }
    ,
    { name: 'Sao Tome and Principe', id: 191 }
    ,
    { name: 'Saudi Arabia', id: 192 }
    ,
    { name: 'Senegal', id: 193 }
    ,
    { name: 'Serbia', id: 194 }
    ,
    { name: 'Seychelles', id: 195 }
    ,
    { name: 'Sierra Leone', id: 196 }
    ,
    { name: 'Singapore', id: 197 }
    ,
    { name: 'Slovakia', id: 198 }
    ,
    { name: 'Slovenia', id: 199 }
    ,
    { name: 'Solomon Islands', id: 200 }
    ,
    { name: 'Somalia', id: 201 }
    ,
    { name: 'South Africa', id: 202 }
    ,
    { name: 'South Georgia and the South Sandwich Islands', id: 203 }
    ,
    { name: 'Spain', id: 204 }
    ,
    { name: 'Sri Lanka', id: 205 }
    ,
    { name: 'Sudan', id: 206 }
    ,
    { name: 'Suriname', id: 207 }
    ,
    { name: 'Svalbard and Jan Mayen', id: 208 }
    ,
    { name: 'Swaziland', id: 209 }
    ,
    { name: 'Sweden', id: 210 }
    ,
    { name: 'Switzerland', id: 211 }
    ,
    { name: 'Syrian Arab Republic', id: 212 }
    ,
    { name: 'Taiwan, Province of China', id: 213 }
    ,
    { name: 'Tajikistan', id: 214 }
    ,
    { name: 'Tanzania, United Republic of', id: 215 }
    ,
    { name: 'Thailand', id: 216 }
    ,
    { name: 'Timor-Leste', id: 217 }
    ,
    { name: 'Togo', id: 218 }
    ,
    { name: 'Tokelau', id: 219 }
    ,
    { name: 'Tonga', id: 220 }
    ,
    { name: 'Trinidad and Tobago', id: 221 }
    ,
    { name: 'Tunisia', id: 222 }
    ,
    { name: 'Turkey', id: 223 }
    ,
    { name: 'Turkmenistan', id: 224 }
    ,
    { name: 'Turks and Caicos Islands', id: 225 }
    ,
    { name: 'Tuvalu', id: 226 }
    ,
    { name: 'Uganda', id: 227 }
    ,
    { name: 'Ukraine', id: 228 }
    ,
    { name: 'United Arab Emirates', id: 229 }
    ,
    { name: 'United Kingdom', id: 230 }
    ,
    { name: 'United States', id: 231 }
    ,
    { name: 'United States Minor Outlying Islands', id: 232 }
    ,
    { name: 'Uruguay', id: 233 }
    ,
    { name: 'Uzbekistan', id: 234 }
    ,
    { name: 'Vanuatu', id: 235 }
    ,
    { name: 'Venezuela', id: 236 }
    ,
    { name: 'Viet Nam', id: 237 }
    ,
    { name: 'Virgin Islands, British', id: 238 }
    ,
    { name: 'Virgin Islands, U.S.', id: 239 }
    ,
    { name: 'Wallis and Futuna', id: 240 }
    ,
    { name: 'Western Sahara', id: 241 }
    ,
    { name: 'Yemen', id: 242 }
    ,
    { name: 'Zambia', id: 243 }
    ,
    { name: 'Zimbabwe', id: 244 }
    ,
]

export default countries;
