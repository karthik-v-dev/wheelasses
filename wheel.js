(function () {
  document.querySelector(".prev-button").disabled = true;

  const elements = (tagName, attObj) => {
    var element = document.createElement(tagName);
    for (att in attObj) {
      switch (att) {
          case "class":
          {
            element.setAttribute("class", attObj[att]);
          }
          break;
          case "id":
          {
            element.setAttribute("id", attObj[att]);
          }
          break;
          case "src":
          {
            element.setAttribute("src", attObj[att]);
          }
          break;
          case "InnerText":
          {
            element.textContent = attObj[att];
          }
          default:{
            if (attObj[att] != undefined) {
              if (tagName == 'img'){
                element.setAttribute('alt', attObj[att]);
               }
          }
      }
    }
  }
    return element;
  };
  var Data = data_obj;
  var parent = document.querySelector(".slider");
  var Un_order = elements('ul',{id:"list"});
  parent.insertBefore(Un_order, parent.lastChild);
  var length_of_obj = Object.keys(Data).length;
  console.log(length_of_obj);
  for (let i = 0; i < length_of_obj; i++) {
    let currentwheel = Object.keys(Data)[i].toString();
    let get_current_wheel_URL = Data[currentwheel].url;
    let get_current_wheel_Title = Data[currentwheel].title;
    let get_current_wheel_Descrip = Data[currentwheel].description;
    let get_current_wheel_Type = Data[currentwheel].type;
    let list_item = elements('li',  { id: i+1});
    console.log(list_item);
    let division_1 = elements('div', { class: "slide-imgbox" });
    let wheelimg = elements('img',{src:get_current_wheel_URL,alt:currentwheel})
    let division_1_child = elements('div',{class:"set-ani"});
    let head_5 = elements('h5',{InnerText:get_current_wheel_Title})
    let page = elements('p',{InnerText:get_current_wheel_Descrip})
    let head_4 = elements('h4',{InnerText:get_current_wheel_Type})

    division_1_child.insertBefore(page, division_1_child.nextSibling);
    division_1_child.insertBefore(head_4, division_1_child.nextSibling);
    division_1_child.insertBefore(head_5, division_1_child.firstChild);
    division_1.insertBefore(division_1_child, division_1.nextSibling);
    //  division_1_child.insertAdjacentElement('afterend', wheelimg);
    division_1.insertBefore(wheelimg, division_1.firstChild);
    list_item.insertBefore(division_1, list_item.firstChild);
    Un_order.insertBefore(list_item, Un_order.lastChild);
    console.log(list_item);
  }

})();

document.addEventListener('DOMContentLoaded',function(){
const slides = document.querySelector("ul");
console.log(slides);
const val = window.innerWidth<=652? 1 :window.innerWidth <=992? 2 :3;
if(val==1){
  document.querySelector(".text-seconday").style.maxWidth="100%";
}else{
  document.querySelector(".text-seconday").style.maxWidth="50%";
}
const divice_Mleft = val ===1 ? -50 : 0;
slides.children[0].style.marginLeft = divice_Mleft + "px";
const slidesCount = slides.childElementCount;
const maxLeft = (slidesCount - val) * 407.5 * -1 + divice_Mleft;
console.log(maxLeft);
let current = 0;

function changeSlide(next = true) {
  if (next) {
    current += current > maxLeft ? -407.5 : current * -1;
    console.log(slides.children[0].style.marginLeft);
    console.log(current);
  } else {
    current = current < 0 ? current + 407.5 : maxLeft;
    console.log(slides.children[0].style.marginLeft);
    console.log(current);
  }
  slides.children[0].style.marginLeft = current + "px";
}

function next() {
  let max = maxLeft.toString() + "px";
  console.log(max);
  if (slides.children[0].style.marginLeft === max) {
    document.querySelector(".next-button").disabled = true;
  } else {
    document.querySelector(".prev-button").disabled = false;
    changeSlide();
  }
}

document.querySelector(".next-button").addEventListener("click", function () {
  if (slides.children[0].style.marginLeft != maxLeft){
    next();
  }else{
    document.querySelector(".next-button").disabled = true;
  }
});

function prev() {
  if (slides.children[0].style.marginLeft === "0px") {
    document.querySelector(".prev-button").disabled = true;
  } else {
    document.querySelector(".next-button").disabled = false;
    changeSlide(false);
  }
}

document.querySelector(".prev-button").addEventListener("click", function () {
  if (slides.children[0].style.marginLeft != '0px'){
  prev();
  }else{
    document.querySelector(".prev-button").disabled = true;
  }
});

$(document).keydown(function (e) {
  switch (e.which) {
    case 37:
      prev();
      break;
    case 39:
      next();
      break;
    default:
      return;
  }
  e.preventDefault();
});
// document.addEventListener('keydown',function(e){
//   switch (e) {
//         case 37:
//                 prev();
//                 break;
//         case 39:
//                 next();
//                 break;
//         default:
//                 return;
//       }
//       e.preventDefault();
// });
});
document.getElementById("list").addEventListener("click", function (e) {
  console.log(e);
  console.log(e.path[2]);
  let divi_child=document.querySelector('.set-ani');
   let cl_List =e.path[1].classList;
   let cl_list = divi_child.classList;
   let cl_List_len=e.path[1].classList.length
   let cl_list_len=Object.keys(cl_list).length;
   for(let i=0;i<cl_List_len;i++ ){
       if(Object.values(cl_List)[i] === 'slide-imgbox_onclick'){
        e.path[2].childNodes[0].classList.remove(Object.values(cl_List)[i]);
       }else{
        e.path[2].childNodes[0].classList.add('slide-imgbox_onclick');
       }
    }
    for(let i=0;i<cl_list_len;i++ ){
     if(Object.values(cl_list)[i] === 'set_ani_click'){
      e.path[2].childNodes[0].childNodes[1].classList.remove(Object.values(cl_list)[i]);
     }else{
      e.path[2].childNodes[0].childNodes[1].classList.add('set_ani_click');
     }
  }
});