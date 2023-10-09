const usernames = [
    'BlueGiraffe42',
    'QuantumJellybean',
    'StarshipPioneer',
    'CyberNinjaX'
]

const thoughts = [
    {
      "text": "Life is short, make it count.",
      "usernames": usernames[Math.floor(Math.random() * usernames.length)]
    },
    {
      "text": "Embrace change and grow.",
      "usernames": usernames[Math.floor(Math.random() * usernames.length)]
    },
    {
      "text": "Stay positive, stay fighting.",
      "usernames": usernames[Math.floor(Math.random() * usernames.length)]
    },
    {
      "text": "Chase your dreams relentlessly.",
      "usernames": usernames[Math.floor(Math.random() * usernames.length)]
    }
  ]

  
  
  const thoughtSeeds = () => {
    const seedData = [];
    for (let i = 0; i < usernames.length; i++) {
        const user = {
            thoughtText: thoughts[i].text,
            username: thoughts[i].usernames,
        };
        seedData.push(user)
    }
    return seedData;
}

module.exports = { thoughtSeeds }