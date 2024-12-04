# 1984 Simulator - Technical Specifications

## Overview
The **1984 Simulator** is an interactive, browser-based simulation game inspired by George Orwell's *1984*. It allows players to explore different rooms, interact with objects, and engage in scenarios reminiscent of the novel.

---

## Project Structure

### Files
- **index.html**: Entry point for the game.
- **game.js**: Core game logic, including classes for the player, rooms, furniture, and dialogs.
- **styles.css**: Defines the visual style of the game, including layout and animations.

### Folders
- `assets/`: Placeholder for additional assets like images, audio, or fonts (not included in this version).

---

## Functional Components

### 1. **Player**
- **Purpose**: Represents the player's avatar in the game.
- **Key Features**:
  - Moves in response to arrow key inputs.
  - Maintains position within the game container.
- **Methods**:
  - `move(direction)`: Updates the player's position based on keyboard input.
  - `updatePosition()`: Syncs the player's position with the DOM.

### 2. **Rooms**
- **Purpose**: Define distinct areas of the game world.
- **Properties**:
  - Unique ID and label.
  - Can contain furniture and interactable objects.
- **Method**:
  - `addFurniture(furniture)`: Adds a furniture object to the room.

### 3. **Furniture**
- **Purpose**: Interactive objects within rooms.
- **Key Features**:
  - Can have a unique size and position.
  - Triggers events or dialogs upon interaction.
- **Constructor Parameters**:
  - `name`: Name of the furniture.
  - `width`, `height`: Dimensions in pixels.
  - `top`, `left`: Position within the room.
  - `interaction`: Callback function for interactions.

### 4. **Dialog**
- **Purpose**: Display interactive choices and narrative text.
- **Key Features**:
  - Supports dynamic text and multiple-choice actions.
  - Appears as a modal dialog in the game.
- **Methods**:
  - `show(text, choices)`: Displays dialog with text and button choices.
  - `hide()`: Hides the dialog.

---

## User Interface (UI)

### Game Layout
- **Game Container**: 
  - Size: 800x600 pixels.
  - Grid layout with four quadrants for rooms.
- **Player**: 
  - A small, white square representing the user.
  - Moves within the boundaries of the game container.
- **Rooms**:
  - Labeled sections where interactions occur.
- **Dialog**:
  - Centered modal for narrative and choices.

### Controls
- **Keyboard**: 
  - Arrow keys for player movement.
- **Mouse**: 
  - Click on furniture to interact.

---

## Visual Design

### General Theme
- **Background**: Black with white highlights for elements.
- **Font**: Monospace for a retro aesthetic.
- **Colors**:
  - **Player**: White.
  - **Furniture**: Gray.
  - **Dialog**: Black with white text.

### Animations
- Smooth transitions for player movement.

