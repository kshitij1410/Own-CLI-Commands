const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/customercli', {
     useNewUrlParser: true 
})

//import model
const Customer = require("./models/customer");


//add query
const addCustomer = (customer) =>{
    Customer.create(customer).then(customer => {
        console.log("Customer Successfully added!!!");
        mongoose.connection.close()
        
    })
}

//find query

const findCustomer = (name) =>{

    //case insensitive-search
    //using reg expression
    const search =new RegExp(name,'i');

    Customer.find({$or: [{firstname: search}, {lastname: search}] })
        .then(customer => {
            console.log(customer);
            console.log(`${customer.length} matches`);
            mongoose.connection.close();
           

        })
        
}

//upadate query

const updateCustomer = (_id,customer)=> {
    Customer.updateMany({_id},customer).then(customer => {
        console.log("Customer Update Succesfully");
        mongoose.connection.close();
    })
}

// Remove Customer
const removeCustomer = (_id) => {
    Customer.remove({ _id })
      .then(customer => {
        console.info('Customer Removed');
       
      });
  }
  
  // List Customers
  const listCustomers = () => {
    Customer.find()
      .then(customers => {
        console.info(customers);
        console.info(`${customers.length} customers`);
        
      });
  }

  
  module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
  }