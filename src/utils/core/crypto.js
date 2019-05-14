import { createHash } from 'crypto-browserify';

export const md5 = (data) => {
    const hash = createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}
window._md5 = md5;