# 2048 Game - React + TypeScript

A fully functional implementation of the classic 2048 game built with **React**, **TypeScript**, and **functional programming principles**. This project features a clean, modular architecture with pure functions, comprehensive test coverage, and a modern UI.

## 🎮 Demo

Play the game by using arrow keys (↑ ↓ ← →) or WASD to move tiles. Combine tiles with the same number to create larger numbers. Reach the 2048 tile to win!

## ✨ Features

- ✅ **Pure Functional Logic**: All game logic implemented as pure functions (no mutations, no side effects)
- ✅ **Modular Architecture**: Clean separation between game logic, UI components, and state management
- ✅ **TypeScript**: Fully typed with strict type checking
- ✅ **Configurable Board Size**: Default 4x4, easily configurable
- ✅ **Score Tracking**: Current score and best score (persisted in localStorage)
- ✅ **Win/Lose Detection**: Game over when no moves possible, win when 2048 reached
- ✅ **Continue After Win**: Option to keep playing after reaching 2048
- ✅ **Keyboard Controls**: Arrow keys and WASD support
- ✅ **On-screen Controls**: Optional directional buttons for mobile/testing
- ✅ **Smooth Animations**: Tile appearance and merge animations
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Comprehensive Tests**: Unit tests for all core logic

## 📁 Project Structure

