Old .firebaserc: simulator-aabf8

# 1984 Simulator

# Code Overview - 1984 Simulator

This document provides an explanation of the main files and functions that constitute the **1984 Simulator** project. Each file and its significant components are described to help developers understand the project structure and logic.

No special instructions/tools/packages, can run using firebase serve.
---

## 1. **index.html**
The main HTML file that serves as the entry point for the game.

### Key Elements:
- **Meta Information**: Sets the page title as "1984 Simulator" and includes a responsive viewport meta tag.
- **CSS and JS Links**:
  - Links the `styles.css` file for styling.
  - Includes the `game.js` script as a module.
- **Game Container**:
  - A `<div>` with the ID `gameContainer` acts as the main canvas for the game.

### Sample Code:
```html
<div id="gameContainer"></div>
<script src="game.js" type="module"></script>
```

---

## 2. **styles.css**
Defines the visual style and layout of the game.

### Key Styles:
- **Game Container**:
  - Centrally aligned, with a grid layout for rooms.
  - Dimensions: 800x600 pixels.
- **Player**:
  - A white square, representing the player.
  - Includes a smooth transition for movement.
- **Rooms**:
  - Divided into quadrants with borders and labels.
- **Dialog Box**:
  - Positioned at the bottom center of the screen.
  - Styled with a semi-transparent background and white border.

### Sample Code:
```css
#gameContainer {
    width: 800px;
    height: 600px;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    border: 2px solid white;
}
#player {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    transition: all 0.1s;
}
```

---

## 3. **game.js**
The core JavaScript file that contains the logic and functionality of the game.

### Key Classes:

#### 1. **Player**
- Represents the player's avatar.
- Responsible for handling movement and position updates.

**Key Methods**:
- `move(direction)`: Updates the player's position based on the arrow key pressed.
- `updatePosition()`: Reflects the player's new position on the screen.

**Sample Code**:
```javascript
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
```

#### 2. **Room**
- Defines areas of the game world, such as "Victory Mansions" or "Room 101".
- Can contain furniture and other interactable elements.

**Key Method**:
- `addFurniture(furniture)`: Adds furniture objects to the room.

**Sample Code**:
```javascript
const victoryMansions = new Room('victoryMansions', 'Victory Mansions', container);
victoryMansions.addFurniture(new Furniture('Telescreen', 200, 20, 50, 100, () => {
    dialog.show('The telescreen blares Party propaganda. Do you listen or turn it off?', [
        { text: 'Listen', action: () => alert('You feel more loyal to the Party.') },
        { text: 'Turn it off', action: () => alert('A dangerous act of rebellion!') }
    ]);
}));
```

#### 3. **Furniture**
- Represents objects within rooms, like a "Telescreen".
- Can trigger interactions when clicked.

**Constructor Parameters**:
- `name`, `width`, `height`, `top`, `left`: Define the furniture's appearance and position.
- `interaction`: Callback function executed when the furniture is clicked.

**Sample Code**:
```javascript
this.element.addEventListener('click', interaction);
```

#### 4. **Dialog**
- Manages narrative text and multiple-choice interactions.

**Key Methods**:
- `show(text, choices)`: Displays a dialog box with the provided text and buttons for choices.
- `hide()`: Hides the dialog box.

**Sample Code**:
```javascript
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
```

---

## 4. Main Logic
The `DOMContentLoaded` event initializes the game by:
- Creating the game container and player.
- Setting up rooms and furniture.
- Adding event listeners for player movement and interactions.

**Sample Code**:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gameContainer');
    const player = new Player(container);

    const victoryMansions = new Room('victoryMansions', 'Victory Mansions', container);

    document.addEventListener('keydown', event => {
        player.move(event.key);
    });
});
```

---

## Summary
- **index.html**: Sets up the game container and imports resources.
- **styles.css**: Provides layout and style rules.
- **game.js**: Contains the main logic for player interactions, room setup, and object behaviors.

This modular structure makes the game extensible and easy to maintain.