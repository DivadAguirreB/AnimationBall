var game = function() {
	var justBegan = true, reversedLeft = false, reversedTop = false;
	var leaps = 6;

	var element = document.getElementById("ball");

	getStarted();

	function getStarted() {
		initialization();
		Animation();

		function initialization() {
			element.style.left = (parseInt(window.innerWidth)/2 - parseInt(element.clientWidth)/2) + "px";
			element.style.top = parseInt(element.clientTop) + "px";
		}

		function Animation() {
			function frame() {
				move();
				testForCollisions();
			}

			var frameInstance = setInterval(frame, 1000/60);
			function move() {
				if(justBegan) {
					element.style.top = (parseInt(element.style.top) + leaps) + "px";
				} else {
					element.style.top = (getTop() + getLeap("top")) + "px";
					element.style.left = (getLeft() + getLeap("left")) + "px";
				}
			}
				
			function getLeap(request) {
				if(request == "top") {
					if(reversedTop) {
						return -leaps;
					} else {
						return leaps;
					}
				} else if(request == "left") {
					if(reversedLeft) {
						return -leaps;
					} else {
						return leaps;
					}
				}
			}

			function getTop() {
				return parseInt(element.style.top);
			}

			function getLeft() {
				return parseInt(element.style.left);
			}

			function testForCollisions() {
				if((getLeft() + element.clientWidth) >= window.innerWidth) {
					reversedLeft = true;
					changeColor();
				} else if(getLeft() <= 0) {
					reversedLeft = false;
				}

				if((getTop() + element.clientHeight) >= window.innerHeight) {
					reversedTop = true;
					changeColor();
					justBegan = false;
				} else if(getTop() <= 0) {
					reversedTop = false;
				}
			}

			function changeColor() {
				element.style.backgroundColor = getColor(getRandom());
			}
			
			function getColor(num) {
				var color = "white";
				switch(num) {
					case 1: 
						color = "red";
						break;
					case 2:
						color = "green";
						break;
					case 3:
						color = "yellow";
						break;
					case 4:
						color = "blue";
						break;
					case 5:
						color = "pink";
						break;
				}
				return color;
			}

			function getRandom() {
				return Math.round(Math.random() * (5 - 1)) + 1;
			}

		}
	}
}
var instance = new game();
