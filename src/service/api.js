import axios from "axios"
const BaseUrl = "https://ecommerse.apasni.me/"

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
async function getSubCategory(subId, limit, page = 1, size, color, discount, min, max,order) {
    const res = await axios.get(`${BaseUrl}products/all?subcategoryId=${subId}&limit=${limit}&page=${page}&size=${size}&color=${color}&discount=${discount}&minPrice=${min}&maxPrice=${max}&sortOrder=${order}`)
    return res.data
}
async function getCategory(catId, limit, page = 1, size, color, discount, min, max,order) {
    const res = await axios.get(`${BaseUrl}products/all?categoryId=${catId}&limit=${limit}&page=${page}&size=${size}&color=${color}&discount=${discount}&minPrice=${min}&maxPrice=${max}&sortOrder=${order}`)
    return res.data
}
async function getProductId(id) {
    const res = await axios.get(`${BaseUrl}products/get/${id}`)
    return res.data
}
async function getProductSearch(value) {
    const res = await axios.get(`${BaseUrl}products/search?q=${value}`)
    return res.data
}
export {
    getProductSearch,
    getAllCategory,
    getAllBags,
    getAllShirt,
    getSubCategory,
    getCategory,
    getProductId,
}