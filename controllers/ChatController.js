import ChatModel from "../models/Chat.js"

export const createChat = async (req, res) => {
    try {

        const doc = new ChatModel({
            members: [req.body.senderId, req.body.recieverId]
        })

        const chat = await doc.save()
        res.json(chat)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать чат"
        })
    }
}

export const getChats = async (req, res) => {
    try {

        const chats = await ChatModel.find({
            members: {$in: req.params.id}
        })

        res.json(chats)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить чаты"
        })
    }
}

export const deleteChats = async (req, res) => {
    try {

        const chats = await ChatModel.remove({
            _id: req.params.id
        })

        res.json(chats)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось удалить чат"
        })
    }
}