import { Book } from "../models/book.models.js";
import { Transaction } from "../models/transactions.models.js";
import {User } from "../models/user.models.js";

const createExchangeTransaction= async (req,res) =>{
    try {
        const {lender, exchangedBookId, offeredBookId} = req.body;
    
    if(!lender || !exchangedBookId || !offeredBookId){
        return res.status(400).json({
            status: false,
            message: 'Please Provide all values'
        })
       
    }
    const exchangedBook = await Book.findbyId(exchangedBookId);
    if(!exchangedBook){
        return res.status(400).json({
            status: false,
            message: 'Given book does not exist'
        })
    }
   
    const exchangeRequest= await Transaction.create({
        lender,
        requestedBook:exchangedBookId,
        offeredbook:offeredBookId,
        transactionStatus:"Requested",
        isExchanging:true,
    })
    const updatedUser = await User.findByIdAndUpdate({_id:exchangedBook.ownerName},{
        $push: {
          transactionRequests: exchangeRequest._id,
        },
      },
      { new: true });
      return res.status(200).json({
        success: true,
        message: "Request Sent Successfully",
        updatedUser
      })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
          })
        
    }
}

const createBorrowTransaction= async (req,res) =>{
   try {
    const {lender, borrowedBookId} = req.body;
    
    if(!lender || !borrowedBookId ){
        return res.status(400).json({
            status: false,
            message: 'Please Provide all values'
        })
       
    }
    const borrowedBook = await Book.findbyId(borrowedBookId);
    if(!borrowedBook){
        return res.status(400).json({
            status: false,
            message: 'Given book does not exist'
        })
    }
   
    const borrowRequest= await Transaction.create({
        lender,
        requestedBook:borrowedBookId,
        transactionStatus:"Requested",
        isBorrowing:true,
    })
    const updatedUser = await User.findByIdAndUpdate({_id:borrowedBook.ownerName},{
        $push: {
          transactionRequests: borrowRequest._id,
        },
      },
      { new: true });
      return res.status(200).json({
        success: true,
        message: "Request Sent Successfully",
        updatedUser
      })
    
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
      })
   }
}

export {
    createExchangeTransaction ,
    createBorrowTransaction 
}