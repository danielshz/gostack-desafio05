import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const lowerCaseType = type.toLowerCase();

    if (lowerCaseType !== 'income' && lowerCaseType !== 'outcome')
      throw Error('Invalid transaction type');

    if (
      lowerCaseType === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    )
      throw Error('The outcome value exceded the balance');

    return this.transactionsRepository.create({
      title,
      value,
      type: lowerCaseType,
    });
  }
}

export default CreateTransactionService;
