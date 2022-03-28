export type Quest = {
  id: string;
  name: string;
};

const QuestsW1: Record<string, Array<Quest>> = {
  "Builder Bird": [
    { id: "Builder Bird01", name: "Restoring Power to the Portal" },
  ],
  Bushlyte: [
    { id: "Bushlyte01", name: "A Peanut for your Thoughts" },
    { id: "Bushlyte02", name: "Honk if you Love Peanuts!" },
    { id: "Bushlyte03", name: "A Peanut Saved is a Peanut not Eaten!" },
  ],
  Dazey: [
    { id: "Dazey01", name: "Dressing like a Dork" },
    { id: "Dazey02", name: "Literally Physics" },
  ],
  "Dog Bone": [
    { id: "Dog Bone01", name: "Why he Die???" },
    { id: "Dog Bone02", name: "Bow Wow going Dow..n!"},
  ],
  Funguy: [
    { id: "Funguy01", name: "Mushroom Munchies" },
    { id: "Funguy02", name: "Videogame Highscores are COOL!" },
    { id: "Funguy03", name: "Partycrastination" },
    { id: "Funguy04", name: "Party Crashin'" },
    { id: "Funguy05", name: "Wicked Party Cleanup" },
  ],
  Glumlee: [
    { id: "Glumlee01", name: "Learning to Swing" },
    { id: "Glumlee02", name: "Learning to Smelt" },
    { id: "Glumlee03", name: "Literally Burning your Money" },
    { id: "Glumlee04", name: "The Impossible Task" },
    { id: "Glumlee05", name: "He's Havin' a Bad Day" },
  ],
  Hamish: [
    { id: "Hamish01", name: "The Hamazing Plot Twist" },
    { id: "Hamish02", name: "Should We Tell Him?" },
    { id: "Hamish03", name: "Slime for Storage" },
  ],
  Krunk: [
    { id: "Krunk01", name: "A Plot to be Perfect" },
    { id: "Krunk02", name: "The Scientific Method, According to a Rock" },
    { id: "Krunk03", name: "King of the Cavern" },
  ],
  Meel: [
    { id: "Meel01", name: "Spooky Scary Skelepoops" },
    { id: "Meel02", name: "Waitin' for the Cards to Drop" },
  ],
  "Mr Pigibank": [
    { id: "Mr Pigibank01", name: "A Pig and his Stamps" },
  ],
  Mutton: [
    { id: "Mutton01", name: "Beatboxing Starterpack" },
    { id: "Mutton02", name: "Clout Chasin'" },
    { id: "Mutton03", name: "Cross Platform Promotion" },
    { id: "Mutton04", name: "7 Figure Followers" },
  ],
  "Obol Altar": [
    { id: "Obol Altar01", name: "Bad Kitty, get off that altar" },
  ],
  "Papua Piggea": [
    { id: "Papua Piggea01", name: "Oinko Boinko" },
    { id: "Papua Piggea02", name: "Crystal Crime Stopper" },
    { id: "Papua Piggea03", name: "Stamp Collecting" },
    { id: "Papua Piggea04", name: "This Little Piggy Felt Remorse" },
  ],
  "Picnic Stowaway": [
    { id: "Picnic Stowaway01", name: "The Hungry Stowaway" },
    { id: "Picnic Stowaway02", name: "Beating Up Frogs for some Sauce" },
    { id: "Picnic Stowaway03", name: "Live-Action Entertainment" },
    { id: "Picnic Stowaway04", name: "The Most Important Meal of the Day" },
    { id: "Picnic Stowaway05", name: "Brunchin' with the Blobs" },
    { id: "Picnic Stowaway06", name: "Luncheon with the Inlaws" },
    { id: "Picnic Stowaway07", name: "Afternoon Tea in a Jiffy" },
    { id: "Picnic Stowaway08", name: "Early Evening Eating Endeavor" },
    { id: "Picnic Stowaway09", name: "The Last Supper, at Least for Today!" },
    { id: "Picnic Stowaway10", name: "Don't Desert the Dessert" },
    { id: "Picnic Stowaway11", name: "A Midnight Snack" },
    { id: "Picnic Stowaway12", name: "King of Food" },
  ],
  Promotheus: [
    { id: "Promotheus01", name: "I'm Ready, Promotion!" },
    { id: "Promotheus02", name: "Three Right Answers" },
    { id: "Promotheus03", name: "Slovakian Scare" },
    { id: "Promotheus04", name: "The Witcher, but not Really" },
  ],
  Rocklyte: [
    { id: "Rocklyte01", name: "How It's Made, Episode 7. The Super Peanut" },
    { id: "Rocklyte02", name: "If Life Gives you Peanuts, make Shiny Peanuts!" },
    { id: "Rocklyte03", name: "Becoming the Best Beginner" },
  ],
  Scripticus: [
    { id: "Scripticus01", name: "Hardcore Gamer Status, Here I Come!" },
    { id: "Scripticus02", name: "Gear Up, Gamer!" },
    { id: "Scripticus03", name: "Mr. Worldwide" },
    { id: "Scripticus04", name: "The Choice is Yours!" },
    { id: "Scripticus05", name: "Certified Swinger, of Pickaxes of course!" },
    { id: "Scripticus06", name: "The Smithing Grind" },
    { id: "Scripticus07", name: "Can't somebody else do it?" },
    { id: "Scripticus08", name: "The Unoccupied Picnic" },
    { id: "Scripticus09", name: "Seeking Foreign Aid" },
    { id: "Scripticus10", name: "What Lies at the Heart of the Forest" },
    { id: "Scripticus11", name: "The Bigger they are, the Bigger they Fall!" },
    { id: "Scripticus12", name: "Champion of the Grasslands" },
  ],
  Sprout: [
    { id: "Sprout01", name: "Sticks and Stone Something Something Bones..." },
    { id: "Sprout02", name: "Justice Wears No Clothes" },
    { id: "Sprout03", name: "Shoe Shopping with Sprout" },
    { id: "Sprout04", name: "Frisbee Fanatic" },
  ],
  Stiltzcho: [
    { id: "Stiltzcho01", name: "Outta the Way Slimes" },
    { id: "Stiltzcho02", name: "No Stone Unturned" },
    { id: "Stiltzcho03", name: "Investigator by Day, Prankster by Night" },
    { id: "Stiltzcho04", name: "Time Crime Episode 1" },
    { id: "Stiltzcho05", name: "Time Crime Episode 2" },
    { id: "Stiltzcho06", name: "Time Crime Season Finale" },
  ],
  Telescope: [
    { id: "Telescope01", name: "I'm Seeing Stars!" },
  ],
  "Tiki Chief": [
    { id: "Tiki Chief01", name: "Brochure Building" },
    { id: "Tiki Chief02", name: "Three Strikes, you're Out!" },
    { id: "Tiki Chief03", name: "Blame it on the Glublins" },
    { id: "Tiki Chief04", name: "Hotel? Tikivago. Sorry, couldn't Help It!" },
  ],
  Toadstall: [
    { id: "Toadstall01", name: "Creating a Party!" },
    { id: "Toadstall02", name: "Bigger Party Better Party!" },
    { id: "Toadstall03", name: "Bother the Frogger!" },
  ],
  "Town Marble": [
    { id: "Town Marble01", name: "Visualizing the Sculpture Within..." },
  ],
  "TP Pete": [
    { id: "TP Pete01", name: "Roll of Anger" },
    { id: "TP Pete02", name: "The Rats are to Blame!" },
    { id: "TP Pete03", name: "Fired for BS Reasons!" },
  ],
  "Typhoon": [
    { id: "Typhoon01", name: "Surprise Attack!" },
  ],
  Woodsman: [
    { id: "Woodsman01", name: "A noob's first swing" },
    { id: "Woodsman02", name: "A noob's 2nd first swing" },
    { id: "Woodsman03", name: "It's Just a Plank, Bro!" },
    { id: "Woodsman04", name: "Exotic Pranks... I mean Logs!" },
  ],
};

