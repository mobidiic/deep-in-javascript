//class

class Person{
  constructor(name, blog){
    this.name = name;
    this.blog = blog;
  }
}


//this 의 범위
function whatsThis(){
  return this.toString();
}
var unikys = {
  what: whatsThis,
  toString : function(){
    return "[object unikys]";
  }
};


Person.prototype.getName = function(){
  return this.name;
};
Person.prototype.getBlog = function(){
  return this.blog;
};

var unikys = new Person("uniky", "uniky.com"), prop;
for (prop in unikys){
  console.log("unikys["+prop+"] = "+unikys[prop]);
}


console.log(whatsThis());
console.log(whatsThis.call());
console.log(whatsThis.apply(unikys));
console.log(unikys.what.call(undefined));
console.log(unikys.what.call(unikys));

function Car(){
  this.wheel = 4;
  this.beep = "Boo";
}

Car.prototype.go = function(){
  alert(this.beep);
};

function Truck(){
  this.beep = "honk";
}
Truck.prototype = new Car();

var truck = new Truck();
var car = new Car();
console.log(truck.go.call(car));


//Object.create function

Object.create = function(o){
  function F(){}
  F.prototype = o;
  return new F();
};



Object.defineProperties(unikys, {
  firstName: {
    value: "sun",
    writable: true
  },
  lastName: {
    value : 'yang',
    writable : true
  },
  fullName : {
    get: function(){
      return this.firstName+" "+this.lastName;
    },
    set: function(value){
      var res= value.split(" ");
      if (res.length>1){
        this.firstName = res[0];
        this.lastName = res[1];
      }else{
        alert("wrong format");
      }
    }
  }
});

console.log(unikys.fullName);
unikys.fullName = "park sihh";
console.log(unikys.firstName);
console.log(unikys.lastName);



function Person(){
  this.name = "anonymous";
}
function Unikys(){
  this.name = "Unikys";
}
Unikys.prototype = Object.create(Pearson.prototype, {
  constructor : {
    value: Unikys
  }
});//생성자 constructor 재초기화를 create()메소드 안에서 할수있다!


//class - extends 상속
class Person{
  constructor(){
    this.name = "anpnympus";
  }
}
class Unikys extends Person{
  constructor(){
    super();
    this.name= "unikus";
  }
}


//Object.create function's polyfill

(function(){
  if(!Object.create){
    Object.create= (function(){
      function F(){}
      return function(o){
        F.prototype = o;
        return new F();
      };
    })();
  }
})();

//2
// if(typeof Object.create != 'function'){
//   Object.create = (function(undefined){
//     var Temp= function(){};
//     return function(prototype, propertiesObj){
//       if(prototype != Object(prototype) && prototype !=null){
//         throw TypeError('Argument must be an object, or null');
//       }
//       Temp.prototype = prototype ||{};
//       if(protpertiesObj != undefined){
//         Object.defineProperties(Temp.prototype, propertiesObj);
//       }
//       var result = new Temp();
//       Temp.prototype = null;
//       if(prototype ===null){
//         result.__proto__ =null;
//       }
//       return result;
//     };
//   })();
// }
