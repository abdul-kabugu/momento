import omitDeep from 'omit-deep'
import {utils} from 'ethers'

export const omit = (object, name) => {
    return omitDeep(object, name);
  }

  export const splitSignature = (signature) => {
    return utils.splitSignature(signature);
  };