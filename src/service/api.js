import axios from "axios"
const BaseUrl="https://ecommerse.apasni.me/"

async function getAllCategory() {
    const res = await axios.get(`${BaseUrl}categories/all`)
    return res.data
}
async function getAllBags() {
    const res = await axios.get(`${BaseUrl}products/all?categoryId=4&limit=18`)
    return res.data
}
async function getAllShirt() {
    const res = await axios.get(`${BaseUrl}products/all?subcategoryId=1`)
    return res.data
}
async function getSubCategory(subId,limit,page=1,size,color,discount) {
    const res = await axios.get(`${BaseUrl}products/all?subcategoryId=${subId}&limit=${limit}&page=${page}&size=${size}&color=${color}&discount=${discount}`)
    return res.data
}
async function getCategory(catId,limit,page=1,size,color,discount) {
    const res = await axios.get(`${BaseUrl}products/all?categoryId=${catId}&limit=${limit}&page=${page}&size=${size}&color=${color}&discount=${discount}`)
    return res.data
}
export {
    getAllCategory,
    getAllBags,
    getAllShirt,
    getSubCategory,
    getCategory
}