
<script>


export default {
  name: "ExecuteAction",
  // layout: "default-variant",
  data() {
    return {
      domain: null,
      contrcat: null,
      address: null,
      routeCancel: null,
    }
  },
  mounted() {
    let token
    
    if(this.$route.query.token){
    
      const tokenString = window.atob(this.$route.query.token);
      const tokenJSON = JSON.parse(tokenString);
    
      sessionStorage.setItem("token", tokenString);
    
      token = tokenJSON
    } else {
      token = JSON.parse(sessionStorage.getItem("token"));
    } 
    

    if(!token) console.log("error no hay token");
    
    if(token.action === "connect") {
      
      this.$router.push({ path: "/connect-with-near" });
    } else if(token.action === "call") {
      
      this.$router.push({ path: "/approve-transaction" });
    }
    

  }
}
</script>
