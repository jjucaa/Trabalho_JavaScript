var Sprite = function(posX, posY, width, height, color){
	this.posX = posX;
	this.posY = posY;
	this.width = width;
	this.height = height;
	this.color = color;
	this.visible = false;
	this.update = function() {
        ctx = ctx.context;
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();    
    }
}
//Retorna a metade da largura
Sprite.prototype.halfWidth = function(){
	return this.width/2;
}
//Retorna a metade da altura
Sprite.prototype.halfHeight = function(){
	return this.height/2;
}
//Retorna a posição do centro do objeto no eixo X
Sprite.prototype.centerX = function(){
	return this.posX - this.halfWidth();
}
//Retorna a posição do centro do objeto no eixo Y
Sprite.prototype.centerY = function(){
	return this.posY - this.halfHeight();
}