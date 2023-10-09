
function addNewAccount({_address, _publicKey, _privateKey}) {
  try {
    const dataUser = {
      address: _address,
      publicKey: _publicKey,
      privateKey: _privateKey
    };

    let user = new Map();
    if(localStorage.getItem("listUser") !== undefined && localStorage.getItem("listUser") !== null) {
    const list = localStorage.getItem("listUser")
    user = new Map(JSON.parse(list))
    }
    user.set(_address, dataUser)

    const userMapStr = JSON.stringify(Array.from(user.entries()));

    localStorage.setItem("listUser", userMapStr);

    localStorage.setItem("address", _address);
    localStorage.setItem("publicKey", _publicKey);
    localStorage.setItem("privateKey", _privateKey);

    return true
  } catch (error) {
   throw new Error ("Error addNewAccount: " + error.toString()) 
  }
}


function removeAccount(address) {
  try {
    
    if(localStorage.getItem("listUser") !== undefined && localStorage.getItem("listUser") !== null) {
      let user = new Map();
      const list = localStorage.getItem("listUser")
      user = new Map(JSON.parse(list))
      
      user.delete(address);

      const userMapStr = JSON.stringify(Array.from(user.entries()));

      localStorage.setItem("listUser", userMapStr);

      return true
    }
    throw new Error ("Error removeAccount: listUser not found");
  } catch (error) {
   throw new Error ("Error removeAccount: " + error.toString()) 
  }
}


function getCurrentAccount() {
  try {
    const _address = localStorage.getItem("address");
    const _publicKey = localStorage.getItem("publicKey");
    const _privateKey = localStorage.getItem("privateKey");

    return {
      address: _address,
      publicKey: _publicKey,
      privateKey: _privateKey
    }

  } catch (error) {
   throw new Error ("Error getCurrentAddress: " + error.toString()) 
  }
}


function getAccounts() {
  try {
    const accounts = localStorage.getItem("listUser");
    
    return JSON.parse(accounts);
  } catch (error) {
   throw new Error ("Error getAccounts: " + error.toString()) 
  }
}


export default {
  addNewAccount,
  removeAccount,
  getCurrentAccount,
  getAccounts
}