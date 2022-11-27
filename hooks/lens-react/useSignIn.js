import {useAccount, useSignMessage} from 'wagmi'
import {apolloClient} from '../../graphql/apollo/apoloClient'
import {gql} from '@apollo/client'
import {toast} from 'react-toastify'


// request challeng
const GET_CHALLENGE = `
query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
}
`;
export const generateChallenge = async (address) => {
    const res = await apolloClient.query({
        query: gql(GET_CHALLENGE),
        variables: {
            request: {
                address,
            }
        }
    });
    return res.data.challenge.text;
    }

    // authenticate 
    const AUTHENTICATION = `
mutation($request: SignedAuthChallenge!) {
authenticate(request: $request) {
  accessToken
  refreshToken
}
}
`;

export const lensAuthenticate = async (address, signature) => {
    const { data } = await apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
    });
    return data.authenticate.accessToken;
    };
    
const useSignIn  = () => {
    const {address } = useAccount()
    const {signMessageAsync} = useSignMessage()
     const signIn = async() => {
      
      try {
        if (!address) {
          return alert('Please connect your wallet first');
        }
       
        // generate  challenge 
        const challenge = await generateChallenge(address);
        //  sign  genereted  challenge
        const signature = await signMessageAsync({ message : challenge});
        // Get  access Token 
        const accessToken = await lensAuthenticate(address, signature);
       console.log({accessToken});
        // Store  access token  sessionStorage
        window.sessionStorage.setItem('accessToken', accessToken);
          
      } catch (error) {
        //console.error(error);
        toast(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          
        })
      
      }
     }
     return {signIn}
}
export default useSignIn