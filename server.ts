import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { PORT } from './src/secrets';
import router from './src/routes/route';
//import { apiDocumentation } from './docs/apidoc';

const app = express();

app.use(express.json());
app.use('/api', router);


//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
