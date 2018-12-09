"use strict";const result={colorPickerInstance:void 0,nameInput:document.getElementById("nameInput"),describeInput:document.getElementById("describeInput"),tagPreview:document.querySelector(".tag-preview"),counter:document.querySelector(".content .right .counter span"),createBtn:document.querySelector(".create"),rgb:{r:151,g:151,b:151},creating:!1,edit:!1};function initColorPicker(){const e=new iro.ColorPicker(".color-container",{width:200,height:200,color:result.rgb});result.colorPickerInstance=e,e.on("color:change",function(){let e=result.colorPickerInstance.color.rgb;result.tagPreview.style.background="rgb("+e.r+","+e.g+","+e.b+")"})}function initInputs(){result.nameInput.addEventListener("input",function(){const e=result.nameInput.value;e.length>32&&(result.nameInput.value=e.substring(0,32)),result.tagPreview.innerText=e}),result.describeInput.addEventListener("input",function(){const e=result.describeInput.value;e.length>1e3&&(result.describeInput.value=e.substring(0,1e3)),result.counter.innerText=1e3-e.length})}function create(){result.createBtn.addEventListener("click",function(){if(result.creating)return;const e=result.colorPickerInstance.color.rgb,t=rgbToHex(e.r,e.g,e.b),n=result.nameInput.value,r=result.describeInput.value;n.length<3||n.length>32?modal.error("Длина имени должна быть не меньше 3 и не превышать 32 символа"):n.match(/^[A-z|А-я|\s|-]+$/)?r.match(/^[А-я|Ё|ё|\w|\s|.|,|;|-|\d]+$/)?r.length<100||r.length>1e3?modal.error("Длина описания должна быть не меньше 50 и не превышать 1000 символов"):(result.creating=!0,result.edit?(modal.load("Идёт обновление тега..."),xhr.request({path:"/services/tags",method:"PUT",headers:{"Content-Type":"application/json"},content:JSON.stringify({tagId:result.tagId,name:n,description:r,color:t})},function(e,t){if(e){const e=window.location.href;window.location.href=e.substring(0,e.lastIndexOf("edit"))}else t&&modal.error("Не удалось обновить тег");result.creating=!1})):(modal.load("Идёт создание тега"),xhr.request({path:"/services/tags",method:"POST",headers:{"Content-Type":"application/json"},content:JSON.stringify({name:n,description:r,color:t})},function(e,t){if(e){const t=JSON.parse(e),n=window.location.href;void 0!==t&&(window.location.href=n.substring(0,n.lastIndexOf("add"))+t.id)}else t&&modal.error("Не удалось создать тег");result.creating=!1}))):modal.error("Неверный формат описания"):modal.error("Неправильный формат имени")})}function initIfEdit(){if(null===document.getElementById("_edit"))return;result.edit=!0;const e=document.getElementById("color_edit"),t=hexToRgb(e.getAttribute("content")),n=document.getElementById("name_edit"),r=document.getElementById("describe_edit");result.tagId=document.getElementById("tag_id").getAttribute("content"),result.rgb=t,result.tagPreview.innerText=n.getAttribute("content"),result.nameInput.value=n.getAttribute("content"),result.describeInput.value=r.getAttribute("content"),e.parentNode.removeChild(e),n.parentNode.removeChild(n),r.parentNode.removeChild(r)}function hexToRgb(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function rgbToHex(e,t,n){return"#"+dec2hex(e)+dec2hex(t)+dec2hex(n)}function dec2hex(e){return e>15?e.toString(16):"0"+e.toString(16)}initIfEdit(),initColorPicker(),initInputs(),create();