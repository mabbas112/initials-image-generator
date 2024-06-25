const express = require('express');
const { createCanvas } = require('canvas');

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
