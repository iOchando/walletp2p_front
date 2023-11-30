export default function (data) {
  // If the user is not authenticated
  console.log(data.route)
  if (!localStorage.getItem('auth')) {
    console.log("paso 1")
    if(!data.route.path === "/login" || !data.route.path === "/login/" || !data.route.path === "/passphrase-login" || !data.route.path === "/passphrase-login/") {
      console.log("paso 2")
      return data.redirect('/login')
    }
    console.log("paso 3")
  }
  console.log("paso 4")
  if(data.route.fullPath === "/login" || data.route.fullPath === "/login/" || data.route.fullPath === "/passphrase-login" || data.route.fullPath === "/passphrase-login/") {
    console.log("paso 5")
    return data.redirect('/')
  }
}
