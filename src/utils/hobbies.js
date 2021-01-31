const hobbies = [
    { id: 1, name: '3D printing' }
    ,
    { id: 2, name: 'Amateur radio' }
    ,
    { id: 3, name: 'Scrapbook' }
    ,
    { id: 4, name: 'Amateur radio' }
    ,
    { id: 5, name: 'Acting' }
    ,
    { id: 6, name: 'Baton twirling' }
    ,
    { id: 7, name: 'Board games' }
    ,
    { id: 8, name: 'Book restoration' }
    ,
    { id: 9, name: 'Cabaret' }
    ,
    { id: 10, name: 'Calligraphy' }
    ,
    { id: 11, name: 'Candle making' }
    ,
    { id: 12, name: 'Computer programming' }
    ,
    { id: 13, name: 'Coffee roasting' }
    ,
    { id: 14, name: 'Cooking' }
    ,
    { id: 15, name: 'Colouring' }
    ,
    { id: 16, name: 'Cosplaying' }
    ,
    { id: 17, name: 'Couponing' }
    ,
    { id: 18, name: 'Creative writing' }
    ,
    { id: 19, name: 'Crocheting' }
    ,
    { id: 20, name: 'Cryptography' }
    ,
    { id: 21, name: 'Dance' }
    ,
    { id: 22, name: 'Digital arts' }
    ,
    { id: 23, name: 'Drama' }
    ,
    { id: 24, name: 'Drawing' }
    ,
    { id: 25, name: 'Do it yourself' }
    ,
    { id: 26, name: 'Electronics' }
    ,
    { id: 27, name: 'Embroidery' }
    ,
    { id: 28, name: 'Fashion' }
    ,
    { id: 29, name: 'Flower arranging' }
    ,
    { id: 30, name: 'Foreign language learning' }
    ,
    { id: 31, name: 'Gaming' }
    ,
    { id: 32, name: 'Tabletop games' }
    ,
    { id: 33, name: 'Role-playing games' }
    ,
    { id: 34, name: 'Gambling' }
    ,
    { id: 35, name: 'Genealogy' }
    ,
    { id: 36, name: 'Glassblowing' }
    ,
    { id: 37, name: 'Gunsmithing' }
    ,
    { id: 38, name: 'Homebrewing' }
    ,
    { id: 39, name: 'Ice skating' }
    ,
    { id: 40, name: 'Jewelry making' }
    ,
    { id: 41, name: 'Jigsaw puzzles' }
    ,
    { id: 42, name: 'Juggling' }
    ,
    { id: 43, name: 'Knapping' }
    ,
    { id: 44, name: 'Knitting' }
    ,
    { id: 45, name: 'Kabaddi' }
    ,
    { id: 46, name: 'Knife making' }
    ,
    { id: 47, name: 'Lacemaking' }
    ,
    { id: 48, name: 'Lapidary' }
    ,
    { id: 49, name: 'Leather crafting' }
    ,
    { id: 50, name: 'Lego building' }
    ,
    { id: 51, name: 'Lockpicking' }
    ,
    { id: 52, name: 'Machining' }
    ,
    { id: 53, name: 'Macrame' }
    ,
    { id: 54, name: 'Metalworking' }
    ,
    { id: 55, name: 'Magic' }
    ,
    { id: 56, name: 'Model building' }
    ,
    { id: 57, name: 'Listening to music' }
    ,
    { id: 58, name: 'Origami' }
    ,
    { id: 59, name: 'Painting' }
    ,
    { id: 60, name: 'Playing musical instruments' }
    ,
    { id: 61, name: 'Pet' }
    ,
    { id: 62, name: 'Poi' }
    ,
    { id: 63, name: 'Pottery' }
    ,
    { id: 64, name: 'Puzzles' }
    ,
    { id: 65, name: 'Quilting' }
    ,
    { id: 66, name: 'Reading' }
    ,
    { id: 67, name: 'Scrapbooking' }
    ,
    { id: 68, name: 'Sculpting' }
    ,
    { id: 69, name: 'Sewing' }
    ,
    { id: 70, name: 'Singing' }
    ,
    { id: 71, name: 'Sketching' }
    ,
    { id: 72, name: 'Soapmaking' }
    ,
    { id: 73, name: 'Sports' }
    ,
    { id: 74, name: 'Stand-up comedy' }
    ,
    { id: 75, name: 'Sudoku' }
    ,
    { id: 76, name: 'Table tennis' }
    ,
    { id: 77, name: 'Taxidermy' }
    ,
    { id: 78, name: 'Video gaming' }
    ,
    { id: 79, name: 'Watching movies' }
    ,
    { id: 80, name: 'Web surfing' }
    ,
    { id: 81, name: 'Whittling' }
    ,
    { id: 82, name: 'Wood carving' }
    ,
    { id: 83, name: 'Woodworking' }
    ,
    { id: 84, name: 'World Building' }
    ,
    { id: 85, name: 'Writing' }
    ,
    { id: 86, name: 'Yoga' }
    ,
    { id: 87, name: 'Yo-yoing' }
    ,
    { id: 88, name: 'Air sports' }
    ,
    { id: 89, name: 'Archery' }
    ,
    { id: 90, name: 'Astronomy' }
    ,
    { id: 91, name: 'Backpacking' }
    ,
    { id: 92, name: 'Base jumping' }
    ,
    { id: 93, name: 'Baseball' }
    ,
    { id: 94, name: 'Basketball' }
    ,
    { id: 95, name: 'Beekeeping' }
    ,
    { id: 96, name: 'Bird watching' }
    ,
    { id: 97, name: 'Blacksmithing' }
    ,
    { id: 98, name: 'Board sports' }
    ,
    { id: 99, name: 'Bodybuilding' }
    ,
    { id: 100, name: 'Brazilian jiu-jitsu' }
    ,
    { id: 101, name: 'Community' }
    ,
    { id: 102, name: 'Cycling' }
    ,
    { id: 103, name: 'Dowsing' }
    ,
    { id: 104, name: 'Driving' }
    ,
    { id: 105, name: 'Fishing' }
    ,
    { id: 106, name: 'Flag football' }
    ,
    { id: 107, name: 'Flying' }
    ,
    { id: 108, name: 'Flying disc' }
    ,
    { id: 109, name: 'Foraging' }
    ,
    { id: 110, name: 'Gardening' }
    ,
    { id: 111, name: 'Geocaching' }
    ,
    { id: 112, name: 'Ghost hunting' }
    ,
    { id: 113, name: 'Graffiti' }
    ,
    { id: 114, name: 'Handball' }
    ,
    { id: 115, name: 'Hiking' }
    ,
    { id: 116, name: 'Hooping' }
    ,
    { id: 117, name: 'Horseback riding' }
    ,
    { id: 118, name: 'Hunting' }
    ,
    { id: 119, name: 'Inline skating' }
    ,
    { id: 120, name: 'Jogging' }
    ,
    { id: 121, name: 'Kayaking' }
    ,
    { id: 122, name: 'Kite flying' }
    ,
    { id: 123, name: 'Kitesurfing' }
    ,
    { id: 124, name: 'Larping' }
    ,
    { id: 125, name: 'Letterboxing' }
    ,
    { id: 126, name: 'Metal detecting' }
    ,
    { id: 127, name: 'Motor sports' }
    ,
    { id: 128, name: 'Mountain biking' }
    ,
    { id: 129, name: 'Mountaineering' }
    ,
    { id: 130, name: 'Mushroom hunting' }
    ,
    { id: 131, name: 'Mycology' }
    ,
    { id: 132, name: 'Netball' }
    ,
    { id: 133, name: 'Nordic skating' }
    ,
    { id: 134, name: 'Orienteering' }
    ,
    { id: 135, name: 'Paintball' }
    ,
    { id: 136, name: 'Parkour' }
    ,
    { id: 137, name: 'Photography' }
    ,
    { id: 138, name: 'Polo' }
    ,
    { id: 139, name: 'Rafting' }
    ,
    { id: 140, name: 'Rappelling' }
    ,
    { id: 141, name: 'Rock climbing' }
    ,
    { id: 142, name: 'Roller skating' }
    ,
    { id: 143, name: 'Rugby' }
    ,
    { id: 144, name: 'Running' }
    ,
    { id: 145, name: 'Sailing' }
    ,
    { id: 146, name: 'Sand art' }
    ,
    { id: 147, name: 'Scouting' }
    ,
    { id: 148, name: 'Scuba diving' }
    ,
    { id: 149, name: 'Sculling' }
    ,
    { id: 150, name: 'Rowing' }
    ,
    { id: 151, name: 'Shooting' }
    ,
    { id: 152, name: 'Shopping' }
    ,
    { id: 153, name: 'Skateboarding' }
    ,
    { id: 154, name: 'Skiing' }
    ,
    { id: 155, name: 'Skim Boarding' }
    ,
    { id: 156, name: 'Skydiving' }
    ,
    { id: 157, name: 'Slacklining' }
    ,
    { id: 158, name: 'Snowboarding' }
    ,
    { id: 159, name: 'Stone skipping' }
    ,
    { id: 160, name: 'Surfing' }
    ,
    { id: 161, name: 'Swimming' }
    ,
    { id: 162, name: 'Taekwondo' }
    ,
    { id: 163, name: 'Tai chi' }
    ,
    { id: 164, name: 'Urban exploration' }
    ,
    { id: 165, name: 'Vacation' }
    ,
    { id: 166, name: 'Vehicle restoration' }
    ,
    { id: 167, name: 'Water sports' }
    ,
];

export default hobbies;

/*
var i = 1;
for (let entry of hobbies) {
    entry = { "id": i, "name": entry }
    console.log(entry);
    console.log(',');


    i++;
}*/