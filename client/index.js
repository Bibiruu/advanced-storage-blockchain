import Web3 from 'web3';
//import abi and contract address
import AdvancedStorage from '../build/contracts/AdvancedStorage.json';

let web3;
let advancedStorage;

//creating instance
const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        //case 1: new metamask present
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.enable()
                .then(() => {
                    resolve(
                        new Web3(window.ethereum));
                })
                .catch(e => {
                    reject(e);
                });
            return;
        };
        //case 2: old metamask is present
        if (typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
                );
        }
        //case 3: no metamask present, just connect to ganache
        resolve(new Web3('http://localhost:9545'));
    });
};

initWeb3();
//initialize advanced contract variable contract instance
const initContract = () => {
    const deploymentKey = Object.keys(
        AdvancedStorage.networks)[0]; //network '5777'
        console.log(AdvancedStorage.abi)
    return new web3.eth.Contract(
        AdvancedStorage.abi,
        AdvancedStorage.networks[deploymentKey]
            .address);
};

initContract();

//initialize the contract
const initApp = () => {
    const $addData = document.getElementById('addData');
    const $data = document.getElementById('data');
    let accounts = []

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
            return advancedStorage.methods
                .getAll()
                .call()
        })
        .then(result => {
            //separating each entry by ,
            $data.innerHTML = result.join(', ')
        })
    $addData.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = e.target.elements[0].value;
        advancedStorage.methods
            .add(data)
            .send({ from: accounts[0] })
            .then(result => {
                return advancedStorage.methods
                    .getAll()
                    .call();
            })
            .then(result => {
                //separating each entry by ,
                $data.innerHTML = result.join(', ')
            });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    //create instance
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            //create instance for advanced storage
            advancedStorage = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
});

