class ProleNPC {
    constructor(container, districtElement) {
        this.element = document.createElement('div');
        this.element.className = 'prole-npc';
        
        // Let's explicitly set and verify rebel status
        this.isRebel = Math.random() < 0.1;  // 10% chance
        if (this.isRebel) {
            console.log('Created a rebel prole');  // Debug log
            this.element.classList.add('rebel');
            this.element.style.backgroundColor = '#ffcccc';  // Explicitly set color
        } else {
            this.element.style.backgroundColor = '#808080';  // Regular prole color
        }
        
        const districtRect = districtElement.getBoundingClientRect();
        
        this.minX = 0;
        this.maxX = districtRect.width - 15;
        this.minY = 0;
        this.maxY = districtRect.height - 15;
        
        this.x = Math.random() * this.maxX;
        this.y = Math.random() * this.maxY;
        
        const baseSpeed = 20;
        this.speed = baseSpeed * (0.95 + Math.random() * 0.1);
        
        const baseInterval = 2000;
        this.moveInterval = baseInterval * (0.9 + Math.random() * 0.2);
        
        districtElement.appendChild(this.element);
        this.updatePosition();
        this.startMoving();
    }
    
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    
    startMoving() {
        const move = () => {
            if (this.x + this.speed >= this.maxX) {
                // When about to exceed boundary, remove transition,
                // move to start, then restore transition
                this.element.style.transition = 'none';
                this.x = this.minX - this.speed; // Start slightly off-screen
                this.y = Math.random() * this.maxY;
                this.updatePosition();
                
                // Force a reflow
                this.element.offsetHeight;
                
                // Restore transition and move to first visible position
                this.element.style.transition = 'all 0.5s ease-in-out';
                this.x = this.minX;
                this.updatePosition();
            } else {
                this.x += this.speed;
                this.updatePosition();
            }
            
            // Schedule next movement using prole's unique interval
            setTimeout(move, this.moveInterval);
        };
        
        // Initial delay random between 0 and the move interval
        // This creates the initial offset between proles
        setTimeout(move, Math.random() * this.moveInterval);
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
        this.element.remove();
    }
}