const express = require('express');
const { createCanvas } = require('canvas');
const sharp = require('sharp');

const app = express();
const port = 3000;

app.get('/initials/:name', (req, res) => {
    const { name } = req.params;
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext('2d');

    // Draw a background
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw initials
    context.fillStyle = '#000000';
    context.font = 'bold 100px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initials, canvas.width / 2, canvas.height / 2);

    const buffer = canvas.toBuffer('image/png');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
});

app.get('/initials2/:name', async (req, res) => {
    const { name } = req.params;
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();

    const svgImage = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FFFFFF"/>
        <text x="50%" y="50%" font-size="100" text-anchor="middle" fill="#000000" dy=".3em">${initials}</text>
      </svg>
    `;

    const imageBuffer = Buffer.from(svgImage);

    try {
        const pngImage = await sharp(imageBuffer)
            .png()
            .toBuffer();

        res.set('Content-Type', 'image/png');
        res.send(pngImage);
    } catch (error) {
        console.log({error})
        res.status(500).send({m:'Error generating image', error});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
