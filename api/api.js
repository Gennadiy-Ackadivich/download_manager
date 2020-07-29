const path = require('path')
const fs = require('fs')
const url = require('url')

class Helper {
    async getParseData() {
        return this.fetchAll().then(res => JSON.parse(res)).catch(e => console.log(e))
    }

    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.pathToDatabase, JSON.stringify(data), "utf-8", (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }
}

class Api extends Helper {
    constructor() {
        super()
       this.pathToDatabase = path.resolve(__dirname, 'api.json')
    }

    fetchAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.pathToDatabase, "utf-8", (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    async fetchAdd(item) {
        const data = await this.getParseData()
        data.push(item)
        return this.write(data)
    }

    async deleteById(id) {
        const data = await this.getParseData()
        const result = data.filter(item => item.id !== Number(id))
        console.log(result)
        return this.write(result)
    }
}

class Formatter {
    constructor(data) {
        this.data = data
    }

    all() {
        const data = JSON.parse(this.data)
        data.forEach((item) => {
            if (item.logo) {
                if (!item.path) item.path = item.logo
            }
            item.type = item.path.split('.').pop()
            item.pathName = item.path.split('/').pop()
        })
        return JSON.stringify(data)
    }
}

module.exports = {
    Api,
    Formatter
}