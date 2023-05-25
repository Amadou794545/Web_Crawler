import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from "path";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "\\index.html")
    // res.sendFile(path.join('Web/template/start.html'));
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
