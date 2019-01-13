import Client, { jwtPlugin } from '@synapsestudios/fetch-client';
import localstorage from 'store2';
import config from './config';

const client = new Client({ url: config.apiUrl });

client.addPlugin(jwtPlugin);
client.setJwtTokenGetter(() => localstorage.get('token'));

export default client;
