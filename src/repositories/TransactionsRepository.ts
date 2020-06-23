import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0)
      return { income: 0, outcome: 0, total: 0 };

    const reduceFunction = (accumulator: number, current: number): number =>
      accumulator + current;

    const incomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    const outcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    const incomeTotal = incomes.length ? incomes.reduce(reduceFunction) : 0;
    const outcomeTotal = outcomes.length ? outcomes.reduce(reduceFunction) : 0;

    const total = this.transactions
      .map(transaction =>
        transaction.type === 'income' ? transaction.value : -transaction.value,
      )
      .reduce(reduceFunction);

    return { income: incomeTotal, outcome: outcomeTotal, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
