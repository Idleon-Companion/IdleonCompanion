//Global Vars
var tasksData = JSON.parse(localStorage.getItem('tasksData')) || {};
var checklistData = JSON.parse(localStorage.getItem('checklistData')) || {};
var resetHours = localStorage.getItem('resetHours') || 0;
var resetMinutes = localStorage.getItem("resetMinutes") || 0;
var boopTimer = new Date(localStorage.getItem("boopTimer")) || 0;
var nextResetDate = new Date(localStorage.getItem("nextResetDate")) || 0;
var resetTimer = 0;
var clockId = 0;

var $checkboxes = $(".checkbox-container :checkbox");
var $button = $("#btnCheck");


//Tasks Functions
function allChecked() {
  return $checkboxes.length === $checkboxes.filter(":checked").length;
}

function updateButtonText() {
  $button.text(allChecked() ? "Uncheck all" : "Check all");
}

function toggleCheckboxes() {
  $checkboxes.prop("checked", allChecked() ? false : true);
}

function resetDailies(){
  $("#dailyGroup :checkbox").prop("checked", false);
  updateStorage();
  updateForm();
}

//Element Updating Functions
function updateStorage() {
  $checkboxes.each(function() {
    tasksData[this.id] = this.checked;
  });
  tasksData.buttonText = $button.text();
  if(boopTimer != 0){
    localStorage.setItem('boopTimer', boopTimer);
  }
  localStorage.setItem("tasksData", JSON.stringify(tasksData));
  localStorage.setItem("nextResetDate", nextResetDate);
  localStorage.setItem("resetHours", resetHours);
  localStorage.setItem("resetMinutes", resetMinutes);
}

function updateChecklistStorage(){
  $("#checklist :checkbox").each(function() {
    checklistData[this.id] = this.checked;
  });
  localStorage.setItem("checklistData", JSON.stringify(checklistData));
}

function updateContainer(box) {
  value = $(box).prop("checked");
  container = $(box).parents("label");
  value ? container.removeClass("active") : container.addClass("active");
}

function updateProgress() {
  completed = $checkboxes.filter(":checked").length;
  percent = Math.round((completed / $checkboxes.length) * 100);
  $("#progress").prop("style", "width:" + percent + "%");
}

function updateForm() {
  $.each(tasksData, function(key, value) {
    box = $("#" + key);
    box.prop('checked', value);
    updateContainer(box);
    updateProgress();
  });
  updateBoopBadge();
}

function updateBoopBadge(){
  if(boopTimer.getTime() == 0){
    return;
  }
  $("#boopsBadge").text(boopTimer.toLocaleString());
}

function updateChecklist() {
  $.each(checklistData, function(key, value) {
    box = $("#" + key);
    box.prop('checked', value);
  });
}

//King of Food Update Function
function updateTable() {
  base = $(".base");
  total = $(".total");
  mult = $("#foodRange").prop("value");

  for (i = 0; i < base.length; i++) {
    total[i].textContent = base[i].textContent * mult;
  }
}

//King of Food Data Range
$("#foodRange").on("mousemove", function() {
  $("#foodPill").text($(this).prop("value"));
});

$("#foodRange").on("mouseup", function() {
  clearTimeout();
  setTimeout(updateTable, 500);
});

$("#collapse1").on("click", function() {
  children = $("tr.collapsible1");
  children.is(":visible") ? children.hide() : children.show();
});

$("#collapse2").on("click", function() {
  children = $("tr.collapsible2");
  children.is(":visible") ? children.hide() : children.show();
});

//Builds
function fillGrid(array, data) {
  for (i = 0; i < array.length; i++) {
    $(array[i]).text(data[i+1]);
    if (data[i+1] == 0) {
      $(array[i]).parent().addClass("disabled");
    }
  }
}

function fillData(data) {
  var skill_array = $("#skill_tab_one .skill");
  if (skill_array.length) {
    fillGrid(skill_array, data.tab_one);
  }

  skill_array = $("#skill_tab_two .skill");
  if (skill_array.length) {
    fillGrid(skill_array, data.tab_two);
  }

  skill_array = $("#skill_tab_three .skill");
  if (skill_array.length) {
    fillGrid(skill_array, data.tab_three);
  }

  $("#notes_one").text(data.comment_one);
  $("#notes_two").text(data.comment_two);
  $("#notes_three").text(data.comment_three);
  $("#notes").text(data.notes);
}

