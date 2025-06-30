const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const prisma = new PrismaClient()

exports.register = async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                username, password: hashedPassword
            }
        })
        res.status(201).json({
            message: "User registered", user
        })
    } catch (err) {
        res.status(400).json({
            error: "User already exists"
        })
    }
}

exports.login = async (req, res) => {
    const {username, password } = req.body
    const user = await prisma.user.findUnique({
        where: { username }
    })
    

    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            error: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET)
    res.json({
        message: "Login successful",
        token
    })
}