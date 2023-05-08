const ethers = require("ethers");
//const Web3 = require("web3");
//const tokenabi = require('./token.json')
const db = require("../public/javascripts/index");
let provider;

//const web3 = new Web3("http://162.243.168.167:22000");

const initializeWeb3 = async () => {
  try {
    provider = new ethers.providers.JsonRpcProvider(
      "http://162.243.168.167:22000"
    );
  } catch (error) {
    console.log(":: INITIALIZE_WEB3_ERROR :: ");
  }
};
let bnum;
let i=0;
// const getblock = async () => {
//   let status = false;
//   try {

//     // blockNumber = await web3.eth.getBlockNumber();
//     // let a= BigInt(blockNumber)
//     // console.log(a);

//     //   if(bnum==blockNumber)
//     //   {
//     //     setTimeout(getblock, 500);
//     //   }
//     //   else
//     //   {
//     //    // await blockdetalnum(blockNumber);
//     //    try{
//     //  //  block = await provider.getBlock(949);
//     //   // console.log("jhbjhbhj",blockNumber)
//     //     await blockdetalnum(a)
//     //     bnum = blockNumber;
//     //     setTimeout(getblock, 500);
//     //    }
//     //    catch(e){
//     //     console.log(e)
//     //    }

//    //  }

//    web3.eth.getBlockNumber().then(blockNumber => {

//     // Get the block details for the latest block
//     web3.eth.getBlock(blockNumber).then(block => {
//       console.log(block);
//     }).catch(error => {
//       console.error(error);
//     });
  
//   }).catch(error => {
//     console.error(error);
//   });

//   } catch (error) {
//     console.log(":: ERROR :: ", error);

//     return {
//       status: status,
//       message: error.reason,
//     };
//   }
// };

// const blockdetalnum = async (bnum) => {
//   let status = false;
//   let tx;
//   try {
//    let block=await  web3.eth.getBlock(bnum)

//       let time = block.timestamp;
//       let length = block.transactions.length;
//      // tx = await provider.getBlockWithTransactions(bnum - 1);
//       status = true;
//       if (length > 0) {
//         for (let i = 0; i < length; i++) {
//           let a = await txdetalil(block.transactions[i]);
//             await db.txdata(
//               a.tran.hash,
//               a.tran.blockNumber,
//               a.tran.confirmations,
//               a.tran.from,
//               Number(a.tran.gasPrice._hex),
//               a.tran.to,
//               Number(a.tran.value._hex),
//               a.tran.nonce,
//               a.tran.chainId,
//               a.tranr.status,
//               time,
//               Number(a.tranr.gasUsed._hex),
//               Number(a.tran.gasLimit._hex)
//             );
//       }

//           }
//   } catch (error) {
//     console.log(":: ERR3OR :: ", error);
//     return error;
//   }
// };

const txdetalil = async (txhash) => {
  let status = false;
  let tx;
  let txr;
  try {
    await initializeWeb3();

    await provider.getTransaction(txhash).then(function (transaction) {
     //   console.log(transaction);
      tx = transaction;
    });

    await provider
      .getTransactionReceipt(txhash)
      .then(function (transactionReceipt) {
     //     console.log(transactionReceipt);
        txr = transactionReceipt;
      });

    status = true;

    return {
      status: status,
      tran: tx,
      tranr: txr,
    };
  } catch (error) {
  //  console.log(":: ERROR :: ", error);

    return {
      status: status,
      message: error.reason,
    };
  }
};



// const all = async () => {
//   await initializeWeb3();
//   const a = await getblock();
// //  await blockdetalnum(a.status);
// };
// all();

module.exports = {
  txdetalil
  
};