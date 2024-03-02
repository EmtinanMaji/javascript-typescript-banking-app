class Transaction {
    amount;
    date;
    constructor(amount, date) {
      this.amount = amount;
        this.date = new Date();
    }
  }
  
  class Customer {
    name;
    id;
    transactions = [];
  
    constructor(name, id) {
      this.name = name;
      this.id = id;
      this.transactions = [];
  
    }
    
    getName() {
        return this.name;
    }
  
    getId() {
        return this.id;
    }
  
    getTransactions() {
        return this.transactions;
    }
  
    getBalance() {
        return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
    }
  
    addTransactions(amount) {
      if (amount >= 0) {
        const newTransaction = new Transaction(amount, new Date());
        this.transactions.push(newTransaction);
        return true;
      } else {
        console.error('Transaction amount cannot be negative.');
        return false;
      }
    }
  }
    
  
  class Branch {
    name;
    customers = [];
  
    constructor(name) {
      this.name = name;
      this.customers = [];
    }
     
    getName() {
        return this.name;
    }
  
    getCustomers() {
        return this.customers;
    }
  
    addCustomer(customer) {
      if (!this.customers.includes(customer)) {
        this.customers.push(customer);
        return true;
      } else {
        console.error('Customer already exists in the branch.');
        return false;
      }
    }
  
    addCustomerTransaction(customerId, amount) {
        const customer = this.customers.find(customer => customer.getId() === customerId);
        if (customer) {
            return customer.addTransactions(amount);
        } else {
            console.log("Customer not found in the branch.");
            return false;
        }
    }
  }
  
  class Bank {
    name;
    branches = [];
  
    constructor(name) {
      this.name = name;
      this.branches = [];
    }
  
    addBranch(branch) {
        if (!this.branches.includes(branch)) {
            this.branches.push(branch);
            return true;
        } else {
            console.log("Branch already exists in the bank.");
            return false;
        }
    }
  
    addCustomer(branch, customer) {
        if (this.branches.includes(branch)) {
            return branch.addCustomer(customer);
        } else {
            console.log("Branch not found in the bank.");
            return false;
        }
    }
  
    addCustomerTransaction(branch, customerId, amount) {
        if (this.branches.includes(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
        } else {
            console.log("Branch not found in the bank.");
            return false;
        }
    }
  
    findBranchByName(branchName) {
      return this.branches.filter((branch) => branch.getName() === branchName);
    }
    
    checkBranch(branch) {
        return this.branches.includes(branch);
    }
  
    listCustomers(branch, includeTransactions) {
        
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
  

    
    arizonaBank.findBranchByName("bank")
    arizonaBank.findBranchByName("sun")
    
    arizonaBank.addCustomer(westBranch, customer1)
    arizonaBank.addCustomer(westBranch, customer3)
    arizonaBank.addCustomer(sunBranch, customer1)
    arizonaBank.addCustomer(sunBranch, customer2)
    
    arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 3000)
    arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 2000)
    arizonaBank.addCustomerTransaction(westBranch, customer2.getId, 3000)
    
    customer1.addTransactions(-1000)
    console.log(customer1.getBalance())
  