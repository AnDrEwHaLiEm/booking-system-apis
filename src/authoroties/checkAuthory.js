/*import { NextFunction, Request, Response } from "express";
import UserModel from "../MongoSchema/user/userModel";
interface LooseObject {
    [key: string]: {
        [key: string]: string | string[] | null
    }
}

const authorities: LooseObject = {
    owner: {
        user: "*",
        employee: "*",
        news: "*",
        competitionApplication: "*",
        candidateApplication: "*",
        team: "*",
        project: "*",
        currentOpenings: "*",
        contactUs: "*",
        sendEmail: "*",
        reviews: "*",
        ourWork: "*"

    },
    admin: {
        user: ["GET", "PUT", "POST"],
        employee: "*",
        news: null,
        competitionApplication: ["GET", "DELETE"],
        candidateApplication: ["GET", "DELETE"],
        team: "*",
        project: "*",
        currentOpenings: "*",
        contactUs: null,
        sendEmail: "*",
        reviews: null,
        ourWork: null
    },
    editor: {
        user: ["GET", "PUT"],
        employee: null,
        news: "*",
        competitionApplication: null,
        candidateApplication: null,
        team: null,
        project: null,
        currentOpenings: "*",
        contactUs: "*",
        sendEmail: "*",
        reviews: "*",
        ourWork: null
    }

}


export default async function checkAuthorty(req: Request, res: Response, next: NextFunction) {
    try {
        const modelName = req.url.split('/')[1];
        const { method } = req
        const { _id } = req.body.decodedToken
        const user = await UserModel.findById({ _id })
        if (!user) {
            return res.sendStatus(401);
        }
        const userAuthoritiesInAllModels = authorities[user.authority]
        const userAuthoritiesInOneModel = userAuthoritiesInAllModels[modelName]
        if (!userAuthoritiesInOneModel)
            return res.sendStatus(401);
        if (userAuthoritiesInOneModel === "*" || userAuthoritiesInOneModel.includes(method)) 
            return next()
        else
            return res.sendStatus(401);
    } catch (error) {
        res.status(400).send({ error })
    }
}*/