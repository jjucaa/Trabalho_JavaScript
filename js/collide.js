function ballRect(b1, mc1){
	var dx = Math.abs(b1.x - mc1.posX - mc1.width / 2);
	var dy = Math.abs(b1.y - mc1.posY - mc1.height / 2);

	if(dx > (mc1.width / 2 + b1.radius)){
		return false;
	}

	if(dy > (mc1.height / 2 + b1.radius)){
		return false;
	}

	if(dx <= (mc1.width / 2)){
		return true;
	}

	if(dy <= (mc1.height / 2)){
		return true;
	}

	var distX = dx - mc1.width / 2;
	var distY = dy - mc1.height / 2;
	return (distX * distX + distY * distY <= (b1.radius * b1.radius));
}