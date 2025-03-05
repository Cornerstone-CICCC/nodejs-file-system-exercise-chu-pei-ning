"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Check the README.md file for instructions to the exercise
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const directory = "images";
const filePath = path_1.default.join(__dirname, "./", directory);
const server = http_1.default.createServer((req, res) => {
    const { method } = req;
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const { pathname, query } = parsedUrl;
    const fileName = 'veryhappydog.jpg';
    if (pathname === "/view-image" && method === "GET") {
        fs_1.default.readFile(`${filePath}/${fileName}`, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error reading file!");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data); // Send text content
        });
        return;
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found!");
    return;
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
