export type Quest = {
  id: string;
  name: string;
};

// Quest IDs for each NPC must be ordered lexicographically!
const QuestsW1: Record<string, Array<Quest>> = {
  "TP Pete": [
    {
      id: "TP Pete1",
      name: "Roll of Anger",
    },
    {
      id: "TP Pete2",
      name: "The Rats are to Blame!",
    },
    {
      id: "TP Pete3",
      name: "Fired for BS Reasons!",
    },
  ],
  Sprout: [
    {
      id: "Sprout1",
      name: "Sticks and Stone Something Something Bones...",
    },
    {
      id: "Sprout2",
      name: "Justice Wears No Clothes",
    },
    {
      id: "Sprout3",
      name: "Shoe Shopping with Sprout",
    },
    {
      id: "Sprout4",
      name: "Frisbee Fanatic",
    },
  ],
  "Town Marble": [
    {
      id: "Town Marble1",
      name: "Visualizing the Sculpture Within...",
    },
  ],
  Woodsman: [
    {
      id: "Woodsman1",
      name: "A noob's first swing",
    },
    {
      id: "Woodsman2",
      name: "A noob's 2nd first swing",
    },
    {
      id: "Woodsman3",
      name: "It's Just a Plank, Bro!",
    },
    {
      id: "Woodsman4",
      name: "Exotic Pranks... I mean Logs!",
    },
  ],
  Scripticus: [
    {
      id: "Scripticus2",
      name: "Hardcore Gamer Status, Here I Come!",
    },
    {
      id: "Scripticus3",
      name: "Gear Up, Gamer!",
    },
    {
      id: "Scripticus4",
      name: "Mr. Worldwide",
    },
    {
      id: "Scripticus5",
      name: "The Choice is Yours!",
    },
    {
      id: "Scripticus6",
      name: "Certified Swinger, of Pickaxes of course!",
    },
    {
      id: "Scripticus7",
      name: "The Smithing Grind",
    },
    {
      id: "Scripticus8",
      name: "The Unoccupied Picnic",
    },
    {
      id: "Scripticus9",
      name: "Seeking Foreign Aid",
    },
    {
      id: "Scripticus10",
      name: "What Lies at the Heart of the Forest",
    },
    {
      id: "Scripticus11",
      name: "The Bigger they are, the Bigger they Fall!",
    },
    {
      id: "Scripticus12",
      name: "Champion of the Grasslands",
    },
    {
      id: "Scripticus13",
      name: "Can't somebody else do it?",
    },
  ],
  Krunk: [
    {
      id: "Krunk1",
      name: "A Plot to be Perfect",
    },
    {
      id: "Krunk2",
      name: "The Scientific Method, According to a Rock",
    },
    {
      id: "Krunk3",
      name: "King of the Cavern",
    },
  ],
  Glumlee: [
    {
      id: "Glumlee1",
      name: "Learning to Swing",
    },
    {
      id: "Glumlee2",
      name: "Learning to Smelt",
    },
    {
      id: "Glumlee3",
      name: "Literally Burning your Money",
    },
    {
      id: "Glumlee4",
      name: "The Impossible Task",
    },
    {
      id: "Glumlee5",
      name: "He's Havin' a Bad Day",
    },
  ],
  "Picnic Stowaway": [
    {
      id: "Picnic Stowaway1",
      name: "The Hungry Stowaway",
    },
    {
      id: "Picnic Stowaway2",
      name: "Beating Up Frogs for some Sauce",
    },
    {
      id: "Picnic Stowaway3",
      name: "Live-Action Entertainment",
    },
    {
      id: "Picnic Stowaway4",
      name: "The Most Important Meal of the Day",
    },
    {
      id: "Picnic Stowaway5",
      name: "Brunchin' with the Blobs",
    },
    {
      id: "Picnic Stowaway6",
      name: "Luncheon with the Inlaws",
    },
    {
      id: "Picnic Stowaway7",
      name: "Afternoon Tea in a Jiffy",
    },
    {
      id: "Picnic Stowaway8",
      name: "Early Evening Eating Endeavor",
    },
    {
      id: "Picnic Stowaway9",
      name: "The Last Supper, at Least for Today!",
    },
    {
      id: "Picnic Stowaway10",
      name: "Don't Desert the Dessert",
    },
    {
      id: "Picnic Stowaway11",
      name: "A Midnight Snack",
    },
    {
      id: "Picnic Stowaway12",
      name: "King of Food",
    },
  ],
  Hamish: [
    {
      id: "Hamish1",
      name: "The Hamazing Plot Twist",
    },
    {
      id: "Hamish2",
      name: "Should We Tell Him?",
    },
    {
      id: "Hamish3",
      name: "Slime for Storage",
    },
  ],
  "Mr Pigibank": [
    {
      id: "Mr Pigibank1",
      name: "A Pig and his Stamps",
    },
  ],
  Promotheus: [
    {
      id: "Promotheus1",
      name: "I'm Ready, Promotion!",
    },
    {
      id: "Promotheus2",
      name: "Three Right Answers",
    },
    {
      id: "Promotheus3",
      name: "Slovakian Scare",
    },
    {
      id: "Promotheus4",
      name: "The Witcher, but not Really",
    },
  ],
  Bushlyte: [
    {
      id: "Bushlyte1",
      name: "A Peanut for your Thoughts",
    },
    {
      id: "Bushlyte2",
      name: "Honk if you Love Peanuts!",
    },
    {
      id: "Bushlyte3",
      name: "A Peanut Saved is a Peanut not Eaten!",
    },
  ],
  Rocklyte: [
    {
      id: "Rocklyte1",
      name: "How It's Made, Episode 7. The Super Peanut",
    },
    {
      id: "Rocklyte2",
      name: "If Life Gives you Peanuts, make Shiny Peanuts!",
    },
    {
      id: "Rocklyte3",
      name: "Becoming the Best Beginner",
    },
  ],
  Stiltzcho: [
    {
      id: "Stiltzcho1",
      name: "Outta the Way Slimes",
    },
    {
      id: "Stiltzcho2",
      name: "No Stone Unturned",
    },
    {
      id: "Stiltzcho3",
      name: "Investigator by Day, Prankster by Night",
    },
    {
      id: "Stiltzcho4",
      name: "Time Crime Episode 1",
    },
    {
      id: "Stiltzcho5",
      name: "Time Crime Episode 2",
    },
    {
      id: "Stiltzcho6",
      name: "Time Crime Season Finale",
    },
  ],
  Funguy: [
    {
      id: "Funguy1",
      name: "Mushroom Munchies",
    },
    {
      id: "Funguy2",
      name: "Videogame Highscores are COOL!",
    },
    {
      id: "Funguy3",
      name: "Partycrastination",
    },
    {
      id: "Funguy4",
      name: "Party Crashin'",
    },
    {
      id: "Funguy5",
      name: "Wicked Party Cleanup",
    },
  ],
  "Tiki Chief": [
    {
      id: "Tiki Chief1",
      name: "Brochure Building",
    },
    {
      id: "Tiki Chief2",
      name: "Three Strikes, you're Out!",
    },
    {
      id: "Tiki Chief3",

      name: "Blame it on the Glublins",
    },
    {
      id: "Tiki Chief4",

      name: "Hotel? Tikivago. Sorry, couldn't Help It!",
    },
  ],
  "Dog Bone": [
    {
      id: "Dog Bone1",

      name: "Why he Die???",
    },
    {
      id: "Dog Bone2",

      name: "Bow Wow going Dow..n!",
    },
  ],
  "Builder Bird": [
    {
      id: "Builder Bird1",

      name: "Restoring Power to the Portal",
    },
  ],
  "Papua Piggea": [
    {
      id: "Papua Piggea1",

      name: "Oinko Boinko",
    },
    {
      id: "Papua Piggea2",

      name: "Crystal Crime Stopper",
    },
    {
      id: "Papua Piggea3",

      name: "Stamp Collecting",
    },
    {
      id: "Papua Piggea4",

      name: "This Little Piggy Felt Remorse",
    },
  ],
  Mutton: [
    {
      id: "Mutton1",

      name: "Beatboxing Starterpack",
    },
    {
      id: "Mutton2",

      name: "Clout Chasin'",
    },
    {
      id: "Mutton3",

      name: "Cross Platform Promotion",
    },
    {
      id: "Mutton4",

      name: "7 Figure Followers",
    },
  ],
  Meel: [
    {
      id: "Meel1",

      name: "Spooky Scary Skelepoops",
    },
    {
      id: "Meel2",

      name: "Waitin' for the Cards to Drop",
    },
  ],
  Dazey: [
    {
      id: "Dazey1",

      name: "Dressing like a Dork",
    },
    {
      id: "Dazey2",

      name: "Literally Physics",
    },
  ],
  "Giftmas Blobulyte": [
    {
      id: "Giftmas Blobulyte1",

      name: "Boo, Headshot!",
    },
    {
      id: "Giftmas Blobulyte2",

      name: "You Shouldn't Have! No, really.",
    },
  ],
  Telescope: [
    {
      id: "Telescope1",

      name: "I'm Seeing Stars!",
    },
  ],
  Loveulyte: [
    {
      id: "Loveulyte1",

      name: "Heart Hogger",
    },
    {
      id: "Loveulyte2",

      name: "Heartbreaker",
    },
  ],
  Egggulyte: [
    {
      id: "Egggulyte1",

      name: "Egg Shaped Lootboxes!",
    },
    {
      id: "Egggulyte2",

      name: "I've Got a Golden Tickegg!",
    },
  ],
  Coastiolyte: [
    {
      id: "Coastiolyte1",

      name: "Cooler than a Cooler!",
    },
    {
      id: "Coastiolyte2",

      name: "Vibe Check",
    },
  ],
  Toadstall: [
    {
      id: "Toadstall1",

      name: "Creating a Party!",
    },
    {
      id: "Toadstall2",

      name: "Bigger Party Better Party!",
    },
    {
      id: "Toadstall3",

      name: "Bother the Frogger!",
    },
  ],
  "Falloween Pumpkin": [
    {
      id: "Falloween Pumpkin1",

      name: "The Spookyness",
    },
    {
      id: "Falloween Pumpkin2",

      name: "The Scaryness",
    },
    {
      id: "Falloween Pumpkin3",

      name: "The Horroriness",
    },
    {
      id: "Falloween Pumpkin4",

      name: "The Booeyness",
    },
    {
      id: "Falloween Pumpkin5",

      name: "The Afterparty",
    },
  ],
};

