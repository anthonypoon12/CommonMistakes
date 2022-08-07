var timer;
$(document).ready(function () {

    var second = 0;
  
    function convert(val) {
      return val > 9 ? val : "0" + val;
    }
    timer = setInterval(function () {
      $("#seconds").text(convert(++second % 60));
      $("#minutes").text(convert(parseInt(second / 60, 10)));
    }, 1000);
  
  })
  function clearTimer() {
    clearInterval(timer);
  }