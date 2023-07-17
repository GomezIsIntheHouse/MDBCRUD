const userModel = require('../mongo/models/user.model')
const _ = require('lodash')


class UserService {
    constructor(){}

    async create(userData){
        const newUser = new userModel(userData);
        return await newUser.save();
        
    }

    async getAllUsers(page=0,limit=200){
        if(limit>200){
            limit = 200
        }

        page = parseInt(page)
        limit = parseInt(limit)
        
        const offset =  page * limit

        try {
            const data = await userModel.find().skip(offset).limit(limit)
            const totalCount = await userModel.estimatedDocumentCount()

            return {
                success:true,
                data,
                page,
                count: data.length,
                totalCount
            }
        } catch (error) {
                throw new Error(error)               
        }
        
    };


    async getUSer(userUuid){
        if(_.isNil(userUuid)){throw new Error('USER UUID PARAM MISSING')}

        try {
            const userData = await userModel.findOne({uuid: userUuid});
            if(!userData){
                return {
                    success:true,
                    data: userData
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateUSer(userUuid, dataToUpdate){
        if(_.isNil(userUuid) || _.isNil(dataToUpdate)){
            throw new Error('UUID or DATA TO UPDATE PARAM MISSING')
        }

        try {
            const dataUpdate = await userModel.updateOne({uuid:userUuid},{$set:dataToUpdate});
            if(!dataToUpdate){
                return {
                    success: false,
                    message: "Error updating user"
                }
            }
            return {
                success: true,
                message: `The user ${userUuid} was updated successfully`
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUser(userUuid){
        if(_.isNil(userUuid) ){
            throw new Error('UUID PARAM MISSING')
        }
        try {
            const userDelete = await userModel.deleteOne({uuid: userUuid})
            if(!userDelete){
                return {
                    success: false,
                    message: "Error deleting user"
                }
            }
            return {
                success: true,
                message: `The user ${uuid} was deleted successfully`
            }

            

        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = UserService;