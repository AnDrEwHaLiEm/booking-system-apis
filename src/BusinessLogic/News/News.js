const Edit = require('../Edit/Edit');
const NewsModel = require('../../MongoSchema/News/newsModel');
const employee = require('../Employee/Employee');

class News extends Edit {
    constructor(Model) {
        super(Model)
    }

    async addNewsCreator(req, res, next) {
        const { _id } = req.body.decodedToken;
        req.body.postedBy = _id;
        next();
    }

    async addNewsEditor(req, res, next) {
        const { _id } = req.body.decodedToken;
        const newsInformations = await NewsModel.findById(req.body._id);
        if (!newsInformations) {
            res.sendStatus(404);
            return;
        }
        const { editedBy } = newsInformations;
        req.body.editedBy = [...editedBy, { _id: _id, editDate: Date.now() }];
        next();
    }

    async getOneNews(req, res, employeeState) {
        try {
            const { _id } = req.params;
            const selectedNews = await this.Model.findById(_id);
            if (!selectedNews)
                return res.sendStatus(404);
            if (employeeState == true) {
                const { editedBy, postedBy } = selectedNews;
                const employeePostedBy = await employee.getEmployees(postedBy);
                if (employeePostedBy.length > 0) {
                    const { firstName, lastName, personalPicture } = employeePostedBy[0];
                    selectedNews._doc.postedBy = { _id: selectedNews.postedBy, firstName, lastName, personalPicture };
                }
                else {
                    selectedNews._doc.postedBy = {
                        _id: selectedNews.postedBy, firstName: "", lastName: "", personalPicture: "NotFound"
                    }
                }
                selectedNews._doc.editedBy = await Promise.all(editedBy.map(async (element) => {
                    const { _id, editDate } = element;
                    const employeesEditedBy = await employee.getEmployees(_id);
                    if (!employeesEditedBy.length)
                        return { _id, firstName: "", lastName: "", personalPicture: "NotFound" };
                    console.log(employeesEditedBy[0]);
                    const { firstName, lastName, personalPicture } = employeesEditedBy[0];
                    return { _id, firstName, lastName, personalPicture, editDate };
                }));
                return res.json({ selectedNews });
            }
            else {
                const { title, description, caption, image, postDate } = selectedNews;
                return res.json({ result: { title, description, caption, image, postDate } });
            }
        } catch (error) {
            return res.status(400).send(`error when get One news${error}`);
        }
    }

    async getAllNews(req, res, employeeState) {
        const { limit } = req.params;
        const getAllNews = await this.Model.find().limit(parseInt(limit));
        if (getAllNews == null)
            return res.status(404).send("Models Not Found");
        const resualt = getAllNews.map((element) => {
            if (employeeState === true) {
                const { _id, title, caption, image, postDate } = element;
                return { _id, title, caption, image, postDate };
            }
            else {
                const { _id, title, caption, image, postDate } = element;
                return { _id, title, caption, image, postDate };
            }
        });
        return res.json({ resualt });
    }

}

const news = new News(NewsModel);
module.exports = news;