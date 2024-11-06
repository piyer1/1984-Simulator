- **Firebase Structure** (for simplicity):
  - **Player Data**: Stores player ID, assigned Ministry role, meter levels, suspicion level, and fragment collections
  - **NPC Data**: Tracks relationships with players and any loyalty/rebellion tendencies for more realistic interactions
  - **Big Brother AI Settings**: Configures suspicion thresholds and logs raid frequency
  - **Document Fragments**: Each document fragment has a unique ID, description, and truth content to be unlocked
  - **Event Log**: Tracks random events like telescreen interruptions, NPC spying, and suspicion adjustments

---

### Out of Scope Components

- **High-Performance 3D Graphics**: Game will use a simple 2D or low-poly style due to browser performance constraints
- **Server-Side AI Processing**: All AI will be handled client-side to reduce server load
- **Advanced Networking**: Game will be single-player only; multiplayer is out of scope for this version
- **VR/AR Features**: No virtual or augmented reality elements will be implemented

---