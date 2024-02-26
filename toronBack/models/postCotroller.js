const cors = require('cors');
const express = require('express');
const app = express();
let connection = require('../config/db').init();
const path = require('path');
const fs = require('fs').promises;

const { addPost } = require('../../toronFront/modules/actions.js');

app.use(express.json());
app.use(cors());

let currentIndex = 0;

const getCurrentIndex = async () => {
    try {
        const indexPath = path.join(__dirname, 'currentIndex.json');
        const jsonData = await fs.readFile(indexPath, 'utf-8');
        const indexData = JSON.parse(jsonData);
        return indexData.currentIndex;
    } catch (error) {
        console.error('Failed to read currentIndex:', error);
        return 0;
    }
};

const setCurrentIndex = async (index) => {
    try {
        const indexPath = path.join(__dirname, 'currentIndex.json');
        const indexData = { currentIndex: index };
        await fs.writeFile(indexPath, JSON.stringify(indexData));
    } catch (error) {
        console.error('Failed to write currentIndex:', error);
    }
};

const cronJob = async () => {
    try {
        const jsonData = await fs.readFile(path.join(__dirname, '..', 'models', 'postdata.json'), 'utf-8');
        const data = JSON.parse(jsonData);

        if (data.length > 0) {
            const currentIndex = await getCurrentIndex();
            const { id, board_content, state } = data[currentIndex];

            if (id === currentIndex + 1) {
                const result = await connection.execute('INSERT INTO board (board_content, state) VALUES (?, ?)', [board_content, state]);
                const insertId = result.insertId;
                console.log(`Data successfully inserted.`);
                await setCurrentIndex((currentIndex + 1) % data.length);
            } else {
                console.log('JSON id does not match currentIndex.');
            }
        } else {
            console.log('No data to insert.');
        }
    } catch (error) {
        console.log('Error inserting data:', error);
    }
};

module.exports = cronJob;