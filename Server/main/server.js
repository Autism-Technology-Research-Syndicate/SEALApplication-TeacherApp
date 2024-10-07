const app = require('./app');
const db = require('./db'); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.get('/teachers', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM Teacher'); 
      console.log('Query successful:', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send(error.message);
    }
  });
