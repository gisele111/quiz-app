import express from 'express';
import { PORT } from './src/secrets';;
import router from './src/routes/route';


const app = express()
app.use(express.json())
app.use('/api', router);


app.listen(PORT, () => {
    console.log('app is running on port 6000')
})
