const usernames = [
    'BlueGiraffe42',
    'QuantumJellybean',
    'StarshipPioneer',
    'CyberNinjaX'
]

const emails = [
    'bluegiraffe42@example.com',
    'quantumjellybean@email.net',
    'starshippioneer@fakemail.org',
    'cyberninjaX@fakemail.com'

]


const userSeeds = () => {
    const seedData = [];
    for (let i = 0; i < usernames.length; i++) {
        const user = {
            userName: usernames[i],
            email: emails[i],
        };
        seedData.push(user)
    }
    return seedData;
}

module.exports = { userSeeds }