const QuestsW2: Record<string, Array<Quest>> = {
  "Bandit Bob": [
    { id: "Bandit Bob01", name: "Bullets for Bandit Bob!" },
    { id: "Bandit Bob02", name: "Bob's Brand New Bandana" },
    { id: "Bandit Bob03", name: "Bringing Bob's Boxes" },
    { id: "Bandit Bob04", name: "The Desert Dungeon Prequest" },
  ],
  Cactolyte: [
    { id: "Cactolyte01", name: "Super Skillage" },
    { id: "Cactolyte02", name: "Top Skillage" },
    { id: "Cactolyte03", name: "Peanut De-Aging" },
    { id: "Cactolyte04", name: "Maestro! The Stro! Mman!" },
  ],
  Carpetiem: [
    { id: "Carpetiem01", name: "Darn Lazy Gamers!" },
    { id: "Carpetiem02", name: "Old Timey Craftin'" },
    { id: "Carpetiem03", name: "Be like Buster!" },
    { id: "Carpetiem04", name: "Helping 100 times over" },
  ],
  Centurion: [
    { id: "Centurion01", name: "Down The Mimic Hole!" },
    { id: "Centurion02", name: "Which one of yous is the Mafia?" },
    { id: "Centurion03", name: "High Scorer" },
    { id: "Centurion04", name: "Colosseum Champ!" },
    { id: "Centurion05", name: "Colosseum GDQ" },
  ],
  "Constructor Crow": [
    { id: "Constructor Crow01", name: "Restoring Power to another Portal" },
  ],
  "Cowbo Jones": [
    { id: "Cowbo Jones01", name: "The Grind Begins...?" },
    { id: "Cowbo Jones02", name: "The Hatless Howerhouse!" },
    { id: "Cowbo Jones03", name: "No Country for One Character" },
    { id: "Cowbo Jones04", name: "Say Goodbye to your Dubloon!" },
    { id: "Cowbo Jones05", name: "Alchemial Apprentice" },
    { id: "Cowbo Jones06", name: "Three Vials? Those are Rookie Numbers!" },
    { id: "Cowbo Jones07", name: "The Notorious B.O.B" },
    { id: "Cowbo Jones08", name: "Bake Him Away, Toys" },
    { id: "Cowbo Jones09", name: "A Hat in Crime" },
    { id: "Cowbo Jones10", name: "Commence Criminal Crimes!" },
    { id: "Cowbo Jones11", name: "The Worst Trade Deal in History" },
    { id: "Cowbo Jones12", name: "Children? What'd they ever do for Me..." },
    { id: "Cowbo Jones13", name: "Oh No, not the Elderly!" },
    { id: "Cowbo Jones14", name: "Tomb Raid" },
    { id: "Cowbo Jones15", name: "The New Sheriff" },
  ],
  "Desert Davey": [
    { id: "Desert Davey01", name: "U Cool?" },
  ],
  Djonnut: [
    { id: "Djonnut01", name: "Genie Dieting" },
    { id: "Djonnut02", name: "I'm Blue Dabadedada" },
    { id: "Djonnut03", name: "The Blue New World" },
  ],
  Fishpaste97: [
    { id: "Fishpaste9701", name: "'Accidental' Exploit" },
    { id: "Fishpaste9702", name: "Can you do the Can Can?" },
  ],
  "Gangster Gus": [
    { id: "Gangster Gus01", name: "Plunderin Down Yonder" },
    { id: "Gangster Gus02", name: "Perfect Progress Score" },
    { id: "Gangster Gus03", name: "Sanke Revival Denial" },
  ],
  Goldric: [
    { id: "Goldric01", name: "Trickle Down Economics" },
    { id: "Goldric02", name: "Hoopsies" },
    { id: "Goldric03", name: "Only Winners have Portraits" },
    { id: "Goldric04", name: "Criminal Code of Conduct" },
    { id: "Goldric05", name: "Dress to Impress" },
    { id: "Goldric06", name: "Dont lay a finger on my Sheepies!!!" },
  ],
  Loominadi: [
    { id: "Loominadi01", name: "Rhyming is Key!" },
    { id: "Loominadi02", name: "Uh, Something About Vials?" },
    { id: "Loominadi03", name: "Journey to the Center of the Blundermines" },
    { id: "Loominadi04", name: "The Mummy of Mystery" },
  ],
  "Obol Altar": [
    { id: "Obol Altar01", name: "Bad Kitty, get off that altar" },
  ],
  "Postboy Pablob": [
    { id: "Postboy Pablob01", name: "Signed, Sealed and Lost in the Post" },
  ],
  Scubidew: [
    { id: "Scubidew01", name: "Don't Step to Me, Bro!" },
    { id: "Scubidew02", name: "Uncovering the Deep Sea State!!!" },
    { id: "Scubidew03", name: "A Normal Quest." },
  ],
  "Snake Jar": [
    { id: "Snake Jar01", name: "Lookin' Like a Snack" },
    { id: "Snake Jar02", name: "Red Stuff Bad!" },
    { id: "Snake Jar03", name: "PSA. You Are Being Eaten!" },
    { id: "Snake Jar04", name: "A Noob, served Medium Rare!" },
  ],
  Speccius: [
    { id: "Speccius01", name: "More like 'Sleepius' lmao" },
    { id: "Speccius02", name: "Specialization Station" },
  ],
  Walupiggy: [
    { id: "Walupiggy01", name: "Treasure Hunt 1" },
    { id: "Walupiggy02", name: "Treasure Hunt 2" },
    { id: "Walupiggy03", name: "Treasure Hunt 3" },
    { id: "Walupiggy04", name: "Treasure Hunt 4" },
  ],
  Wellington: [
    { id: "Wellington01", name: "Platforms in Disguise, Platsformers!" },
    { id: "Wellington02", name: "Findin' Fingerprints" },
    { id: "Wellington03", name: "You Can't Run, but you Can Hide" },
    { id: "Wellington04", name: "Puzzles and Math, a Winning Combination!" },
  ],
  Whattso: [
    { id: "Whattso01", name: "Mopey Dick" },
    { id: "Whattso02", name: "The Whaley Hard Minigame" },
    { id: "Whattso03", name: "Bobbin' Bobbers" },
    { id: "Whattso04", name: "The Biggest Fish in the Sea...?" },
  ],
  "XxX Cattleprod XxX": [
    { id: "XxX Cattleprod XxX01", name: "Peak Gaming" },
    { id: "XxX Cattleprod XxX02", name: "Wait No, I meant Pathetic Gaming" },
    { id: "XxX Cattleprod XxX03", name: "Ok, NOW it's Peak Gaming!" },
  ],
};

