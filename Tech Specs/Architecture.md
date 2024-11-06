#### Class Structure

- **GameManager**: 
  - Manages game state, assigns player roles (Ministry positions), and tracks end conditions
  - Communicates with **MeterManager** to update loyalty and rebellion meters

- **Player**:
  - Stores player-specific data such as loyalty, rebellion, and survival meters
  - Interacts with the game world, choices, and events

- **MinistryRole** (parent class):
  - Base class for roles, with subclasses for `Editor`, `SurveillanceOfficer`, and `PropagandaDeveloper`
  - **Methods**: `performAction()`, `updateSuspicion()`, `adjustMeter()`

- **Telescreen**:
  - Monitors player actions, triggering suspicion events based on player behavior
  - Connects with **BigBrotherAI** when suspicion exceeds certain levels

- **BigBrotherAI**:
  - An AI manager tracking player actions and calling on other components (like Telescreens and NPCs) to create consequences if the suspicion threshold is met

- **MeterManager**:
  - Manages and updates loyalty, rebellion, and survival meters based on actions
  - Independent meter objects track values

- **NPC**:
  - Manages NPC behaviors and spying actions on the player
  - Updates loyalty or rebellion meters based on interactions with the player

- **DocumentFragment**:
  - JavaScript objects representing collectible documents revealing hidden truths and potentially unlocking rebellion paths

- **DoublethinkMiniGame**:
  - A Phaser-based minigame with distortions
  - Changes appearance based on loyalty or rebellion meter adjustments

- **EndingManager**:
  - Evaluates game end conditions to display the appropriate final cutscene based on player actions

#### Game Flow

- **Initialization**:
  - Sets up Phaser game scenes, assigns player roles, and initializes meters

- **Gameplay**:
  - **Meter Management**: Updates player’s loyalty, rebellion, and survival meters based on actions
  - **Telescreen Interruptions**: Periodic interruptions to check player loyalty and initiate consequences
  - **NPC Interactions**: Tracks player and NPC actions, adjusting suspicion and meters as needed
  - **Big Brother AI Interventions**: Manages Big Brother’s monitoring and responses based on loyalty/rebellion balances

- **Endgame**:
  - Evaluates meter states and triggers one of the predefined ending scenarios based on the player’s decisions and final meter values

---









### 2. Architecture (Detailed Class Structure)

This section provides a full breakdown of each class, its methods, and responsibilities. Each class is designed to manage specific aspects of the game, facilitating modularity, reusability, and ease of maintenance.

---

#### Class Structure

1. **GameManager**
   - **Purpose**: Oversees the overall game state, player role assignment, and transition between scenes. Interacts with MeterManager to monitor loyalty and rebellion meters and triggers events based on player actions and meter levels.
   - **Methods**:
     - `initializeGame()`: Initializes Phaser game scenes, assigns player roles, and resets meter values.
     - `assignRole()`: Randomly assigns the player a role within the Ministry (Editor, Surveillance Officer, or Propaganda Developer).
     - `updateGameState()`: Checks game conditions periodically (e.g., meter thresholds) and triggers necessary transitions or alerts.
     - `endGame()`: Ends the game and invokes the EndingManager based on final meter levels and player choices.
   - **Subclasses/Components**: GameManager is a top-level manager and does not contain subclasses, but it interacts heavily with other classes like Player, MeterManager, and BigBrotherAI.

2. **Player**
   - **Purpose**: Represents the player's character, tracking essential stats such as loyalty, rebellion, and survival levels. Handles player decisions and responses to events.
   - **Methods**:
     - `getStats()`: Returns the current stats (loyalty, rebellion, survival) for display or calculation purposes.
     - `performAction(actionType)`: Executes an action (e.g., rewriting history, spying) based on the player’s role and updates relevant meters.
     - `adjustMeter(meterType, value)`: Adjusts the specified meter by the given value (e.g., increasing loyalty or rebellion based on player actions).
     - `displayWarning()`: Displays a UI warning to the player if they are nearing a suspicion threshold.
   - **Subclasses/Components**: Player is a standalone class with no subclasses but works closely with MinistryRole and MeterManager.

3. **MinistryRole** (Parent Class)
   - **Purpose**: Acts as the base class for different roles within the Ministry, each with specific tasks and interactions.
   - **Subclasses**:
     - **Editor**: Handles tasks involving historical editing. 
       - **Methods**:
         - `editDocument()`: Allows the player to edit documents to align with the Party's version of truth, increasing loyalty.
         - `analyzePropaganda()`: Runs a check to determine if the edited document triggers any suspicion.
     - **SurveillanceOfficer**: Manages surveillance tasks such as spying on NPCs.
       - **Methods**:
         - `spyOnNPC(npcID)`: Spies on a specified NPC, adding suspicion if noticed, and adjusting loyalty or rebellion.
         - `reportActivity()`: Allows the player to report NPC activity, which decreases rebellion but increases suspicion among other NPCs.
     - **PropagandaDeveloper**: Focuses on tasks related to propaganda creation and distribution.
       - **Methods**:
         - `createPropaganda()`: Initiates propaganda creation, increasing loyalty.
         - `distributePropaganda()`: Completes the distribution process and may trigger suspicion among NPCs if done poorly.

