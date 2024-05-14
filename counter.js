const countElement = document.getElementById("count");
const [decrement, increment, reset] = document.getElementsByTagName("button");

let count = 0;

decrement.addEventListener("click", (event) => {
  if (count <= 0) return;
  if (event.shiftKey) {
    count -= count < 10 ? count : 10
  } else {
    count -= 1
  }

  countElement.innerText = count;
});

increment.addEventListener("click", (event) => {
  console.log(event);

  // if(event.shiftKey) {
  //     count += 10
  // } else {
  //     count++
  // }

  count += event.shiftKey ? 10 : 1;

  countElement.innerText = count;
});

reset.addEventListener("click", () => {
  count = 0;
  countElement.innerText = count;
});
