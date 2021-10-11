const express = require('express');
const fileUpload = require('express-fileupload');
const XLSX = require('xlsx');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const cors = require('cors');
app.use(
    cors(),
    fileUpload({
        createParentPath: true,
    })
);
app.get('/hello', (req, res) => {
    console.log('Hello Express!');
    res.status(200).json({ message: 'Hello World' });
});
app.listen(PORT, () =>
    console.log(`✅ API Server started: http://${HOST}:${PORT}`)
);

app.post('/upload', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded',
            });
        } else {
            let upload = req.files.upload;
            let excel = readFile(upload);
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: upload.name,
                    mimetype: upload.mimetype,
                    size: upload.size,
                    excel: excel,
                },
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

function readFile(upload) {
    let workbook = XLSX.read(upload.data);
    console.log(workbook);
    let json = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1'], null);
    console.log(JSON.stringify(json));
    return json;
}