const QuestsW2: Record<string, Array<Quest>> = {
  Cactolyte: [
    {
      id: "Cactolyte1",
      name: "Super Skillage",
    },
    {
      id: "Cactolyte2",
      name: "Top Skillage",
    },
    {
      id: "Cactolyte3",
      name: "Peanut De-Aging",
    },
    {
      id: "Cactolyte4",
      name: "Maestro! The Stro! Mman!",
    },
  ],
  "Constructor Crow": [
    {
      id: "Constructor Crow1",
      name: "Restoring Power to another Portal",
    },
  ],
  Speccius: [
    {
      id: "Speccius1",
      name: "More like 'Sleepius' lmao",
    },
    {
      id: "Speccius2",
      name: "Specialization Station",
    },
  ],
  Fishpaste97: [
    {
      id: "Fishpaste971",
      name: "'Accidental' Exploit",
    },
    {
      id: "Fishpaste972",
      name: "Can you do the Can Can?",
    },
  ],
  Scubidew: [
    {
      id: "Scubidew1",
      name: "Don't Step to Me, Bro!",
    },
    {
      id: "Scubidew2",
      name: "Uncovering the Deep Sea State!!!",
    },
    {
      id: "Scubidew3",
      name: "A Normal Quest.",
    },
  ],
  Whattso: [
    {
      id: "Whattso1",
      name: "Mopey Dick",
    },
    {
      id: "Whattso2",
      name: "The Whaley Hard Minigame",
    },
    {
      id: "Whattso3",
      name: "Bobbin' Bobbers",
    },
    {
      id: "Whattso4",
      name: "The Biggest Fish in the Sea...?",
    },
  ],
  "Postboy Pablob": [
    {
      id: "Postboy Pablob1",
      name: "Signed, Sealed and Lost in the Post",
    },
  ],
  "Bandit Bob": [
    {
      id: "Bandit Bob1",
      name: "Bullets for Bandit Bob!",
    },
    {
      id: "Bandit Bob2",
      name: "Bob's Brand New Bandana",
    },
    {
      id: "Bandit Bob3",
      name: "Bringing Bob's Boxes",
    },
    {
      id: "Bandit Bob4",
      name: "The Desert Dungeon Prequest",
    },
  ],
  Carpetiem: [
    {
      id: "Carpetiem1",
      name: "Darn Lazy Gamers!",
    },
    {
      id: "Carpetiem2",
      name: "Old Timey Craftin'",
    },
    {
      id: "Carpetiem3",
      name: "Be like Buster!",
    },
    {
      id: "Carpetiem4",
      name: "Helping 100 times over",
    },
  ],
  Djonnut: [
    {
      id: "Djonnut1",
      name: "Genie Dieting",
    },
    {
      id: "Djonnut2",
      name: "I'm Blue Dabadedada",
    },
    {
      id: "Djonnut3",
      name: "The Blue New World",
    },
  ],
  Goldric: [
    {
      id: "Goldric1",
      name: "Trickle Down Economics",
    },
    {
      id: "Goldric2",
      name: "Hoopsies",
    },
    {
      id: "Goldric3",
      name: "Only Winners have Portraits",
    },
    {
      id: "Goldric4",
      name: "Criminal Code of Conduct",
    },
    {
      id: "Goldric5",
      name: "Dress to Impress",
    },
    {
      id: "Goldric6",
      name: "Dont lay a finger on my Sheepies!!!",
    },
  ],
  "Snake Jar": [
    {
      id: "Snake Jar1",
      name: "Lookin' Like a Snack",
    },
    {
      id: "Snake Jar2",
      name: "Red Stuff Bad!",
    },
    {
      id: "Snake Jar3",
      name: "PSA. You Are Being Eaten!",
    },
    {
      id: "Snake Jar4",
      name: "A Noob, served Medium Rare!",
    },
  ],
  Loominadi: [
    {
      id: "Loominadi1",
      name: "Rhyming is Key!",
    },
    {
      id: "Loominadi2",
      name: "Uh, Something About Vials?",
    },
    {
      id: "Loominadi3",
      name: "Journey to the Center of the Blundermines",
    },
    {
      id: "Loominadi4",
      name: "The Mummy of Mystery",
    },
  ],
  "Cowbo Jones": [
    {
      id: "Cowbo Jones1",
      name: "The Grind Begins...?",
    },
    {
      id: "Cowbo Jones2",
      name: "The Hatless Howerhouse!",
    },
    {
      id: "Cowbo Jones3",
      name: "No Country for One Character",
    },
    {
      id: "Cowbo Jones4",
      name: "Say Goodbye to your Dubloon!",
    },
    {
      id: "Cowbo Jones5",
      name: "Alchemial Apprentice",
    },
    {
      id: "Cowbo Jones6",
      name: "Three Vials? Those are Rookie Numbers!",
    },
    {
      id: "Cowbo Jones7",
      name: "The Notorious B.O.B",
    },
    {
      id: "Cowbo Jones8",
      name: "Bake Him Away, Toys",
    },
    {
      id: "Cowbo Jones9",
      name: "A Hat in Crime",
    },
    {
      id: "Cowbo Jones10",
      name: "Commence Criminal Crimes!",
    },
    {
      id: "Cowbo Jones11",
      name: "The Worst Trade Deal in History",
    },
    {
      id: "Cowbo Jones12",
      name: "Children? What'd they ever do for Me...",
    },
    {
      id: "Cowbo Jones13",
      name: "Oh No, not the Elderly!",
    },
    {
      id: "Cowbo Jones14",
      name: "Tomb Raid",
    },
    {
      id: "Cowbo Jones15",
      name: "The New Sheriff",
    },
  ],
  Centurion: [
    {
      id: "Centurion1",
      name: "Down The Mimic Hole!",
    },
    {
      id: "Centurion2",
      name: "Which one of yous is the Mafia?",
    },
    {
      id: "Centurion3",
      name: "High Scorer",
    },
    {
      id: "Centurion4",
      name: "Colosseum Champ!",
    },
    {
      id: "Centurion5",
      name: "Colosseum GDQ",
    },
  ],
  Walupiggy: [
    {
      id: "Walupiggy1",
      name: "Treasure Hunt 1",
    },
    {
      id: "Walupiggy2",
      name: "Treasure Hunt 2",
    },
    {
      id: "Walupiggy3",
      name: "Treasure Hunt 3",
    },
    {
      id: "Walupiggy4",
      name: "Treasure Hunt 4",
    },
  ],
  "Gangster Gus": [
    {
      id: "Gangster Gus1",
      name: "Plunderin Down Yonder",
    },
    {
      id: "Gangster Gus2",
      name: "Perfect Progress Score",
    },
    {
      id: "Gangster Gus3",
      name: "Sanke Revival Denial",
    },
  ],
};

