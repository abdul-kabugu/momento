import omitDeep from 'omit-deep';
import { ethers, utils } from 'ethers';

 

export const ethersProvider = () => { if(typeof window !== "undefined"){
  if (typeof window !== "undefined") {
   const provider =  new ethers.providers.Web3Provider(window.ethereum)
   return provider
  }
 
 
}}

 export const getEthreumWindow = () => {
  if (typeof window !== "undefined") {
   const ethereumWindow =  new ethers.providers.Web3Provider(window.ethereum)
   return ethereumWindow
  
  }
 
 }
// new ethers.providers.Web3Provider(window.ethereum);
  console.log("rthereum windiw", getEthreumWindow())

//const ethereumWindow =
//ethersProvider = ethereumWindow

  export const signText = (text) => {
   // console.log("sign me ")
   return ethersProvider()?.getSigner().signMessage(text);
 }

 export const getSigner = () => {
    return ethersProvider()?.getSigner();
    console.log("ether provider", ethersProvider)
}

export const signedTypeData = (domain, types, value) => {
    const signer = getSigner();
    // remove the __typedname from the signature!
      console.log("the sgner ", signer)
    return signer._signTypedData(
      omitDeep(domain, '__typename'),
      omitDeep(types, '__typename'),
      omitDeep(value, '__typename')
    );
  }

  export const splitSignature = (signature) => {
    return utils.splitSignature(signature)
}

export const sendTx = (transaction) => {
    const signer = ethersProvider.getSigner();
    return signer.sendTransaction(transaction);
  }