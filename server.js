import express from 'express'
import multer from 'multer'
import cors from 'cors'
import handleValidatorErrors from "./utils/handleValidatorErrors.js";
import mongoose from 'mongoose'
import {login, register, getAllUser, getMe, addImage, addPost, rename} from "./controllers/UserController.js";
import {createChat, deleteChats, getChats} from "./controllers/ChatController.js";
import {getMessages, sendMessage} from "./controllers/MessageController.js";
import {
    addImgGroup,
    addPostGroup,
    createGroup,
    deleteGroup, deleteUser,
    exitGroup,
    getGroup,
    getGroupId, renameGroup
} from "./controllers/GroupController.js";


mongoose.connect("mongodb+srv://alimeerimbekov:Mrmbkvch502@chat.tdesf1s.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB ', err))


const server = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage})

server.use(express.json())
server.use(cors())
server.use('/uploads', express.static('uploads'))


const PORT = process.env.PORT || 1111

server.post('/upload', upload.single('image'), (req, res) => {
    res.json(
        {
            url: `/uploads/${req.file.originalname}`
        })
})

server.post('/auth/login', handleValidatorErrors, login)
server.post('/auth/register', register)

server.get('/users/:id', getMe)
server.get('/users', getAllUser)

server.get('/groups/:id', getGroupId)

server.post('/group', createGroup)
server.get('/group/:id', getGroup)
server.delete('/group/:id', deleteGroup)
server.patch('/group/:id/exit', exitGroup)
server.patch('/group/:id/addimage', addImgGroup)
server.patch('/group/:id/addpost', addPostGroup)
server.patch('/group/:id/rename', renameGroup)

server.post('/chats', createChat)
server.get('/chats/:id', getChats)
server.delete('/chats/:id', deleteChats)

server.post('/messages/send', sendMessage)
server.get('/messages/:id', getMessages)

server.patch('/users/:id/addimage', addImage)
server.patch('/users/:id/addpost', addPost)
server.patch('/users/:id/rename', rename)


server.listen(PORT, (err) => {
    if (err) {
        return console.log('Произошла ошибка', err)
    }
    console.log(`Сервер запущен на порту ${PORT}`)
})