function JobTreeNode(jobTicket){
	this.jobTicket = jobTicket;
	this.left = null;
	this.right = null;
	this.put = function(jobTicket){
		var thisTimeline = this.jobTicket.timeline;
		var targetTimeline = jobTicket.timeline;
		
		if(thisTimeline <= targetTimeline){
			if(this.right == null){
				this.right = new JobTreeNode(jobTicket);
			} else {
				this.right.put(jobTicket);
			}
		} else {
			if(this.left == null){
				this.left = new JobTreeNode(jobTicket);
			} else {
				this.left.put(jobTicket);
			}
		}
	};
	
	this.get = function(timeline){
		var thisTimeline = this.jobTicket.timeline; 
		
		if(thisTimeline == timeline && !this.jobTicket.isused){
			this.jobTicket.isused = true;
			return this.jobTicket;
		}else {
			var getTarget = null;
			if(thisTimeline <= timeline)
				getTarget = this.right;
			else
				getTarget = this.left;
			
			if(getTarget == null){
				if(this.jobTicket.isused)
					return null;
				this.jobTicket.isused = true;
				return this.jobTicket;
			}else {
				var tmpResult = getTarget.get(timeline);
				if(tmpResult){
					return tmpResult
				} else {
					if(this.jobTicket.isused)
						return null;
					this.jobTicket.isused = true;
					return this.jobTicket;
				}
			}
				
		}
	};
}

function JobTicket(timeline){
	this.timeline = timeline;
	this.jobIdx = null;
	this.jobAction = null;
	this.isused = false;
	this.timeout = 0;
}

var GooMPAS = new Object();

GooMPAS.JOBCODE_HIDE = 0;
GooMPAS.JOBCODE_BOUNCE_ANIMATION = 1;
GooMPAS.JOBCODE_SHOW_ANIMATION = 2;
GooMPAS.JOBCODE_HIDE_ANIMATION = 3;		// Bounce + Hide

var _initJobTicket = new JobTicket(0);
_initJobTicket.isused = true;
GooMPAS.data = new JobTreeNode(_initJobTicket);

GooMPAS.playedTimeline = 0;
GooMPAS.pinArr = new Array();

GooMPAS.setPinArr = function(pinArr){
	this.pinArr = pinArr;
}

GooMPAS.addJob = function(idx, actionCode, timeout){
	if(actionCode == GooMPAS.JOBCODE_HIDE_ANIMATION){
		this.addJob(idx, GooMPAS.JOBCODE_BOUNCE_ANIMATION, timeout);
		this.addJob(idx, GooMPAS.JOBCODE_HIDE, timeout + 500);
	}
	
	var thisTimeline = (this.playedTimeline + timeout);
	
	var tmpJobTicket = new JobTicket(thisTimeline);
	tmpJobTicket.jobIdx = idx;
	tmpJobTicket.jobAction = actionCode;
	tmpJobTicket.timeout = timeout;
	
	this.data.put(tmpJobTicket);
	
	setTimeout(function(){
		var thisTimeline = GooMPAS.playedTimeline;
		var thisJobTicket = GooMPAS.data.get(thisTimeline);
		
		if((thisJobTicket.timeline) > GooMPAS.playedTimeline)
			GooMPAS.playedTimeline = (thisJobTicket.timeline);
		
		var jobAction = thisJobTicket.jobAction;
		var jobIdx = thisJobTicket.jobIdx;
		
		if(jobAction == GooMPAS.JOBCODE_BOUNCE_ANIMATION){
			GooMPAS.pinArr[jobIdx].setAnimation(google.maps.Animation.BOUNCE);
		} else if(jobAction == GooMPAS.JOBCODE_HIDE){
			GooMPAS.pinArr[jobIdx].setVisible(false);
		} else if(jobAction == GooMPAS.JOBCODE_SHOW_ANIMATION){
			GooMPAS.pinArr[jobIdx].setAnimation(google.maps.Animation.DROP);
			GooMPAS.pinArr[jobIdx].setVisible(true);
		}
	}, timeout);
};
