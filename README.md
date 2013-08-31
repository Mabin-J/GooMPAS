GooMPAS
=======

GooMPAS is Google Maps Pin Animation Scheduler (JavaScript)

Usage
-----
```javascript
GooMPAS.setPinArr(pinArr);    // Set Pin Array for Animation in sequence


loop{  
	GooMPAS.addJob(index in pinArr, jobCode, timeout);  
}		// Add Job
```

JobCode
-------
```javascript
- GooMPAS.JOBCODE_HIDE					// for Hide Pin
- GooMPAS.JOBCODE_BOUNCE_ANIMATION		// for Bounce Animation
- GooMPAS.JOBCODE_SHOW_ANIMATION		// for Show Animation
- GooMPAS.JOBCODE_HIDE_ANIMATION		// for Hide Animation (Bounce + Hide)
```

Sample
------
http://mabin359.github.io/GooMPAS/sample.htm
