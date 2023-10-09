
function addNewAccount({_address, _publicKey, _privateKey}) {
  try {
    const dataUser = {
      address: _address,
      publicKey: _publicKey,
      privateKey: _privateKey,
      apps: null,
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

function addApp({_address, _contract, _domain}) {
  try {
    if(localStorage.getItem("listUser")) {
      const dataApp = {
        contract: _contract,
        domain: _domain,
      };
      console.log("paso 1")
      const list = localStorage.getItem("listUser");
      const users = new Map(JSON.parse(list));
      const dataUser = users.get(_address);
      console.log("paso 2")
      if(!dataUser) throw new Error ("Error addApp: address not found");
      
      const apps = dataUser.apps ? new Map(dataUser.apps) : new Map();
      console.log("paso 3")
      apps.set(_contract, dataApp);
      
      dataUser.apps = apps;
      console.log("paso 4")
      users.set(_address, dataUser)
      console.log(users)
      localStorage.setItem("listUser", JSON.stringify(Array.from(users.entries())));
      console.log("paso 5")
      return true
    }
    throw new Error ("Error addApp: address not found");
    
  } catch (error) {
   throw new Error ("Error addApp: " + error.toString()) 
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

function getAccount(address) {
  try {
    if(localStorage.getItem("listUser")) {
      const list = localStorage.getItem("listUser");
      const users = new Map(JSON.parse(list));
      const dataUser = users.get(address);

      if(!dataUser) throw new Error ("Error getAccount: address not found");

      return dataUser
    }
    throw new Error ("Error getAccount: address not found");
    
  } catch (error) {
   throw new Error ("Error getAccount: " + error.toString()) 
  }
}

export default {
  addNewAccount,
  removeAccount,
  addApp,
  getCurrentAccount,
  getAccounts,
  getAccount
}