alert(`\'`+str+`\'`);

typeof null; //object

//how to inspect the null type
if(myVariable != null && typeof myVariable == "object"){}
if(!!myVariable && typeof myVariable ==="object"){}

var color1= new String("red");
var color2= "red";
var color3= String('red');
console.log(color1==color2);//true
console.log(color1 instanceof String);//true
console.log(color2 instanceof String);//false
console.log(color2 instanceof Object);//false
console.log(color3 instanceof String);//false
console.log(typeof color1);//object
console.log(typeof color2);//string
console.log(typeof color3);//string
console.log(color2 ===color3);//true

String.prototype.trim = function(){
  return this.replace(/^\s+|\s+$/g, "");
};

//using Global var.
//if this is xhr1.js
var element = document.getElementById('div');
var button = document.getElementById('button');
var xhr = new XMLHttpRequest();
button.onclick = function(){
  xhr.open("GET", "http://unkys.tistory.com/");
  xhr.onreadystatechange = function(){
    if(xhr.readyState ===4 && xhr.status ===200){
      element.innerHTML = xhr.repsonseText;
    }
  };
  xhr.send();
};
//and this is xhr2.js
(function(){
  xhr=new XMLHttpRequest();
  xhr.open("GET", "http://unkys.tistory.com/");
  xhr.onreadystatechange= function(){
    if(xhr.readyState===4 && xhr.status ===200){
      console.log(xhr.responseText);
    }
  }
})();
//it will collapse!!!



//using closure to escape these case
(function(){
  var appendDiv = document.getElementById("appendDiv");
  var callback = {
    "1" : (function(){
      var div=document.createElement('div');
      div.innerHTML = "#1";
      return function(){
        return div.cloneNode(true);
      }
    }),
    "2" : (function(){
      var img = document.getElementById('img');
      img.src="http://cfile.uf.tistoty.com/img/blahblah";
      return function(){
        return img.cloneNode(true);
      }
    }),
    "delete" : function(){
      appendDiv.innerHTML= "";
    }
  };

  function append(e){
    var target = e.target || e.srcElement || event.srcElement;
    var callbackFunction = callback[target.getAttribute("data-cd")];
    appendDiv.appendChild(callbackFunction());
  }

  document.getElementById("wrapper").addEventListener("click", append);
})();



//ID checking code
var xhr = new XMLHttpRequest();
document.getElementById('buttonCheckId').addEventListener("click", function(){
  var id= document.getElementById("inputId").value;
  xhr.open("GET","http://unikys.tistory.com/api/checkId?id="+id);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status ==200){
      if(xhr.responseText ==="1"){
        alert("ID exist!");
      }
    }
  };
});


var i;
for (i=0; i<9; i++){}

for (var i=0; i<0; i++){}
//이 두 케이스는 i의 스코프가 다르다!



var getVariable = 'global';
(function(){
  var getVariable = 'immediate function';
  insideFunc();
  console.log("2.Immediate function : "+getVariable);

  function insideFunc(){
    console.log("1.Inside function: "+getVariable);
    getVariable= 'will ve global?';
  }
})();
console.log('3.global : '+getVariable);


//글로벌변수 활용한 루프문에서의 응용 (eval 함수 피하기)
var i;
for(i=0; i<5; i++){
  window["button"+i]=document.getElementById("button"+i);
  window["button"+i].dosomething = "do something same whitout eval, button "+i;
}

//1
var name = 'zero';
function log() {
  console.log(name);
}

function wrapper() {
  name = 'nero';
  log();
}
wrapper();
//2
var name = 'zero';
function log() {
  console.log(name);
}

function wrapper() {
  var name = 'nero';
  log();
}
wrapper();

//1과 2의 차이, 스코프는 선언될때 만들어진다! 바꾸려면 1번처럼 덮어씌워 줘야함.


function optimizedFunc(flag){
  if(flag){
    var lotsofVar = 1;
    console.log("1"+lessVar);
  }else{
    var lessVar =2;
    console.log("2"+lotsofVar);
  }
}
optimizedFunc(true);
optimizedFunc(false);
//undefined. 선언은 되고 초기화


(function(){
  var subjects=["1st subject","2nd subject", "3rd subject"], el, i, xhr;
  for (i=0; i<subjects.length; i++){
    el=document.getElementById('subject'+i);
    el.innerHTML=el.value=subjects[i];
    el.addEventListener("click", function(){
      alert(this.value + "pressed");
    });
  }

  xhr= new XMLHttpRequest();
  xhr.open("GET", "http://unikeys.tistory.com/list/");
  xhr.onload = function(){
    var contents = JSON.parse(xhr.responseText), el, i;
    for (i=0; i<contents.length; i++){
      el= document.getElementById("content" +i);
      el.innerHTML = contents[i];
    }
  };
})();
//변수를 한번에 몰아서 선언


(function(){
  var formWrite = document.getElementById('formWrite');
  formWrite.onsubmit = validate;

  function validate(){
    var inputName = document.getElementById('name'), inputAge;
    if (inputName.value === ""){
      alert('input name');
      inputName.focus();
      return false;
    }if(inputAge.value ===""){
      alert("input age");
      inputAge.focus();
      return false;
    }
  }
})();
//일반적인 폼 검증 방식


// <div id="divMouseover">Mouse over Highlight</div>
// <div id="divFloatingContent">Floating Content</div>
// <script>
(function(){
  var divMouseover = document.getElementById('divMouseover'),
      divFloatingContent = document.getElementById('divFloatingContent');

  divMouseover.onmouseover = function(){
    var xhr= new XMLHttpRequest();
    divMouseover.style.backgroundColor = "#FF0000";
    divMouseover.style.color = "white";
    divMouseover.style.fontSize = "20px";
    xhr.open("GET","http://myserver.com/floating_content");
    xhr.onload= function(){
      divFloatingContent.innerHTML = xhr.responseText;
      divFloatingContent.style.display = "block";
    };
    xhr.send();
  };

  divMouseover.onmouseout = function(){
    divMouseover.style.backgroundColor = "FFFFFF";
    divMouseover.style.color="black";
    divMouseover.style.fontSize = "10px";
    divFloatingContent.style.display = "none";
  };
})();
//</script>

//local 변수 사용
(function(){
  var divMouseover = document.getElementById('divMouseover'),
      divFloatingContent = document.getElementById('divFloatingContent');

  divMouseover.onmouseover = function(){
    var xhr= new XMLHttpRequest(), localDivMouseover=divMouseover;
    localDivMouseover.style.backgroundColor = "#FF0000";
    localDivMouseover.style.color = "white";
    localDivMouseover.style.fontSize = "20px";
    xhr.open("GET","http://myserver.com/floating_content");
    xhr.onload= function(){
      var localDivFloatingContent = divFloatingContent;
      localDivFloatingContent.innerHTML = xhr.responseText;
      localDivFloatingContent.style.display = "block";
    };
    xhr.send();
  };

  divMouseover.onmouseout = function(){
    var localDivMouseover=divMouseover;
    localDivMouseover.style.backgroundColor = "FFFFFF";
    localDivMouseover.style.color="black";
    localDivMouseover.style.fontSize = "10px";
    divFloatingContent.style.display = "none";
  };
})();
//여기서 변수.style 을 새 로컬변수로 지정하면 체이닝하는 것의 반복을 줄일 수 있다.
