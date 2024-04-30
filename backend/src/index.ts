import cors from 'cors';
// eslint-disable-next-line node/no-unpublished-import
import dotenv from 'dotenv';
import express from 'express';

import getLoggerInstance from './utils/log';

import gameRoutes from './routes/gameRoutes';
import slotMachineRoutes from './routes/slotMachineRoutes';

dotenv.config();

// set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// enables CORS, should be removed if fe and be in same origin
app.use(cors());
app.use(getLoggerInstance()); // access and error log
app.use(express.json()); // parsing of JSON bodies

// welcome
app.get('/', (req, res) => res.send('Welcome to Kanon Gaming'));

// routes
app.use('/api/games', gameRoutes);
app.use('/api/slot-machine', slotMachineRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
