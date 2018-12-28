import Web3 from 'web3';
import { contractList } from '../utilities/config';

let Web3Object = null;
let selectedContract = null;
let contract_address = null;
let Contract = null;
let selectedAddress = null;

const getAccount = (Web3Object) => {
    return new Promise( (resolve, reject) => {
        Web3Object.eth.getAccounts( (err, accountsArray) => { 
            if(err){
                return reject(err);
            }else{
                return resolve(accountsArray[0]);
            }
        });
    })
}

try{
    Web3Object =  new Web3(window.web3.currentProvider);


    selectedContract = contractList[(+localStorage.getItem('contract') || 0)];
    contract_address = selectedContract.address;
    Contract = new Web3Object.eth.Contract(selectedContract.abifile.abi, contract_address);

    getAccount(Web3Object).then( address => {
        selectedAddress = address;
    });
    

} catch(e) {
    console.log(e);
    // @TODO: Re route to error page
}


export default {
    GlobalWeb3Object: Web3Object,
    GlobalSmartContractObject: Contract,
    selectedAddress
}