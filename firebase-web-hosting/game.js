// Player Class
class Player {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.id = 'player';
        this.x = 50;
        this.y = 50;
        container.appendChild(this.element);
        this.updatePosition();
    }

    move(direction) {
        const speed = 20;
        switch (direction) {
            case 'ArrowUp': this.y -= speed; break;
            case 'ArrowDown': this.y += speed; break;
            case 'ArrowLeft': this.x -= speed; break;
            case 'ArrowRight': this.x += speed; break;
        }
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}

// Room Class
class Room {
    constructor(id, label, container) {
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.className = 'room';
        this.label = document.createElement('div');
        this.label.className = 'room-label';
        this.label.textContent = label;
        this.element.appendChild(this.label);
        container.appendChild(this.element);
    }

    addFurniture(furniture) {
        this.element.appendChild(furniture.element);
    }
}

// Furniture Class
class Furniture {
    constructor(name, width, height, top, left, interaction) {
        this.element = document.createElement('div');
        this.element.className = 'furniture';
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
        this.element.textContent = name;
        this.element.addEventListener('click', interaction);
    }
}

// Dialog Class
class Dialog {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.id = 'dialog';
        this.textElement = document.createElement('p');
        this.textElement.id = 'dialogText';
        this.choicesElement = document.createElement('div');
        this.choicesElement.id = 'dialogChoices';
        this.element.append(this.textElement, this.choicesElement);
        this.element.style.display = 'none';
        container.appendChild(this.element);
    }

    show(text, choices) {
        this.textElement.textContent = text;
        this.choicesElement.innerHTML = '';
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                choice.action();
                this.hide();
            });
            this.choicesElement.appendChild(button);
        });
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

// Main Script
document.addEventListener('DOMContentLoaded', () => {

    let obedienceScore = 0;
    let rebellionScore = 0;
    let suspicion = 0;
    
    const updateScores = () => {
        document.getElementById('obedienceScore').textContent = `Obedience: ${obedienceScore}`;
        document.getElementById('rebellionScore').textContent = `Rebellion: ${rebellionScore}`;
        document.getElementById('suspicionDisplay').textContent = `Suspicion: ${suspicion}%`;
    };

    const increaseSuspicion = (amount) => {
        suspicion = Math.min(100, suspicion + amount);
        updateScores();
        if (suspicion >= 100) {
            alert('You have been captured by the Thought Police!');
            location.reload();
        }
    };
    
    const decreaseSuspicion = (amount) => {
        suspicion = Math.max(0, suspicion - amount);
        updateScores();
    };    

    const container = document.getElementById('gameContainer');
    const player = new Player(container);

    const victoryMansions = new Room('victoryMansions', 'Victory Mansions', container);
    const ministryOfTruth = new Room('ministryOfTruth', 'Ministry of Truth', container);
    const room101 = new Room('room101', 'Room 101', container);
    const proleDistrict = new Room('proleDistrict', 'Prole District', container);

    const dialog = new Dialog(container);

    victoryMansions.addFurniture(new Furniture('Telescreen', 200, 20, 50, 100, () => {
        dialog.show('The telescreen blares Party propaganda. Do you listen or turn it off?', [
            {
                text: 'Listen',
                action: () => {
                    obedienceScore += 10; // Increase obedience points
                    decreaseSuspicion(5); // Reduce suspicion
                    alert('You feel more loyal to the Party.');
                    updateScores();
                }
            },
            {
                text: 'Turn it off',
                action: () => {
                    rebellionScore += 50; // Increase rebellion points
                    increaseSuspicion(20); // Increase suspicion
                    alert('A dangerous act of rebellion!');
                    updateScores();
                }
            }
        ]);
    }));

    document.addEventListener('keydown', event => {
        player.move(event.key);
    });
});
