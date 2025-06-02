"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.postBlog = exports.deleteBlog = exports.getBlog = exports.getBlogs = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listBlogs = yield blog_1.default.findAll();
    res.json(listBlogs);
});
exports.getBlogs = getBlogs;
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = yield blog_1.default.findByPk(id);
    if (blog) {
        res.json(blog);
    }
    else {
        res.status(404).json({
            msg: `Blog with id ${id} doesn't exist`
        });
    }
});
exports.getBlog = getBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = yield blog_1.default.findByPk(id);
    if (blog) {
        yield blog.destroy();
        res.json({
            msg: `Blog with id ${id} deleted`
        });
    }
    else {
        res.status(404).json({
            msg: `Blog with id ${id} doesn't exist`
        });
    }
});
exports.deleteBlog = deleteBlog;
const postBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield blog_1.default.create(body);
        res.json({
            msg: 'Blog was created',
            body
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Mistake occured, communicate with support team.',
        });
    }
});
exports.postBlog = postBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const blog = yield blog_1.default.findByPk(id);
    try {
        if (blog) {
            yield blog.update(body);
            res.json({
                msg: `Blog with id ${id} was updated`,
            });
        }
        else {
            res.status(404).json({
                msg: `Blog with id ${id} doesn't exist`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Mistake occured, communicate with support team.',
        });
    }
});
exports.updateBlog = updateBlog;
