const { v4: uuidv4 } = require("uuid")

const codenames = ["The Nightingale", "The Kraken", "The Phantom", "The Phoenix", "The Raptor"]

module.exports = () => {
    return `${codenames[Math.floor(Math.random() * codenames.length)]}-${uuidv4().slice(0, 4)}`
}