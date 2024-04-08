import { db } from "../DB/config/config.js"

/**
 * @typedef {Object} userData
 * @property {string} Name
 * @property {string} Email
 * @property {number} Age
 * @property {boolean} IsAdmin
 * @property {string} Password
 */
export const userData = {
    Name: "",
    Email: "",
    Age: "",
    IsAdmin: false,
    Password: ""
}

export const User = {
    create: (userData) => db("User").insert(userData),
    find: (id) => db("User").where({id}).first(),
    findAll: () => db("User").select(),
    update: (userData, id) => db("User").where({id}).update(userData),
    delete: (id) => db("User").where({ id }).del(),
}