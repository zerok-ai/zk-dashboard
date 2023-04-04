import CryptoJS from 'crypto-js';

export function useQuery(password: string) {
    let shaArray = CryptoJS.SHA256(password);
    let hexPass = shaArray.toString(CryptoJS.enc.Hex);
    return hexPass
}