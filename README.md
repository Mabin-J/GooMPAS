GooMPAS
=======

GooMPAS is Google Maps Pin Animation Scheduler (JavaScript)

Usage
-----
GooMPAS.setPinArr(pinArr);    // Set Pin Array for Animation in sequence

loop{
	GooMPAS.addJob(index in pinArr, jobCode, timeout);
}		// Add Job

JobCode
-------
- GooMPAS.JOBCODE_HIDE					// for Hide Pin
- GooMPAS.JOBCODE_BOUNCE_ANIMATION		// for Bounce Animation
- GooMPAS.JOBCODE_SHOW_ANIMATION		// for Show Animation
- GooMPAS.JOBCODE_HIDE_ANIMATION		// for Hide Animation (Bounce + Hide)

Sample
------
http://raw.github.com/mabin359/GooMPAS/master/Sample/index.htm
