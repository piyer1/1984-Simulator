# **1984 Simulator - Refined Architecture**

---

## **1. GameManager**
- **Purpose**: Core controller of the game’s logic, managing game state, player interactions, and endgame scenarios. Oversees updates to player metrics, triggers events, and coordinates class interactions.
- **Variables**:
  - P2: `playerRole`: Stores the role assigned to the player (e.g., "Editor", "Surveillance Officer", "Propaganda Developer").
  - P3: `gameState`: Current state of the game, e.g., `"active"`, `"paused"`, or `"ended"`.
  - P0: `meterValues`: An array that stores numeric values for player metrics that impact game progression and endings.
  - P0: `suspicionLevel`: Tracks the level of suspicion toward the player, triggering consequences from Big Brother as it increases. 
- **Methods**:
  - P0: `initializeGame()`: 
    - Initializes game settings, assigns a random role to the player, resets all metrics (loyalty, rebellion, survival), and sets `suspicionLevel` to zero.
    - Instantiates core classes (`Player`, `MinistryTaskManager`, `TelescreenAI`, `EndingManager`) and begins tracking game progress.
  - P2:`assignRole()`: 
    - Randomly selects a role for the player from the available options and stores it in `playerRole`.
    - Loads the relevant task data for the selected role into `MinistryTaskManager`.
  - P0: `updateGameState()`: 
    - Regularly evaluates game conditions, checking if `suspicionLevel`, meters, or other thresholds have been reached.
    - Calls `TelescreenAI.triggerAlert()` for random loyalty checks and `EndingManager.determineEnding()` if an end condition is met.
    - Updates all game elements and timers, ensuring that necessary events (e.g., meter adjustments, new tasks) occur at specific intervals.
  - P0: `applyConsequences(action)`: 
    - Takes an action parameter, evaluates its impact on player metrics, and adjusts `loyaltyMeter`, `rebellionMeter`, or `survivalMeter` accordingly.
    - For each action, it modifies `suspicionLevel` based on its type (e.g., rebellious actions increase suspicion).
    - Notifies `TelescreenAI` of updated `suspicionLevel` and checks if new thresholds are crossed.
  - P1: `endGame()`: 
    - Finalizes the game by invoking `EndingManager` to assess metrics and determine the appropriate ending.
    - Triggers the final cutscene, reflecting the player’s choices and loyalty/rebellion alignment.

---

## **2. Player**
- **Purpose**: Represents the player’s attributes and decision-making; stores player metrics and allows interaction with tasks and NPCs. Manages the impact of player choices on game metrics.
- **Variables**:
  - P0: `loyaltyMeter`, P1: `rebellionMeter`, P2: `survivalMeter`: Numeric values reflecting player’s choices and status.
  - P1: `collectedDocuments`: Array that stores document fragments, which help reveal the real truth.
  - P2: `money` : In game currency used for purchasing things from various NPCs
- **Methods**:
  - P0: `performAction(actionType)`: 
    - Takes `actionType` as a parameter to determine if the player is editing history, conducting surveillance, or creating propaganda.
    - Based on `playerRole`, modifies `loyaltyMeter`, `rebellionMeter`, and/or `suspicionLevel`.
    - If `actionType` aligns with Party doctrine, increases `loyaltyMeter` and decreases suspicion; rebellious actions raise `rebellionMeter` and suspicion.
  - P0: `adjustMeter(meter, value)`: 
    - Adjusts the specified `meter` by a `value`, applying limits (e.g., between 0 and 100).
    - Calls `GameManager.updateGameState()` if thresholds for any meter are reached, possibly triggering consequences.
  - P0: `checkSuspicion()`: 
    - Checks if `suspicionLevel` has reached a threshold where actions would trigger Telescreen or Big Brother interventions.
    - Returns a boolean indicating whether the threshold was exceeded, signaling `GameManager` to apply consequences.
  - P1: `collectFragment(fragment)`: 
    - Adds a document fragment to `collectedDocuments`, increasing `rebellionMeter` slightly to represent gaining truth awareness.
    - Calls `adjustMeter(rebellionMeter, increment)` to update the meter and notifies `GameManager` of any potential changes to game progression.

---

## **3. MinistryTaskManager**
- **Purpose**: Manages tasks specific to each of the three roles (Editor, Surveillance Officer, Propaganda Developer). Provides methods for executing tasks and tracking their impact on player metrics and suspicion.
- **Variables**:
  - P1: `currentRole`: Stores the player’s role to determine available tasks.
  - P1: `taskData`: Dictionary storing parameters for each task type, including potential suspicion impact.
