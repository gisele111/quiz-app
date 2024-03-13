import express from 'express';
import cors from 'cors'; 
import router from './routes/route';
import swaggerUi from 'swagger-ui-express';
import { PORT } from './secrets';
import swagger from './swagger';
const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
