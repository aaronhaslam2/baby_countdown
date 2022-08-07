var timer = document.getElementById('timer');
var years = document.getElementById('year');
var months = document.getElementById('month');
var days = document.getElementById('day');
var hours =  document.getElementById('hour');
var minutes =  document.getElementById('minute');
var seconds =  document.getElementById('second');

let babyBirthDay = new Date("June 22, 2022 00:00:00");

function serverClock(){
	let x = setInterval(function(){
		update();
	},50);
}

function update(){
	var currentTime = new Date();
	var time = GetDate(babyBirthDay, currentTime);
	// console.log(time);
	years.innerHTML = time.Years;
	months.innerHTML = time.Months;
	days.innerHTML = time.Days;
	hours.innerHTML = time.Hours;
	minutes.innerHTML = time.Minutes;
	seconds.innerHTML = time.Seconds;
}

function GetDate(date1, date2){
	var TotalDaysInSpecificMonth = [31,31,28,31,30,31,30,31,31,30,31,30,31];
	var startDate = date1;
	var endDate = date2;

	if(date1 > date2){
		startDate = date2;
		endDate = date1;
	}

	var endDateYear = endDate.getFullYear();
	var endDateMonth = (endDate.getMonth() + 1);
	var endDateDay = endDate.getDate();
	var endDateHour = endDate.getHours();
	var endDateMinute = endDate.getMinutes();
	var endDateSecond = endDate.getSeconds();

	var seconds = endDateSecond - startDate.getSeconds();
	if(seconds < 0){
		endDateMinute--;
		endDateSecond += 60;
		seconds = endDateSecond - startDate.getSeconds();
	}

	var minutes = endDateMinute - startDate.getMinutes();
    if (minutes < 0)
	{
		endDateHour--;
		endDateMinute += 60;
		minutes = endDateMinute - startDate.getMinutes();
	}

	var hours = endDateHour - startDate.getHours();
	if (hours < 0)
	{
		endDateDay--;
		endDateHour += 24;
		hours = endDateHour - startDate.getHours();
	}

	var days = endDateDay - startDate.getDate();
	if (days < 0)
	{
		endDateMonth--;
		if (IsLeapYear(endDate.getFullYear()) && endDateMonth == 2)
		{
			endDateDay += (TotalDaysInSpecificMonth[endDateMonth] + 1);
		}
		else
		{
			if (endDateMonth <= 0)
				endDateDay += TotalDaysInSpecificMonth[(endDateMonth + 12)];
			else
				endDateDay += TotalDaysInSpecificMonth[endDateMonth];
		}

		days = endDateDay - startDate.getDate();
	}

	var months = endDateMonth - (startDate.getMonth() + 1);
	if (months < 0)
	{
		endDateYear--;
		endDateMonth += 12;
		months = endDateMonth - (startDate.getMonth() + 1);
	}

	var years = endDateYear - startDate.getFullYear();

	return {
		Years:years,
		Months:months,
		Days:days,
		Hours:hours,
		Minutes:minutes,
		Seconds:seconds
	}
}

function IsLeapYear(year){
	if(year % 100 === 0){
		return year % 400 === 0;
	}
	return year % 4 === 0;
}

serverClock();