import express from 'express';
import cors from 'cors'; // Import cors
import router from './routes/route';
import swaggerUi from 'swagger-ui-express';
// import swaggerJSDoc from "./docs/swaggerConfig";
import { PORT } from './secrets';
import swagger from './swagger';
const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json());
app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
