function adjacentsOfSquare(startingPosition){
    const relativeSquares = []
    for (let i = 1; i <= 8; i++) {
        const aboveOrBelowStart = i > 2 && i < 7 ?  -1 : 1
        const leftOfStartOrRight = i % 2 == 0 ? 2 * (i > 4 ?  -1 : 1) : 1 * (i > 4 ?  -1 : 1)
        const rowDiffrenceOneOrTwo = i % 2 == 0 ? 8 : 16
        relativeSquares.push(startingPosition + aboveOrBelowStart * (leftOfStartOrRight + rowDiffrenceOneOrTwo))
    }

    return relativeSquares.filter(node =>  !(node >= 64 || node <= 0  || Math.abs(((startingPosition % 8) || 8) - ((node % 8) || 8)) >= 3))
}

const knightChessboardGraph = () => {
    const adjacencyList = []

    for (let i = 0; i < 64; i++) {
        adjacencyList.push(adjacentsOfSquare(i))
    }

    return adjacencyList
}



function knightMoves(knightPosition, destination){
    
}

console.log(knightMoves(1,18))