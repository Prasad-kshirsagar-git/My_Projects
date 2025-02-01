function Random() {
  let Number = Math.random() * 100;
  return <h1>Random number is {Math.round(Number)}</h1>
}

export default Random;