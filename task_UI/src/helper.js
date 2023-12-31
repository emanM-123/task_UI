
export const validEmail = (email) => {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };
  
  export const validPhone = (phone) => {
    if (phone.length === 10) {
      let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return reg.test(phone);
    }else{
      return false;
    }
  };

  export const serializeObjectToQuery = (obj) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (typeof obj[p] === 'boolean' || obj[p] === 0 || obj[p]) {
          str.push(encodeURI(p) + '=' + encodeURI(obj[p]));
        }
      }
    }
    if (str.length) {
      return '?' + str.join('&');
    }
    return '';
  };