import { createClient } from 'redis';
//use dotenv to get environment variables

import dotenv from 'dotenv';
dotenv.config();

const { host, password, port } = process.env;

export const redis = createClient({
    password: password,
    socket: {
        host: host,
        port: Number(port)
    }
});

redis.connect();

//clear redis
redis.flushAll();

try{

    redis.on('connect', async () => {
        console.log('Redis Connected');
    });
    
    redis.on('error', (error) => {
        console.log('Redis Error', error);
    });
    
    redis.on('ready', () => {
        console.log('Redis Ready');
    });
    
    redis.on('end', () => {
        console.log('Redis End');
    });
    
    redis.on('warning', (warning) => {
        console.log('Redis Warning', warning);
    });
    
    redis.on('reconnecting', () => {
        console.log('Redis Reconnecting');
    });
} catch (error) {
    console.error(error);
}