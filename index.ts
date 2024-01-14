import express, {Express, Request, Response} from 'express';
import { PORT } from './src/secrets';
import rootRouter from './src/routes';
import { PrismaClient } from '@prisma/client';
const app:Express = express()
app.use(express.json())
app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({

})

app.listen(PORT, () => {
    console.log('app is running on port 6000')
})
