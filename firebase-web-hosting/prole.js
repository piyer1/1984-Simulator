class ProleNPC {
    constructor(container, districtElement) {
        this.element = document.createElement('div');
        this.element.className = 'prole-npc';
        this.isRebel = Math.random() < 0.1;
        
        if (this.isRebel) {
            this.element.classList.add('rebel');
        }
        
        const districtRect = districtElement.getBoundingClientRect();
        
        this.minX = 0;
        this.maxX = districtRect.width - 15;
        this.minY = 0;
        this.maxY = districtRect.height - 15;
        
        this.x = this.minX;
        this.y = Math.random() * (this.maxY - this.minY) + this.minY;
        
        this.speed = 2; // Increased for smoother movement
        
        districtElement.appendChild(this.element);
        this.updatePosition();
        this.startMoving();
    }
    
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    
    startMoving() {
        this.moveInterval = setInterval(() => {
            if (this.x < this.maxX) {
                this.x += this.speed;
                this.updatePosition();
            } else {
                this.x = this.minX;
                this.y = Math.random() * (this.maxY - this.minY) + this.minY;
                this.updatePosition();
            }
        }, 33); // Adjusted for smoother movement (approx. 30fps)
    }
    
    checkCollision(player) {
        const playerRect = player.element.getBoundingClientRect();
        const npcRect = this.element.getBoundingClientRect();
        
        return !(playerRect.right < npcRect.left || 
                playerRect.left > npcRect.right || 
                playerRect.bottom < npcRect.top || 
                playerRect.top > npcRect.bottom);
    }
    
    destroy() {
        clearInterval(this.moveInterval);
        this.element.remove();
    }
}