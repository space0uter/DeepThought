"use strict";const render={factsContainer:document.querySelector("#facts-container"),factsOnPage:10,path:"/services/facts",rendering:!1,height:Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight),params:get_parameters()};function initSpecialSort(){const t=document.getElementById("special_sort");null!=t&&(render.path=t.getAttribute("path"))}initCategories("sort-content","type-content"),initSpecialSort();