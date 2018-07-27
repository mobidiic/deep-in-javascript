//<script>
(function(){
  var previousOnload;
  if(window.addEventListener){
    window.addEventListener("load", lazyload);
  }else if(window.attachEvent){
    window.attachEvent("onload", lazyload);
  }else if(window.onload){
    previousOnload = window.onload;
    window.onload = function(){
      previousOnload.call();
      lazyload();
    };
  }else{
    window.onload = lazyload;
  }
  function lazyload(){
    var scriptTag = document.createElement("script"),
    headTag = document.getElementsByTagName("head")[0];
    scriptTag.setAttribute("src", "./sleep.js");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("async", true);

    if (!headTag){
      headTag = document.getElementsByTagName("script")[0].parentNode;
    }
    headTag.appendChild(scriptTag);
  }
})();
//</script>


//<img width="640" height="480" class="lazyload" data-src="~~.img" />
//<script>
(function(){
  var previousOnload;
  if(window.addEventListener){
    window.addEventListener("load", lazyloadImg);
  }else if(window.attachEvent){
    window.attachEvent("onload", lazyloadImg);
  }else if(window.onload){
    previousOnload = window.onload;
    window.onload= function(){
      previousOnload.call();
      lazyloadImg();
    };
  }
  function lazyloadImg(){
    var imgList = document.getElementsByClassName("lazyload"),
    length = imgList.length, i;
    for (i=0; i<length; i++){
      imgList[i].src = imgList[i].getAttribute("data-src");
    }
  }
})();
//</script>


//백그라운드에서 이미지 불러오기(로딩중 이미지로 대체해서 보여주다가 로딩후 교체)
// <style>
// .lazyload{
//   background-image : url("./loading.gif");
//   background-size : 64px 64px;
//   background-repeat : no-repeat;
//   background-position : center;
// }
// </style>
//<img width="640" height="480" class="lazyload" data-src="~~.img" />
//<script>
(function(){
  var previousOnload;
  if(window.addEventListener){
    window.addEventListener("load", lazyloadImg);
  }else if(window.attachEvent){
    window.attachEvent("onload", lazyloadImg);
  }else if(window.onload){
    previousOnload = window.onload;
    window.onload= function(){
      previousOnload.call();
      lazyloadImg();
    };
  }
  function lazyloadImgs(){
    var imgList = document.getElementsByClassName("lazyload"),
    length = imgList.length, i;
    for (i=0; i<length; i++){
      (function(imgTag){
        var imgBackground= document.createElement('img');
        imgBackground.setAttribute("src", imgTag.getAttribute("data-src"));
        imgBackground.setAttribute("width", imgTag.getAttribute("width"));
        imgBackground.setAttribute("height", imgTag.getAttribute("height"));
        imgBackground.onload = function(){
          imagTag.parentNode.replaceChild(imgBackground, imgTag);
        };
      })(imgList[i]);
    }
  }
})();