- **Methods**:
  - P0： `executeTask(actionType)`: 
    - Receives an `actionType` and, based on `currentRole`, performs a task such as editing documents, spying on NPCs, or creating propaganda.
    - Calls `GameManager.applyConsequences(actionType)` to update meters based on the task's nature.
    - Returns an outcome of the task, adjusting suspicion and loyalty/rebellion meters according to Party doctrine.
  - P0: `calculateSuspicion(actionType)`: 
    - Takes an `actionType` and calculates the suspicion generated, which varies by task type and frequency.
    - Updates `suspicionLevel` in `GameManager`, ensuring that repeated rebellious tasks create escalating consequences.
  - P1: `completeTask(taskOutcome)`: 
    - Takes `taskOutcome` (e.g., “success” or “failure”) and adjusts meters based on alignment with Party expectations.
    - Calls `GameManager.updateGameState()` if task completion shifts any key metrics, triggering possible new events or consequences.

---

## **4. BigBrother/Telescreen**
- **Purpose**: Omnipresent surveillance system, triggering random loyalty checks and monitoring player suspicion. Controls consequences like Room 101 and raiding events based on suspicion.
- **Variables**:
  - P0: `suspicionThreshold`: Defines the level at which major events or checks are triggered.
  - P1: `raidFrequency`: Frequency counter, determining how often raids should occur as suspicion increases.
- **Methods**:
  - P0: `triggerAlert()`: 
    - Randomly checks the player’s `loyaltyMeter` and `suspicionLevel` at intervals to ensure compliance.
    - If player loyalty is low, prompts an immediate response that influences `loyaltyMeter` or `rebellionMeter` depending on player choices.
  - P1: `monitorSuspicion(suspicionLevel)`: 
    - Continuously evaluates `suspicionLevel`; if it exceeds `suspicionThreshold`, escalates events by increasing frequency of checks or initiating raids.
    - Notifies `GameManager` if an event threshold is crossed, potentially altering game progression.
  - P0: `executeRaid()`: 
    - If suspicion is critically high, initiates a raid event, directly impacting the player’s `survivalMeter`.
    - Checks `collectedDocuments` to find any rebellion-related materials. If found, triggers Room 101 brainwashing, and reduces `rebellionMeter`.
    - Calls `GameManager.endGame()` if the raid results in a fatal outcome for the player.

---

## **5. NPC**
- **Purpose**: Represents NPCs, including their actions, relationship dynamics, and potential to spy on the player. NPCs have loyalty levels that affect reporting likelihood and interactions.
- **Variables**:
  - `npcType`: Indicates alignment with the Party or rebellion.
  - `relationshipLevel`: A numeric value determining NPC’s trust in or suspicion of the player, impacting their likelihood of reporting rebellious actions.
- **Methods**:
  - `interact()`: 
    - Initiates an interaction based on `npcType`; if the NPC is loyal to the Party, interaction may increase `suspicionLevel`.
    - If NPC is rebellion-aligned, may provide a hint or document fragment to support the player’s rebellion.
    - Modifies `relationshipLevel` based on player responses, increasing or decreasing NPC trust.
  - `reportPlayer()`: 
    - Based on `relationshipLevel`, determines the likelihood of reporting suspicious behavior to `TelescreenAI`.
    - Increases `suspicionLevel` and updates `GameManager` if the report goes through.
  - `provideHint()`: 
    - If the NPC is aligned with the rebellion, provides a document fragment or subtle guidance, increasing `rebellionMeter`.
    - Calls `Player.collectFragment()` and notifies `GameManager` to track the player’s growing awareness and rebellion.

---

## **6. EndingManager**
- **Purpose**: Manages endgame conditions, determining which ending is triggered based on player metrics and interactions. Handles the display of the final cutscene and outcome.
- **Variables**:
  - `endConditions`: Array storing the required values for each potential ending.
- **Methods**:
  - `determineEnding()`: 
    - Compares `loyaltyMeter`, `rebellionMeter`, `survivalMeter`, and `suspicionLevel` against `endConditions`.
    - Selects an ending type (e.g., Loyalist, Rebellion) based on metric alignment and calls `triggerCutscene()` to finalize the outcome.
  - `triggerCutscene(endingType)`: 
    - Loads and displays the cutscene or narration corresponding to `endingType`, summarizing player’s journey and choices.
    - Marks the game as “ended” in `gameState` and allows for post-game analysis or review options.

---

## **Interactions Summary**
1. **GameManager** acts as the orchestrator, directly coordinating `Player`, `MinistryTaskManager`, `TelescreenAI`, and `EndingManager`.
2. **Player** interacts with `MinistryTaskManager` to perform tasks and `TelescreenAI` for suspicion monitoring.
3. **MinistryTaskManager** provides tasks, calculates suspicion, and informs `GameManager` of outcomes.
4. **TelescreenAI** monitors suspicion, escalating events and raids through `GameManager`.
5. **NPC** dynamically affects player suspicion and loyalty based on interactions and alignment.
6. **EndingManager** finalizes the game, selecting an ending based on player metrics and triggering the appropriate cutscene. 

This structure ensures clear dependencies and data flow, allowing `GameManager` to manage complex interactions effectively.

---