```
2048-game/
├── src/
│   ├── core/
│   │   └── game-logic/          # Pure game logic (no React dependencies)
│   │       ├── types.ts          # Core types and interfaces
│   │       ├── board.ts          # Board initialization and operations
│   │       ├── moves.ts          # Move logic (left, right, up, down)
│   │       ├── merge.ts          # Tile merging logic
│   │       ├── spawn.ts          # Random tile spawning
│   │       └── game-state.ts     # Game state management
│   ├── ui/
│   │   └── components/           # React components
│   │       ├── BoardView.tsx     # Main board grid
│   │       ├── Tile.tsx          # Individual tile
│   │       ├── ScoreBoard.tsx    # Score display
│   │       ├── Controls.tsx      # Game controls
│   │       └── GameOverlay.tsx   # Win/lose overlay
│   ├── hooks/
│   │   └── use2048.ts            # Custom hook for game state
│   ├── utils/
│   │   ├── random.ts             # Random utilities
│   │   └── keyboard.ts           # Keyboard event handling
│   ├── styles/
│   │   ├── global.css            # Global styles
│   │   ├── Board.css             # Board styles
│   │   └── Tile.css              # Tile styles and animations
│   ├── tests/                    # Unit tests
│   │   ├── board.test.ts
│   │   ├── moves.test.ts
│   │   ├── merge.test.ts
│   │   └── game-state.test.ts
│   ├── App.tsx                   # Root component
│   └── index.tsx                 # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone "https://github.com/Pranaam19/2048-game.git"
cd 2048-game
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Production Build
```bash
npm run build
```
The build output will be in the `dist/` directory.

#### Preview Production Build
```bash
npm run preview
```

### Running Tests

#### Run all tests
```bash
npm test
```

#### Run tests with UI
```bash
npm run test:ui
```


## 🎯 How to Play

1. **Objective**: Combine tiles with the same number to create a tile with the number 2048.

2. **Controls**:
   - Use **Arrow Keys** (↑ ↓ ← →) to move tiles
   - Or use **WASD** keys
   - Optional: Click on-screen directional buttons

3. **Rules**:
   - All tiles slide in the chosen direction until they hit the edge or another tile
   - When two tiles with the same number touch, they merge into one with double the value
   - After each move, a new tile (2 or 4) appears in a random empty spot
   - The game ends when no more moves are possible

4. **Winning**: Reach the 2048 tile to win! You can continue playing to achieve higher scores.

5. **Restart**: Click "New Game" to start over at any time.

## 🏗️ Architecture & Design

### Functional Programming Principles

This project strictly follows functional programming paradigms:

1. **Pure Functions**: All game logic functions are pure (deterministic, no side effects)
2. **Immutability**: Board state is never mutated; new states are created
3. **Function Composition**: Complex operations built from simple, composable functions
4. **Type Safety**: Comprehensive TypeScript types ensure correctness

### Core Logic API

#### Board Operations
```typescript
initializeBoard(size: number, initialTileCount?: number): Board
createEmptyBoard(size: number): Board
getEmptyPositions(board: Board): Position[]
setTileValue(board: Board, row: number, col: number, value: TileValue): Board
getTileValue(board: Board, row: number, col: number): TileValue
areBoardsEqual(board1: Board, board2: Board): boolean
hasTileValue(board: Board, targetValue: TileValue): boolean
```

#### Move Operations
```typescript
moveLeft(board: Board): MoveResult
moveRight(board: Board): MoveResult
moveUp(board: Board): MoveResult
moveDown(board: Board): MoveResult
move(board: Board, direction: Direction): MoveResult
canMove(board: Board): boolean
```

#### Merge Logic
```typescript
mergeLine(line: TileValue[]): { line: TileValue[], score: number }
mergeLineRight(line: TileValue[]): { line: TileValue[], score: number }
canMergeLine(line: TileValue[]): boolean
```

#### Game State
```typescript
createInitialGameState(config?: Partial<GameConfig>): GameState
processMove(state: GameState, direction: Direction): GameState
resetGame(currentState: GameState, config?: Partial<GameConfig>): GameState
isGameWon(board: Board): boolean
isGameOver(board: Board): boolean
```

### React Integration

The game uses a custom hook `use2048` that encapsulates all game logic:

```typescript
const { gameState, move, restart, continueGame, canContinue } = use2048({
  size: 4,
  winningTile: 2048,
  initialTiles: 2,
});
```

**Component Tree**:
```
App
├── Controls (title, restart button, instructions)
├── ScoreBoard (current score, best score)
├── BoardView (grid container)
│   └── Tile × 16 (individual tiles)
└── GameOverlay (win/lose messages)
```

### State Management Flow

1. User presses arrow key → `keyboard.ts` handler detects it
2. Handler calls `move(direction)` from hook
3. Hook calls `processMove(state, direction)` from game logic
4. Game logic:
   - Executes move (merge + slide tiles)
   - Spawns new tile if board changed
   - Checks win/lose conditions
   - Returns new state
5. React re-renders with new state
6. UI updates with animations

## 🧪 Testing

The project includes comprehensive unit tests for all core logic:

- **Board Operations**: Initialization, tile placement, position queries
- **Merge Logic**: Tile merging rules, edge cases, score calculation
- **Move Operations**: All four directions, board transformations
- **Game State**: State transitions, win/lose detection, score tracking

All tests use **Vitest** with a focus on testing pure functions in isolation.

## 🎨 Styling

- **CSS Variables**: Consistent color palette and spacing
- **Responsive Design**: Adapts to different screen sizes
- **Animations**: Smooth tile appearance and merge effects
- **Tile Colors**: Distinct colors for each tile value (2, 4, 8, ..., 2048+)

## 🔧 Configuration

### Board Size
Change the board size in `App.tsx`:
```typescript
const { gameState, move, restart } = use2048({ size: 5 }); // 5x5 board
```

### Winning Tile
Modify the winning condition:
```typescript
const { gameState, move, restart } = use2048({ winningTile: 4096 });
```

### Initial Tiles
Change the number of starting tiles:
```typescript
const { gameState, move, restart } = use2048({ initialTiles: 3 });
```

## 🚀 Future Improvements

Potential enhancements for the game:

- [ ] **Undo/Redo**: Allow players to undo moves
- [ ] **Move History**: Track and display move history
- [ ] **AI Auto-play**: Implement AI solver (expectimax, Monte Carlo)
- [ ] **Animations**: Enhanced tile movement animations
- [ ] **Sound Effects**: Audio feedback for moves and merges
- [ ] **Themes**: Multiple color themes and tile designs
- [ ] **Leaderboard**: Online leaderboard with user accounts
- [ ] **Mobile Gestures**: Swipe controls for mobile devices
- [ ] **Accessibility**: Screen reader support, keyboard navigation
- [ ] **Progressive Web App**: Offline support, installable
- [ ] **Multiplayer**: Compete with friends in real-time
- [ ] **Custom Game Modes**: Time attack, limited moves, obstacles

## 📝 Design Decisions

### Why Functional Programming?

1. **Testability**: Pure functions are easy to test in isolation
2. **Predictability**: No hidden state or side effects
3. **Debugging**: Easier to reason about and debug
4. **Maintainability**: Clear data flow and transformations
5. **Reusability**: Functions can be composed and reused

### Why Separate Core Logic from UI?

1. **Portability**: Game logic can be used in different UIs (CLI, mobile, etc.)
2. **Testing**: Logic can be tested without React dependencies
3. **Performance**: Pure functions can be easily memoized
4. **Clarity**: Clear separation of concerns

### Why Custom Hook?

1. **Encapsulation**: All game state logic in one place
2. **Reusability**: Hook can be used in different components
3. **Simplicity**: Components stay focused on presentation
4. **Testing**: Hook logic can be tested independently

## 📄 License

MIT License - feel free to use this project for learning or building upon it.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Enjoy playing 2048!** 🎮✨
