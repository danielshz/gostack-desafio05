import { Router, Request, Response } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request: Request, response: Response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.status(200).json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request: Request, response: Response) => {
  try {
    const { title, value, type } = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    return response
      .status(201)
      .json(createTransactionService.execute({ title, value, type }));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