4. **Telescreen**
   - **Purpose**: Monitors player actions in real-time, triggering loyalty checks and suspicion events randomly.
   - **Methods**:
     - `triggerAlert()`: Generates a random loyalty alert, requiring the player to confirm their loyalty or risk suspicion.
     - `monitorAction(action)`: Analyzes the player’s actions and determines if suspicion should be raised, signaling BigBrotherAI if necessary.
     - `displayNotice(message)`: Displays notices or interruptions on the screen, simulating Party announcements and loyalty reinforcement.
   - **Subclasses/Components**: No subclasses; functions as a standalone component integrated into the game’s UI layer.

5. **BigBrotherAI**
   - **Purpose**: Manages the Party's surveillance and behavioral tracking of the player. Responsible for triggering raids, suspicions, and punishments.
   - **Methods**:
     - `evaluateSuspicion()`: Monitors player actions and calculates suspicion level based on actions and meter changes.
     - `initiateRaid()`: Executes a raid if suspicion reaches a critical level, affecting the player's survival meter.
     - `brainwashPlayer()`: A final consequence if suspicion surpasses a threshold, ending the game or resetting player stats in extreme cases.
     - `rewardLoyalty()`: Provides rewards (e.g., food, supplies) if the player shows consistent loyalty, reducing survival-related concerns.
   - **Subclasses/Components**: No subclasses but interacts directly with Player and Telescreen classes.

6. **MeterManager**
   - **Purpose**: Manages all player meters, including loyalty, rebellion, and survival, and handles the adjustments based on player choices and events.
   - **Methods**:
     - `adjustMeter(meterType, amount)`: Adjusts the specified meter (e.g., loyalty, rebellion) by a certain amount.
     - `getMeterValue(meterType)`: Returns the current value of a specified meter.
     - `checkThresholds()`: Checks if any meter thresholds have been reached, signaling BigBrotherAI if necessary.
   - **Subclasses/Components**: Contains **LoyaltyMeter**, **RebellionMeter**, and **SurvivalMeter** as individual instances with basic getter and setter methods.

7. **NPC**
   - **Purpose**: Represents non-player characters who can either spy on or interact with the player. NPCs influence loyalty and rebellion based on interactions.
   - **Methods**:
     - `interactWithPlayer(player)`: Initiates dialogue or interaction with the player, potentially affecting loyalty or rebellion based on responses.
     - `increaseSuspicion()`: Raises the suspicion level if the NPC detects player actions that are anti-Party.
     - `reportToBigBrother()`: Allows NPCs to report the player’s rebellious actions, increasing Big Brother’s suspicion level.
   - **Subclasses**:
     - **RebelNPC**: NPCs aligned with the rebellion; provide hints and support for rebellion activities.
       - **Methods**:
         - `shareDocument()`: Provides players with a document fragment that hints at the truth, encouraging rebellion.
     - **PartyLoyalistNPC**: NPCs loyal to the Party; often spy on players and report suspicious activities.
       - **Methods**:
         - `monitorPlayer()`: Observes player actions, raising suspicion if they witness rebellious behaviors.

8. **DocumentFragment**
   - **Purpose**: Represents collectible items that reveal the true state of the Party and the world, potentially unlocking the rebellion pathway.
   - **Methods**:
     - `collectFragment(fragmentID)`: Adds a document fragment to the player’s collection.
     - `revealTruth()`: Allows players to read the document, slightly increasing rebellion meter.
   - **Subclasses/Components**: No subclasses; each fragment is a unique instance with properties such as `content` and `fragmentID`.

9. **DoublethinkMiniGame**
   - **Purpose**: A minigame that challenges the player to remember the real truth against the Party's propaganda. Increases distortion effects based on loyalty or rebellion levels.
   - **Methods**:
     - `initializeGame()`: Sets up the initial state of the minigame, including initial truth visibility.
     - `increaseDistortion(level)`: Adjusts the visual distortion based on the player’s loyalty or rebellion meter levels.
     - `completeChallenge()`: Evaluates the player’s performance in the minigame and adjusts meters accordingly.

10. **EndingManager**
    - **Purpose**: Manages game endings based on final player choices and meter levels.
    - **Methods**:
      - `evaluateEnding()`: Checks final meter levels and selects the appropriate ending.
      - `triggerCutscene(endingType)`: Triggers a cutscene based on the chosen ending, displaying a loyalist or rebellion narrative.
    - **Subclasses/Components**: No subclasses; works as a standalone manager coordinating with other classes.

---

This architecture lays out a comprehensive structure for **1984 Simulator** in JavaScript. By defining distinct roles, each class remains focused on specific tasks, improving the game's organization, maintainability, and scalability.
