import dotenv from 'dotenv';

dotenv.config(
    { path: '../../.env' }
); 

console.log(process.env.PORT);

interface Config {
    port: number;
    nodeEnv: string;
};

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;