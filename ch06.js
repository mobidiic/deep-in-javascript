var requestId = window.requestAnimationFrame(callback);
window.cancelAnimationFrame(requestId);

//polyfill

(function(){
  var firstTimestamp = Date.now();
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){
    if (callback instanceof Function){
      return setTimeout(function(){
        callback.call(this, Date.Now()-firstTimestamp);
      }, 1000/60);
    }else {
      return setTimeout(callback, 1000/60);
    }
  };
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || function(timeID){
    clearTimeout(timeID);
  };
})();


//<input type="button" id="buttonStart" value="start" />
//<script>
  (function(){
    var lastTime, i=0;
    document.getElementById("buttonStart").onclick= function(){
      lastTime = Date.now();
      repeatedTimeout();
    };
    function repeatedTimeout(){
      var currentTime = Date.now();
      console.log("Nesting level["+ (++i) + "] : " +(currentTime - lastTime) + "ms");
      if( i<10 ){
        setTimeout(repeatedTimeout);
      }
      lastTime=Date.now();
    }
  })();
//</script>


//변수 생성 후 캐시로 보관
//<div id="container"> </div>
//<script>
  (function(){
    var itemList = ["javascript", "java", "c"],
    divItem,
    divItemList=[],
    divContainer=document.getElementById("container"),
    i,
    len=itemList.length;

    for( i=0; i<len; i++){
      divItem = document.createElement('div');
      divItem.appendChild(document.createTextNode(itemList[i]));
      divItem.addEventListener("click", (function(name){
        return function(){
          var divClickedItem = divItemList[name],
          datasetClickedItem = divClickedItem.dataset,
          styleClickedItem = divClickedItem.style;

          if (datasetClickedItem.selected === "true"){
            styleClickedItem.backgroundColor = "#FFFFFF";
            styleClickedItem.color = "#000000";
            datasetClickedItem.selected = "false";
          }else{
            styleClickedItem.backgroundColor = "#000000";
            styleClickedItem.color = "#FFFFFF";
            datasetClickedItem.selected = "true";
          }
        };
      }(itemList[i])));
      divItemList[itemList[i]] =divItem;
      divContainer.appendChild(divItem);
    }
  })();
//</script>
