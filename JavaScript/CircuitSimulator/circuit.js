function Circuit() {
	// circuit data
	this.res = 2000;
	this.emf = 12;
	this.cap = 2 * 10 ** -9;

	//time data
	this.startCount = new Date();
	this.endCount;
	this.otherStart;
	this.gap = 0;
	this.elapsedTime = 0;

	// for storing calculations
	this.capVoltage;
	this.initCapVoltage = 0;
	this.I;
	this.deltaV;
	this.percentCharge;

	//for stroring the position of the switch  false: open
	this.switch = false; //                     true:closed

	// update switch
	this.invertSwtich = function(){
		this.switch = !this.switch;
		this.initCapVoltage = this.capVoltage;
		this.startCount = new Date();
		this.elpasedTime = 0;
	}

	// update valluee
	this.updateCircuit = function(){

		if(this.switch){
			this.capVoltage = this.initCapVoltage + this.emf * (1 - Math.E ** (-this.elapsedTime * 10 ** -6 / 
				(this.res * this.cap)));
		}
		else{
			this.capVoltage = this.initCapVoltage * Math.E ** (-this.elapsedTime * 10 ** -6 / 
				(this.res * this.cap));
		}

		this.percentCharge = this.capVoltage / this.emf * 100;
		this.deltaV = this.emf - this.capVoltage;
		this.I = this.deltaV / this.res;
		
	};

	// update
	this.update = function(){

		this.updateCircuit();
		this.endCount = new Date();

		this.elapsedTime = (this.endCount.getSeconds() + this.endCount.getMinutes() * 60) - 
			(this.startCount.getSeconds() + this.startCount.getMinutes() * 60);

	}

}

function coord(x, y){
	this.x = x;
	this.y = y;
}

function Charge(x, y, s, coordListOne, coordListTwo){
	this.speed = s;
	this.dx = 0, this.dy = 0;
	this.x = x, this.y = y;
	this.coordList = coordListOne;
	this.coordListTwo = coordListTwo;
	this.count = 0, this.countOne = 0;

	this.setSpeed = function(list, num){
		if(this.y < list[num].y){
			this.dy = this.speed;
		}
		if(this.y > list[num].y){
			this.dy = -this.speed;
		}
		if(this.y == list[num].y){
			this.dy = 0;
		}
		if(this.x < list[num].x){
			this.dx = this.speed;
		}
		if(this.x > list[num].x){
			this.dx = -this.speed;
		}
		if(this.x == list[num].x){
			this.dx = 0;
		}
		if(this.x > list[num].x - 2 && this.x < list[num].x + 2 && 
			this.y > list[num].y - 2 && this.y < list[num].y + 2){

			if(num < (list.length - 1)){
				num += 1;
			}
		}

		return num;		
	}

	this.move= function(){
		this.x += this.dx;
		this.y += this.dy;
	}

	this.draw = function(c){
		c.beginPath();
		c.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		c.fillStyle = "black"
		c.fill();
		c.stroke();		
	}

	this.update = function(c, move){
		if(move == true && this.countOne < 1){
			this.count = this.setSpeed(this.coordList, this.count);
			this.move();
		}
		else if(this.count > 1 && move == false){
			this.countOne = this.setSpeed(this.coordListTwo, this.countOne);
			this.move();
		}

		this.draw(c);

	}

}