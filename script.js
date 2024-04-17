//player stats
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
//monsterstats
let fighting;
let monsterHealth;
let inventory = ["stick"];
//controls
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
//info displayed
const storyText = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 }
];

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];

const locations = [
  {
    name: "town square",
    "button text": ["go to store", "go to cave", "fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"store\"."

  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You are in store"
  },
  {
    name: "cave",
    "button text": ["Fight Slime", "fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave you see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    "text": "You are fighting a monster"
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: 'you die'
  },
  {
    name: "win",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: 'you defeat the dragon! YOU WIN THE GAME!'
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "you find a secret game. Pick a number above. Ten numbers will be randomly       chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//functions
function goTown() {

  update(locations[0])

}

function goStore() {
  update(locations[1])
};

function update(location) {
  storyText.innerText = location.text;
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
}

function goCave() {
  update(locations[2])
}



function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    storyText.innerText = "You do not have enough gold to buy health.";
  }

}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      storyText.innerText = "you now have a new weapon. you now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      storyText.innerText += "In your inventory you have: " + inventory;
    }
    else {
      storyText.innerText = "You do not have enough gold to buy a weapon.";
    }
  }
  else {
    storyText.innerText = "You already have the most powerful weapon.";
    button2.innerText = "sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }


}
function fightSlime() {
  fighting = 0;
  goFight(fighting)
}
function fightBeast() {
  fighting = 1;
  goFight(fighting);
}
function fightDragon() {
  fighting = 2;
  goFight(fighting);
}

function goFight(fighting) {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
}
function attack() {
  storyText.innerText = "The " + monsters[fighting].name + " attacks.";
  storyText.innerText += "You attack with your " + weapons[currentWeapon].name + ".";
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  else {
    storyText.innerText = "You miss.";
  }

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  }
  else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame()
    }
    else {
      defeatMonster();
    }

  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    storyText.innerText += "Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}
function isMonsterHit() {
  return Math.random() > .2 || health <= 20;
}
function dodge() {
  storyText.innerText = "You dodged the attack from the " + monsters[fighting].name + ".";
}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose() {
  update(locations[5]);
}
function winGame() {
  update(location[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11))
  }

  storyText.innerText = "You picked " + guess + ". Here are the random numbers:\n"

  for (let i = 0; i < 10; i++) {
    storyText.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    storyText.innerText = "Right! you win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  }
  else {
    storyText.innerText = "Wrong! you lose 10 health!";
    health -= 10;
    healthText.innerText = health;

    if (health <= 0) {
      lose();
    }
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    storyText.innerText = "You sold a " + currentWeapon + ".";
    storyText.innerText += "In your inventory you have: " + inventory;
  }
  else {
    storyText.innerText = "Don't sell your only weapon!"
  }

}


