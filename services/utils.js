
function routeLogin(action) {
  if(action){
    return "/"+action
  } else {
    return "/" 
  }
}

function routeAction(_action, route) {
  if(_action){
    return { path: route, query: {action: _action} }
  } else {
    return { path: route }
  }
}

function shortenAddress(address) {
  const addresFinal = address === undefined ? "" : address.length > 20 ? address.substring(0,6)+"..."+address.substring((address.length - process.env.Network.length - 7), address.length) : address;
  return addresFinal
}

export default {
  routeLogin,
  routeAction,
  shortenAddress
}