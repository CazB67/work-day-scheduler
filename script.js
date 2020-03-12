 
$(document).ready(function(){
  
  var rememberObj = [
    {
      time: "9",
      reminder : " "
    },
    {
      time: "10",
      reminder : " "
    },
    {
      time: "11",
      reminder : " "
    },
    {
      time: "12",
      reminder : " "
    },
    {
      time: "13",
      reminder : " "
    },
    {
      time: "14",
      reminder : " "
    },
    {
      time: "15",
      reminder : " "
    },
    {
      time: "16",
      reminder : " "
    },
    {
      time: "17",
      reminder : " "
    }
  ];

    renderDisplay();
 
  //Updates clock every second
    var updateTime = function() {
    $("#currentDay").text(moment().format('MMMM Do YYYY, hh:mm:ss a'));
    
    }
    setInterval(updateTime, 1000);

    //Update screen every minute
    var updateScreen = function() {
      renderDisplay();
    }
    setInterval(updateScreen, 60000);

function renderDisplay() {
  //Create variable for current hour
  var currentHour = moment().format('H');
  console.log("The current hour is " + currentHour);
  rememberObj = JSON.parse(localStorage.getItem("reminders"));

  $(".container").empty();

  //Loop to add all rows in array
  for (var i=0; i< rememberObj.length; i++) {

    //Row created and added to container
    var rowX = $("<div>");
    rowX.addClass("row");
    $(".container").append(rowX);

    // 1st Column added to row
    var timeBlock = $("<div>");
    timeBlock.addClass("col-md-1 hour");
    $(rowX).append(timeBlock);
    
    var displayHour;
    //So the displayed hours are not in 24 hour time
    if(rememberObj[i].time > 12) {
      displayHour = (rememberObj[i].time - 12) + "pm";
    }else if(parseInt(rememberObj[i].time) === 12){
      displayHour = rememberObj[i].time + "pm"; 
    }else {
      displayHour = rememberObj[i].time + "am";
      }
      
      timeBlock.text(displayHour);

    //2nd column added to row
    var eventDiv = $("<div>");
    eventDiv.addClass("col-md-10");
    $(rowX).append(eventDiv);

    //text area added to second column
    var textArea = $("<textarea>");
    textArea.text(rememberObj[i].reminder);
    $(eventDiv).append(textArea);

    //Third Column for save button added
    var buttonDiv = $("<div>");
    buttonDiv.addClass("col-md-1 saveBtn");
    $(rowX).append(buttonDiv);

    //Creating event listener with some arguments
    $(buttonDiv).on("click", {
      inTimeBlock: displayHour,
      rowNumber: i,
      textAreaEl: textArea,
    }, rowClicked );

  
    //Setting classes for past, present and future events
    if(parseInt(currentHour) === parseInt(rememberObj[i].time)){
      eventDiv.addClass("present");

    }else if(parseInt(currentHour) > parseInt(rememberObj[i].time)){
      eventDiv.addClass("past");
    }else{
      eventDiv.addClass("future");
      
    }
  }
}

function rowClicked(event) {
  var reminderTextInput = $(event.data.textAreaEl);
  console.log(reminderTextInput[0].value);
  rememberObj[event.data.rowNumber].reminder = reminderTextInput[0].value;
  localStorage.setItem("reminders", JSON.stringify(rememberObj));
  
  renderDisplay();
} 

});