const QuestsW3: Record<string, Array<Quest>> = {
  "Iceland Irwin": [
    {
      id: "Iceland Irwin1",
      name: "Crikey, it's cold out!",
    },
  ],
  Hoggindaz: [
    {
      id: "Hoggindaz1",
      name: "Turn ON for what???",
    },
    {
      id: "Hoggindaz2",
      name: "Trapping with the Lord",
    },
    {
      id: "Hoggindaz3",
      name: "Constructing a Tower",
    },
    {
      id: "Hoggindaz4",
      name: "Monke Tower Time!",
    },
    {
      id: "Hoggindaz5",
      name: "Taking Samples",
    },
  ],
  "Lonely Hunter": [
    {
      id: "Lonely Hunter1",
      name: "Leaf Him Alone!",
    },
    {
      id: "Lonely Hunter2",
      name: "Skeleton? Skelegone!",
    },
  ],
  "Lord of the Hunt": [
    {
      id: "Lord of the Hunt1",
      name: "Pelt for the Pelt God",
    },
    {
      id: "Lord of the Hunt2",
      name: "Frogecoin to the MOON!",
    },
    {
      id: "Lord of the Hunt3",
      name: "Yet another Cartoon Reference",
    },
    {
      id: "Lord of the Hunt4",
      name: "Small Stingers, Big Owie",
    },
    {
      id: "Lord of the Hunt5",
      name: "The Mouse n the Molerat",
    },
    {
      id: "Lord of the Hunt6",
      name: "Happy Tree Friend",
    },
    {
      id: "Lord of the Hunt7",
      name: "Noot Noot!",
    },
    {
      id: "Lord of the Hunt8",
      name: "Bunny you Should Say That!",
    },
    {
      id: "Lord of the Hunt9",
      name: "Rollin' Thunder!",
    },
    {
      id: "Lord of the Hunt10",
      name: "Untitled Quest",
    },
    {
      id: "Lord of the Hunt11",
      name: "To Trap or not to Trap",
    },
  ],
  Snouts: [
    {
      id: "Snouts1",
      name: "A Salty Fall",
    },
    {
      id: "Snouts2",
      name: "Gravity VS Salt",
    },
    {
      id: "Snouts3",
      name: "Big Ol Chonker",
    },
  ],
};

export const AllQuests: Record<string, Record<string, Array<Quest>>> = {
  "World 1": QuestsW1,
  "World 2": QuestsW2,
  "World 3": QuestsW3,
};
