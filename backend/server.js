const express = require('express'); 
const connectDB = require('./src/databases/connect.js');
const cors = require('cors');

const app = express();
const port = 80;

app.use(
	cors({
		origin: ["http://localhost:8000"],
		methods: "GET,POST,PUT,PATCH,DELETE",
		credentials: true
	})
)

app.get('/api/query/student', async (req, res) => { 

    try {  
        connectDB.query('SELECT * FROM student', async (err, result) => {

            if (err) return res.status(500).json({message: err}); 
    
            return res.status(200).json(result ? result : false);
        });
    } catch (err) {
        res.send({message: 'Error when query database!'});
    }
});

app.get('/api', (req, res) => {
    res.send('Backend run with docker compose!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})