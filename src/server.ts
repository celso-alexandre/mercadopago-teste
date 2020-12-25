import mercadopago from 'mercadopago';
import express from 'express';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import * as dotenv from 'dotenv';

dotenv.config();

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || '' as string,
});

const server = express();

server.use(express.json());
server.post('/venda', async (request, response) => {
  const {
    title, quantity, currency_id, unit_price,
  } = request.body;

  const preference = {
    items: [
      {
        /* title: 'Test',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 10.5, */
        title, quantity, currency_id, unit_price,
      },
    ],
  };

  const venda = await mercadopago.preferences.create(preference as CreatePreferencePayload);

  return response.json(venda);
});

server.listen(3333, () => console.log('Escutando a porta 3333'));
