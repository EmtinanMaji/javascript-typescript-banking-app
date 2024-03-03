class Transaction {
  amount: number;
  date: Date;
  constructor(amount: number, date: Date = new Date()) {
    this.amount = amount;
    this.date = new Date();
  }
}

class Customer {
  name: string;
  id: number;
  transactions: Transaction[];

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transactions = [];

  }
  
  getName(): string {
      return this.name;
  }

  getId(): number {
      return this.id;
  }

  getTransactions(): Transaction[] {
      return this.transactions;
  }

  getBalance(): number {
      return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  addTransactions(amount: number): boolean {
    if (this.getBalance() + amount < 0) {
      console.log("Transaction would result in a negative balance.");
      return false;
    }else{
      this.transactions.push(new Transaction(amount));
      console.log("Transaction was successful.");
      return true;
    } 
    }
  }
  

class Branch {
  name: string;
  customers: Customer[];

  constructor(name: string) {
    this.name = name;
    this.customers = [];
  }
   
  getName(): string {
      return this.name;
  }

  getCustomers(): Customer[] {
      return this.customers;
  }

  addCustomer(customer: Customer): boolean {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      console.log(`(${customer.name})(${customer.id}) added successfully`);
      return true;
    } else {
      console.log(`(${customer}) already added in the branch.`);
      return false;
    }
  }

  addCustomerTransaction(customerId: number, amount: number): boolean {
      const customer = this.customers.find(customer => customer.getId() === customerId);
      if (customer) {
        console.log(`Customer with Id ${customerId} found in the branch.`);
        return customer.addTransactions(amount);
      } else {
        console.log(`Customer with Id ${customerId}  not found in the branch.`);
        return false;
      }
  }
}

class Bank {
  name: string;
  branches: Branch[];

  constructor(name: string) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch: Branch): boolean {
      if (!this.branches.includes(branch)) {
          this.branches.push(branch);
          console.log(`the (${branch.name}) added successfully to (${this.name}) bank.`);
          return true;
      } else {
          console.log(`the (${branch.name}) already added in (${this.name}) bank.`);
          return false;
      }
  }

  addCustomer(branch: Branch, customer: Customer): boolean {
      if (this.branches.includes(branch)) {
          return branch.addCustomer(customer);
      } else {
          console.log("can not add customer because the branch not found in the bank.");
          return false;
      }
  }

  addCustomerTransaction(branch: Branch, customerId: number, amount: number): boolean {
      if (this.checkBranch(branch)) {
          return branch.addCustomerTransaction(customerId, amount);
      } else {
          console.log("can not add customer transaction because the branch not found in the bank.");
          return false;
      }
  }

  findBranchByName(branchName: string) {
      const Branch = this.branches.find((branch) => branch.getName() === branchName);
      return Branch || console.log(`(${branchName}) Branch name not found`);
  }
  
  checkBranch(branch: Branch): boolean {
      return this.branches.includes(branch);
  }

  listCustomers(branch: Branch, includeTransactions: boolean): void {
      if (this.checkBranch(branch)) {
          branch.getCustomers().forEach(customer => {
              console.log(`Customer Name: ${customer.getName()}, Customer ID: ${customer.getId()}`);
              if (includeTransactions) {
                const transactions = customer.getTransactions();
                transactions.forEach(transaction => {
                console.log(`Transactions: ${transaction.amount} , at ${transaction.date}`);
              });
              }
          });
      } else {
          console.log("Branch does not belong to the bank.");
      }
  }
  
    searchCustomers(customerName: string): boolean {
      let found = false;
      this.branches.forEach(branch => {
          if (branch.getCustomers().find(customer =>
              customer.getName().toLowerCase().includes(customerName.toLowerCase()) 
          )) {
            console.log(`Customer (${customerName}) found`);
            found = true;
          }
      });
      if (!found){
        console.log(`Customer (${customerName}) not found`);
      }
      return found;      
}
}


const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch); 
console.log("---------------------------------------------------------")

console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("sun"));
console.log("---------------------------------------------------------")

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
console.log("---------------------------------------------------------")

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
console.log("---------------------------------------------------------")


customer1.addTransactions(-1000);
console.log(customer1.getBalance());
console.log("---------------------------------------------------------")

arizonaBank.listCustomers(westBranch, true);
console.log("---------------------------------------------------------")

arizonaBank.listCustomers(sunBranch, true);
console.log("---------------------------------------------------------")

arizonaBank.searchCustomers("Anna");

arizonaBank.searchCustomers("Emtinan");