function loadBuildTemplate(data) {
  $("#buildContent").load("templates/" + data.template + ".html", function(){
    fillData(data);
  });
}

function loadBuild(buildName) {
  $.getJSON("builds/" + buildName, function(json) {
    loadBuildTemplate(json);
  });
}

//Time Functions
//Converting Utilities
function toMs(h, m){
  return (h*3600 + m*60)*1000;
}

function toHM(ms){
  ms = (ms/1000);
  m = (ms%3600);
  h = ms - m;
  return [h/3600, Math.ceil(m/60)];
}


function saveOffset(){
  hours = $("#hours").val();
  minutes = $("#minutes").val();
  //converting both dates to ms
  ms = toMs(hours, minutes);
  time = new Date();
  offset = time.getTime() + ms;
  //finding the reset time of day
  time.setTime(offset);
  resetHours = time.getHours();
  resetMinutes = time.getMinutes();

  updateStorage();
  updateResetDate();
  stopClock();
  startClock();
}

function calcTimer(){
  resetMs = toMs(resetHours, resetMinutes);
  tempDate = new Date();
  nowMs = toMs(tempDate.getHours(), tempDate.getMinutes());
  if(nowMs > resetMs){
    resetMs += toMs(24,0);
  }

  resetTimer = resetMs - nowMs;

}

function updateClock(){
  a = toHM(resetTimer);
  if(a[1] < 0){
    stopClock();
    startClock();
    return;
  }
  $("#clock").text(a[0]+"H "+a[1]+"m");
}

function startClock(){
  if(resetHours == 0 && resetMinutes == 0){
    $("#clock").text("Click me");
    return;
  }

  if (isNewDay()){
    updateResetDate();
    taskNewDay();
  }

  calcTimer();
  updateClock();
  clockId = setInterval(function(){
    resetTimer -= 30000;
    updateClock();
  }, 30000);
}

function stopClock(){
  clearInterval(clockId);
}

function taskNewDay(){
  $('#resetModal').modal();
}

function isNewDay(){
  now = new Date();
  //if nextResetDate is initialized and we have surpassed it
  if(now > nextResetDate && (now - nextResetDate) > 60){
    return true;
  } else {
    return false;
  }
}

function updateResetDate(){
  nextResetDate = new Date();
  nextResetDate.setHours(resetHours);
  nextResetDate.setMinutes(resetMinutes);

  //if the reset Time is in the past, move a day forward in the date
  temp = new Date();
  console.log(temp);
  if((temp.getHours() > resetHours) || (temp.getHours() == resetHours && temp.getMinutes() > resetMinutes)){
    nextResetDate.setDate(nextResetDate.getDate()+1);
  }
  updateStorage();
}
//Event Listeners
//Task Button
$button.on("click", function() {
  toggleCheckboxes();
  updateButtonText();
  updateStorage();
  updateForm();
});

$checkboxes.on("change", function() {
  updateButtonText();
  updateContainer(this);
  updateProgress();
  updateStorage();
});

$("#checklist :checkbox").on("change", function(){
  updateChecklistStorage();
});

$("#buildSelector").on("change", function(){
  loadBuild($(":selected").attr("name"));
});

$("#daily8").on("change", function(){
  if ($("#daily8").is(":checked")){
    boopTimer = new Date();
    updateBoopBadge();
    updateStorage();
  }
});

//autohides tooltips
$(document).on('shown.bs.tooltip', function (e) {
   setTimeout(function () {
     $(e.target).tooltip('hide');
   }, 3000);
});

// On page load
$button.text(tasksData.buttonText);
updateForm();
updateChecklist();
$('[data-toggle="tooltip"]').tooltip();
$("#buildSelector").load("assets/php/dropdown.php?124", function(){
});


$(".collapsible1").hide();
$(".collapsible2").hide();
$("#buildSelector").prop("value", 0);

startClock();
