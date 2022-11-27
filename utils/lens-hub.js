import {getSigner}  from './ether-service'
import {MUMBAI_CONTRACT_ADDRESS} from '../assets/constants'
import { ethers, utils } from 'ethers';
import  LENS_ABI from '../abi/LENS_ABI.json'
 
export const lensHub = new ethers.Contract(
    MUMBAI_CONTRACT_ADDRESS,
    LENS_ABI,
     getSigner()
  )