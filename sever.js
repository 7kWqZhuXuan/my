const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 假设我们有一个文件来存储用户的历史记录
const historyFile = 'history.json';

app.get('/history', (req, res) => {
    const username = req.query.username;
    if (!username) {
        res.status(400).send('Username is required');
        return;
    }

    // 读取历史记录文件
    fs.readFile(historyFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        const history = JSON.parse(data);
        const userHistory = history[username];
        if (!userHistory) {
            res.status(404).send('User history not found');
            return;
        }

        res.json(userHistory);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});