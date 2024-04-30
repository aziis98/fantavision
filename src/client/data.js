/*

Albania - Besa - Titan
Armenia - Ladaniva - Jako
Australia - Electric Fields - One Milkali
Austria - Kaleen - We will rave
Azerbaijan - FAHREE - Ozulnle Apar
Belgium - Mustii - Before the party is over 
Croatia - Baby Lasagna - Rim Tim Tagi Dim
Cyprus - Silia Kapsis - Liar
Czechia - Aiko - Pedestal
Denmark - Saba - Sand 
Estonia - 5MINUST x PUULUP - narkootikumidest…
Finland - Windows95man - No Rules!
France - Slimane - Mon amour
Georgia - Nutsa Buzaladze - Firefighter
Germany - ISAAK - Always on the run
Greece - Marina Satti - ZARI
Iceland - Hera Bjork - Scared of Heights
Ireland - Bambie Thug - Doomsday Blue 
Israel - Eden Golan - Hurricane  
Italy - Angelina Mango - La noia 
Latvia - Dons - Hollow
Lithuania - Silvester Belt - Luktelk 
Luxembourg - TALI - Fighter 
Malta - Sarah Bonnici - Loop 
Moldova - Natalia Barbu - In the middle 
Netherlands - Joost Klein - Europapa
Norway - Gate - Ulveham 
Poland - LUNA - The Tower 
Portugal - iolanda - Grito 
San Marino - MEGARA - 11.11
Serbia - TEYA DORA -RAMONDA
Slovenia - Raiven - Veronika 
Spain - Nebulossa - ZORRA
Sweden - Marcus & Martinus - Unforgettable 
Switzerland - Nemo - The Code 
Ukraine - alyona alyona & Jerry Heil - Teresa & Maria 
United Kingdom - Olly Alexander - Dizzy

*/

export const CANTANTI = [
    { id: 'albania', nazione: 'Albania', cantante: 'Besa', canzone: 'Titan' },
    { id: 'armenia', nazione: 'Armenia', cantante: 'Ladaniva', canzone: 'Jako' },
    { id: 'australia', nazione: 'Australia', cantante: 'Electric Fields', canzone: 'One Milkali' },
    { id: 'austria', nazione: 'Austria', cantante: 'Kaleen', canzone: 'We will rave' },
    { id: 'azerbaijan', nazione: 'Azerbaijan', cantante: 'FAHREE', canzone: 'Ozulnle Apar' },
    { id: 'belgium', nazione: 'Belgium', cantante: 'Mustii', canzone: 'Before the party is over' },
    { id: 'croatia', nazione: 'Croatia', cantante: 'Baby Lasagna', canzone: 'Rim Tim Tagi Dim' },
    { id: 'cyprus', nazione: 'Cyprus', cantante: 'Silia Kapsis', canzone: 'Liar' },
    { id: 'czechia', nazione: 'Czechia', cantante: 'Aiko', canzone: 'Pedestal' },
    { id: 'denmark', nazione: 'Denmark', cantante: 'Saba', canzone: 'Sand' },
    { id: 'estonia', nazione: 'Estonia', cantante: '5MINUST x PUULUP', canzone: 'narkootikumidest…' },
    { id: 'finland', nazione: 'Finland', cantante: 'Windows95man', canzone: 'No Rules!' },
    { id: 'france', nazione: 'France', cantante: 'Slimane', canzone: 'Mon amour' },
    { id: 'georgia', nazione: 'Georgia', cantante: 'Nutsa Buzaladze', canzone: 'Firefighter' },
    { id: 'germany', nazione: 'Germany', cantante: 'ISAAK', canzone: 'Always on the run' },
    { id: 'greece', nazione: 'Greece', cantante: 'Marina Satti', canzone: 'ZARI' },
    { id: 'iceland', nazione: 'Iceland', cantante: 'Hera Bjork', canzone: 'Scared of Heights' },
    { id: 'ireland', nazione: 'Ireland', cantante: 'Bambie Thug', canzone: 'Doomsday Blue' },
    { id: 'israel', nazione: 'Israel', cantante: 'Eden Golan', canzone: 'Hurricane' },
    { id: 'italy', nazione: 'Italy', cantante: 'Angelina Mango', canzone: 'La noia' },
    { id: 'latvia', nazione: 'Latvia', cantante: 'Dons', canzone: 'Hollow' },
    { id: 'lithuania', nazione: 'Lithuania', cantante: 'Silvester Belt', canzone: 'Luktelk' },
    { id: 'luxembourg', nazione: 'Luxembourg', cantante: 'TALI', canzone: 'Fighter' },
    { id: 'malta', nazione: 'Malta', cantante: 'Sarah Bonnici', canzone: 'Loop' },
    { id: 'moldova', nazione: 'Moldova', cantante: 'Natalia Barbu', canzone: 'In the middle' },
    { id: 'netherlands', nazione: 'Netherlands', cantante: 'Joost Klein', canzone: 'Europapa' },
    { id: 'norway', nazione: 'Norway', cantante: 'Gate', canzone: 'Ulveham' },
    { id: 'poland', nazione: 'Poland', cantante: 'LUNA', canzone: 'The Tower' },
    { id: 'portugal', nazione: 'Portugal', cantante: 'iolanda', canzone: 'Grito' },
    { id: 'san-marino', nazione: 'San Marino', cantante: 'MEGARA', canzone: '11.11' },
    { id: 'serbia', nazione: 'Serbia', cantante: 'TEYA DORA', canzone: 'RAMONDA' },
    { id: 'slovenia', nazione: 'Slovenia', cantante: 'Raiven', canzone: 'Veronika' },
    { id: 'spain', nazione: 'Spain', cantante: 'Nebulossa', canzone: 'ZORRA' },
    { id: 'sweden', nazione: 'Sweden', cantante: 'Marcus & Martinus', canzone: 'Unforgettable' },
    { id: 'switzerland', nazione: 'Switzerland', cantante: 'Nemo', canzone: 'The Code' },
    { id: 'ukraine', nazione: 'Ukraine', cantante: 'alyona alyona & Jerry Heil', canzone: 'Teresa & Maria' },
    { id: 'united-kingdom', nazione: 'United Kingdom', cantante: 'Olly Alexander', canzone: 'Dizzy' },
]

export const CANTANTI_MAP = Object.fromEntries(CANTANTI.map(cantante => [cantante.id, cantante]))
