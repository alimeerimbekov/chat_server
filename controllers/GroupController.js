import GroupsModel from "../models/Groups.js"

export const createGroup = async (req, res) => {
    try {

        const doc = new GroupsModel({
            title: req.body.title,
            members: req.body.members,
            admin: req.body.admin,
            image: req.body.image,
            post: req.body.post
        })

        const group = await doc.save()
        res.json(group)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать группу"
        })
    }
}

export const getGroup = async (req, res) => {
    try {

        const members = {members: {$in: req.params.id}}
        const groups = await GroupsModel.find(members)

        res.json(groups)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить группы"
        })
    }
}
export const getGroupId = async (req, res) => {
    try {
        const groups = await GroupsModel.find({
            _id: req.params.id
        })

        res.json(groups)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить группы"
        })
    }
}

export const deleteGroup = async (req, res) => {
    try {

        const id = {_id: req.params.id}

        const groups = await GroupsModel.remove(id)
        res.json(groups)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось удалить группу"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {

        const id = {members:{$in: req.params.id}}

        const groups = await GroupsModel.remove(id)
        res.json(groups)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось удалить группу"
        })
    }
}

export const exitGroup = async (req, res) => {
    try {

        const groupId = req.params.id
        const group = await GroupsModel.findById(groupId)
        const member = req.body.members

        GroupsModel.findByIdAndUpdate({
            _id: groupId,
        },{
            members: [member]
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить пост'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'ERROR: No documentation'
                })
            }
            res.json(doc)
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось выйти из группы"
        })
    }
}

export const addImgGroup = async (req, res) => {
    try {

        const groupId = req.params.id
        let group = await GroupsModel.findById(groupId)

        GroupsModel.findByIdAndUpdate({
            _id: groupId
        }, {
            image: req.body.image
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить фото'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Фото не найдено'
                })
            }
            res.json(doc)
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось отправить запрос'
        }, {
            returnDocument: 'after'
        })
    }
}

export const addPostGroup = async (req, res) => {
    try {

        const groupId = req.params.id
        let group = await GroupsModel.findById(groupId)


        GroupsModel.findByIdAndUpdate({
            _id: groupId,
        },{
            post: req.body.post
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить пост'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'ERROR: No documentation'
                })
            }
            res.json(doc)
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось отправить запрос'
        }, {
            returnDocument: 'after'
        })
    }
}

export const renameGroup = async (req, res) => {
    try {

        const groupId = req.params.id
        let group = await GroupsModel.findById(groupId)

        GroupsModel.findByIdAndUpdate({
            _id: groupId,
        },{
            title: req.body.title
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить пост'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'ERROR: No documentation'
                })
            }
            res.json(doc)
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось отправить запрос'
        }, {
            returnDocument: 'after'
        })
    }
}



