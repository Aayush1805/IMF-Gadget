const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const randomCodename = require("../utils/codenameGenerator")
const randomSuccessProbability = require("../utils/probabilityGenerator")

exports.getGadgets = async (req, res) => {
    const status = req.query.status
    const gadgets = await prisma.gadget.findMany({
        where: status ? { status} : {}
    })

    const gadgetsWithSuccess = gadgets.map(gadget => ({
        ...gadget,
        missionSuccessProbability: randomSuccessProbability()
    }))

    res.json(gadgetsWithSuccess)
}

exports.addGadget = async (req, res) => {
    const { name, status } = req.body
    const newGadget = await prisma.gadget.create({
        data: {
            name,
            codename: randomCodename(),
            status
        }
    })

    res.status(201).json(newGadget)
}

exports.updateGadget = async (req, res) => {
    const {name, status} = req.body
    const updated = await prisma.gadget.update({
        where: { id: req.params.id },
        data: { name, status }
    })

    res.json(updated)
}

exports.decommisionGadget= async (req, res) => {
    const updated = await prisma.gadget.update({
        where: { id: req.params.id },
        data: {
            status: "Decommissioned",
            decommissionedAt: new Date()
        }
    })

    res.json({
        message: "Gadget decommisioned", updated
    })
}

exports.selfDestruct = async (req, res) => {
    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase()

    res.json({
        message: `Self-destruct sequence initiated for gadget ${req.params.id}`,
        confirmationCode
    })
}