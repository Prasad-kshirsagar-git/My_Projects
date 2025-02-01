function Hello() {

  let myName = "Prasad";

  //function fullName(){}

  let fullName = () => {
    return "Prasad kshirsagar";
  }

  return <h3>
    myName : {myName} <br></br>
    fullName : {fullName}  
  </h3>
}

export default Hello;