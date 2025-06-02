import dotenv from 'dotenv';

//configure the environment variables
dotenv.config();

import Server from "./models/server";

const server = new Server();