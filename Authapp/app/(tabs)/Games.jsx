// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// const TowerOfHanoi = () => {
//   const initialTowers = {
//     A: [3, 2, 1],
//     B: [],
//     C: []
//   };
//   const [towers, setTowers] = useState(initialTowers);
//   const [selectedDisk, setSelectedDisk] = useState(null);
//   const [selectedTower, setSelectedTower] = useState(null);
//   const [moves, setMoves] = useState(0);

//   // Handles selecting a disk from a tower
//   const handleSelectDisk = (towerKey) => {
//     const tower = towers[towerKey];
//     if (tower.length === 0) {
//       Alert.alert('No disk to move');
//       return;
//     }

//     const topDisk = tower[tower.length - 1];
//     setSelectedDisk(topDisk);
//     setSelectedTower(towerKey);
//   };

//   // Handles placing a selected disk onto a tower
//   const handlePlaceDisk = (towerKey) => {
//     if (!selectedDisk) return;

//     const tower = towers[towerKey];
//     const topDisk = tower[tower.length - 1];

//     // Check if the move is valid
//     if (!topDisk || selectedDisk < topDisk) {
//       const updatedSourceTower = towers[selectedTower].slice(0, -1);
//       const updatedTargetTower = [...tower, selectedDisk];

//       setTowers({
//         ...towers,
//         [selectedTower]: updatedSourceTower,
//         [towerKey]: updatedTargetTower
//       });
//       setSelectedDisk(null);
//       setSelectedTower(null);
//       setMoves(moves + 1); // Increment move counter

//       // Check if the game is won
//       if (updatedTargetTower.length === 3 && towerKey === 'C') {
//         setTimeout(() => {
//           Alert.alert('Congratulations!', `You solved the Tower of Hanoi in ${moves + 1} moves!`);
//         }, 300);
//       }
//     } else {
//       Alert.alert('Invalid move', 'You cannot place a larger disk on a smaller disk.');
//     }
//   };

//   // Resets the game
//   const handleResetGame = () => {
//     setTowers(initialTowers);
//     setSelectedDisk(null);
//     setSelectedTower(null);
//     setMoves(0);
//   };

//   // Renders a single tower
//   const renderTower = (towerKey) => {
//     const tower = towers[towerKey];
//     return (
//       <View style={styles.towerContainer}>
//         <Text style={styles.towerTitle}>{towerKey}</Text>
//         <TouchableOpacity style={styles.tower} onPress={() => handleSelectDisk(towerKey)}>
//           {tower.map((disk, index) => (
//             <AnimatedDisk key={index} disk={disk} />
//           ))}
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.placeButton} onPress={() => handlePlaceDisk(towerKey)}>
//           <Text style={styles.placeButtonText}>Place Disk Here</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tower of Hanoi</Text>
//       <View style={styles.towers}>
//         {renderTower('A')}
//         {renderTower('B')}
//         {renderTower('C')}
//       </View>
//       {selectedDisk && (
//         <Text style={styles.selectedDiskText}>
//           Selected Disk: {selectedDisk} from Tower {selectedTower}
//         </Text>
//       )}
//       <Text style={styles.moveCounter}>Moves: {moves}</Text>
//       <TouchableOpacity style={styles.resetButton} onPress={handleResetGame}>
//         <Text style={styles.resetButtonText}>Reset Game</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Disk component with animation
// const AnimatedDisk = ({ disk }) => {
//   const scale = useSharedValue(1);
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: withSpring(scale.value) }]
//   }));

//   scale.value = 1.2; // Enlarge animation

//   return (
//     <Animated.View style={[styles.disk, animatedStyle, { width: disk * 50 }]}>
//       <Text style={styles.diskText}>{disk}</Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f7f7f7'
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#1E88E5'
//   },
//   towers: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   towerContainer: {
//     alignItems: 'center',
//   },
//   towerTitle: {
//     fontSize: 20,
//     marginBottom: 10,
//     color: '#333'
//   },
//   tower: {
//     width: 100,
//     height: 200,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#333',
//     borderRadius: 10,
//     padding: 5,
//   },
//   disk: {
//     height: 30,
//     backgroundColor: '#ff9800',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//     borderRadius: 5,
//   },
//   diskText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   placeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#1E88E5',
//     borderRadius: 5,
//   },
//   placeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   selectedDiskText: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   moveCounter: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   resetButton: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#ff1744',
//     borderRadius: 5,
//   },
//   resetButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   }
// });

// export default TowerOfHanoi;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TicTacToe = () => {
  const initialBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) {
      Alert.alert(`Player ${winner} wins!`, '', [{ text: 'OK', onPress: resetGame }]);
    } else if (moveCount === 9 && !winner) {
      Alert.alert('It\'s a draw!', '', [{ text: 'OK', onPress: resetGame }]);
    }
  }, [winner, moveCount]);

  const handleCellPress = (row, col) => {
    if (board[row][col] !== '' || gameOver) return;

    const updatedBoard = [...board];
    updatedBoard[row][col] = currentPlayer;

    setBoard(updatedBoard);
    setMoveCount(moveCount + 1);

    if (checkWin(updatedBoard, currentPlayer)) {
      setWinner(currentPlayer);
      setGameOver(true);
    } else if (moveCount === 8) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWin = (board, player) => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;

    return false;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setGameOver(false);
    setMoveCount(0);
    setWinner(null);
  };

  const renderCell = (row, col) => {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handleCellPress(row, col)}
        disabled={board[row][col] !== '' || gameOver}
      >
        <Text style={styles.cellText}>{board[row][col]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </View>
        ))}
      </View>
      {!gameOver && <Text style={styles.turnText}>Player {currentPlayer}'s turn</Text>}
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  board: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#333',
  },
  cellText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  turnText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#1E88E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TicTacToe;
