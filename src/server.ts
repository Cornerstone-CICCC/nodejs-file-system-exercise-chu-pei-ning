// Check the README.md file for instructions to the exercise
import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import dotenv from 'dotenv'
dotenv.config()

const directory = "images"
const filePath = path.join(__dirname, "./", directory)

const server = http.createServer((req, res) => {
  const { method } = req;
  const parsedUrl = url.parse(req.url || '', true)
  const { pathname, query } = parsedUrl
  const fileName = 'veryhappydog.jpg'

  if (pathname === "/view-image" && method === "GET") {
    fs.readFile(`${filePath}/${fileName}`, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("Error reading file!")
        return
      }

      res.writeHead(200, { "Content-Type": "text/plain" })
      res.end(data) // Send text content
    })
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("Not Found!")
  return
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})