const QuestsW3: Record<string, Array<Quest>> = {
  Bellows: [
    { id: "Bellows01", name: "Poking Some Eyes Out", },
    { id: "Bellows02", name: "Eyexperience", },
    { id: "Bellows03", name: "Veyebing", },
    { id: "Bellows04", name: "Optometric Hoarder", },
  ],
  "Bill Brr": [
    { id: "Bill Brr01", name: "Fairly Odd Damage", },
    { id: "Bill Brr02", name: "Laughin' Amphibian", },
    { id: "Bill Brr03", name: "The Spores are a Bore", },
    { id: "Bill Brr04", name: "Coin Shenanigans", },
    { id: "Bill Brr05", name: "Have a Candy", },
    { id: "Bill Brr06", name: "Duckin' and Shatterin'", },
    { id: "Bill Brr07", name: "Hatin' on the Green One", },
  ],
  "Carpenter Cardinal": [
    { id: "Carpenter Cardinal01", name: "Restoring Power, once again, to a Portal", },
  ],
  Crystalswine: [
    { id: "Crystalswine01", name: "Melting the Snakes", },
    { id: "Crystalswine02", name: "Sunrunning to Chizoar", },
    { id: "Crystalswine03", name: "Global Warming", },
  ],
  Hoggindaz: [
    { id: "Hoggindaz01", name: "Turn ON for what???" },
    { id: "Hoggindaz02", name: "Trapping with the Lord" },
    { id: "Hoggindaz03", name: "Constructing a Tower" },
    { id: "Hoggindaz04", name: "Monke Tower Time!" },
    { id: "Hoggindaz05", name: "Taking Samples" },
    { id: "Hoggindaz06", name: "Voter Recognition" },
    { id: "Hoggindaz07", name: "Voter Appeasement" },
    { id: "Hoggindaz08", name: "Voter Apathy" },
    { id: "Hoggindaz09", name: "Chizoar No More" },
    { id: "Hoggindaz10", name: "The Fresh Prince of the Tundra" },
  ],
  "Iceland Irwin": [
    { id: "Iceland Irwin01", name: "Crikey, it's cold out!" },
  ],
  "Lonely Hunter": [
    { id: "Lonely Hunter01", name: "Leaf Him Alone!" },
    { id: "Lonely Hunter02", name: "Skeleton? Skelegone!" },
    { id: "Lonely Hunter03", name: "Opening Chests" },
  ],
  "Lord of the Hunt": [
    { id: "Lord of the Hunt01", name: "Pelt for the Pelt God" },
    { id: "Lord of the Hunt02", name: "Frogecoin to the MOON!" },
    { id: "Lord of the Hunt03", name: "Yet another Cartoon Reference" },
    { id: "Lord of the Hunt04", name: "Small Stingers, Big Owie" },
    { id: "Lord of the Hunt05", name: "The Mouse n the Molerat" },
    { id: "Lord of the Hunt06", name: "Happy Tree Friend" },
    { id: "Lord of the Hunt07", name: "Noot Noot!" },
    { id: "Lord of the Hunt08", name: "Bunny you Should Say That!" },
    { id: "Lord of the Hunt09", name: "Rollin' Thunder!" },
    { id: "Lord of the Hunt10", name: "Untitled Quest" },
    { id: "Lord of the Hunt11", name: "To Trap or not to Trap" },
  ],
  Shuvelle: [
    { id: "Shuvelle01", name: "Mayoral Luck" },
    { id: "Shuvelle02", name: "Mayoral Skill" },
    { id: "Shuvelle03", name: "Mayoral Sack Size" },
    { id: "Shuvelle04", name: "Mayoral Movie Taste" },
    { id: "Shuvelle05", name: "Diggy Hole!" },
    { id: "Shuvelle06", name: "Diggy Diggy Hole!" },
    { id: "Shuvelle07", name: "Dig Diggily Diggy Dig Dig Hole!" },
  ],
  Snouts: [
    { id: "Snouts01", name: "A Salty Fall" },
    { id: "Snouts02", name: "Gravity VS Salt" },
    { id: "Snouts03", name: "Big Ol Chonker" },
    { id: "Snouts04", name: "Mana Plox" },
  ],
  Worldo: [
    { id: "Worldo01", name: "Odd Jobs for Cold Hard Cash" },
    { id: "Worldo02", name: "Can't Guard if you're Dead!" },
  ],
  Yondergreen: [
    { id: "Yondergreen01", name: "Infrastructure Plan" },
    { id: "Yondergreen02", name: "Economic Policy" },
    { id: "Yondergreen03", name: "Stance on Big Tech" },
    { id: "Yondergreen04", name: "Legislative Action" },
    { id: "Yondergreen05", name: "No Snapping Contract" },
    { id: "Yondergreen06", name: "Keep Away Contract" },
    { id: "Yondergreen07", name: "Ad Solidarity Contract" },
  ],
};

export const AllQuests: Record<string, Record<string, Array<Quest>>> = {
  "World 1": QuestsW1,
  "World 2": QuestsW2,
  "World 3": QuestsW3,
};
