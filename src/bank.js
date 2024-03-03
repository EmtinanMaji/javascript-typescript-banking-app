var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        if (date === void 0) { date = new Date(); }
        this.amount = amount;
        this.date = new Date();
    }
    return Transaction;
}());
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transaction) { return total + transaction.amount; }, 0);
    };
    Customer.prototype.addTransactions = function (amount) {
        if (this.getBalance() + amount < 0) {
            console.log("Transaction would result in a negative balance.");
            return false;
        }
        else {
            this.transactions.push(new Transaction(amount));
            console.log("Transaction was successful.");
            return true;
        }
    };
    return Customer;
}());
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    Branch.prototype.getName = function () {
        return this.name;
    };
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    Branch.prototype.addCustomer = function (customer) {
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            console.log("(".concat(customer.name, ")(").concat(customer.id, ") added successfully"));
            return true;
        }
        else {
            console.log("(".concat(customer, ") already added in the branch."));
            return false;
        }
    };
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (customer) { return customer.getId() === customerId; });
        if (customer) {
            console.log("Customer with Id ".concat(customerId, " found in the branch."));
            return customer.addTransactions(amount);
        }
        else {
            console.log("Customer with Id ".concat(customerId, "  not found in the branch."));
            return false;
        }
    };
    return Branch;
}());
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    Bank.prototype.addBranch = function (branch) {
        if (!this.branches.includes(branch)) {
            this.branches.push(branch);
            console.log("the (".concat(branch.name, ") added successfully to (").concat(this.name, ") bank."));
            return true;
        }
        else {
            console.log("the (".concat(branch.name, ") already added in (").concat(this.name, ") bank."));
            return false;
        }
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (this.branches.includes(branch)) {
            return branch.addCustomer(customer);
        }
        else {
            console.log("can not add customer because the branch not found in the bank.");
            return false;
        }
    };
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        if (this.checkBranch(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
        }
        else {
            console.log("can not add customer transaction because the branch not found in the bank.");
            return false;
        }
    };
    Bank.prototype.findBranchByName = function (branchName) {
        var Branch = this.branches.find(function (branch) { return branch.getName() === branchName; });
        return Branch || console.log("(".concat(branchName, ") Branch name not found"));
    };
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        if (this.checkBranch(branch)) {
            branch.getCustomers().forEach(function (customer) {
                console.log("Customer Name: ".concat(customer.getName(), ", Customer ID: ").concat(customer.getId()));
                if (includeTransactions) {
                    var transactions = customer.getTransactions();
                    transactions.forEach(function (transaction) {
                        console.log("Transactions: ".concat(transaction.amount, " , at ").concat(transaction.date));
                    });
                }
            });
        }
        else {
            console.log("Branch does not belong to the bank.");
        }
    };
    return Bank;
}());
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("John", 3);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
console.log("---------------------------------------------------------");
console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("sun"));
console.log("---------------------------------------------------------");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
console.log("---------------------------------------------------------");
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
console.log("---------------------------------------------------------");
customer1.addTransactions(-1000);
console.log(customer1.getBalance());
console.log("---------------------------------------------------------");
arizonaBank.listCustomers(westBranch, true);
console.log("---------------------------------------------------------");
arizonaBank.listCustomers(sunBranch, true);
console.log("---------------------------------------------------------");
