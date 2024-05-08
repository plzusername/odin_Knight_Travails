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

const queue = () =>{
    return {
        queueList : [],
        isEmpty(){
            return this.queueList.length == 0
        },
        enqueue(item){
            this.queueList.push(item)
        },
        dequeue(item){
            this.queueList.shift(item)
        }

    }
}



function knightMoves(knightPosition, destination){
    if(knightPosition == destination) return 0

    const movesList = [knightPosition]
    const knightAdjacencyBoard = knightChessboardGraph()
    let count = 0

    while(movesList.length != 0){
        for (let i = 0; i < knightAdjacencyBoard[movesList[0]].length; i++) {
            movesList.push(knightAdjacencyBoard[movesList[0]][i])

            if(knightAdjacencyBoard[movesList[0]][i] == destination){
                return count || 1
            }
        }
        movesList.shift()
        count++

    }
}

console.log(knightMoves(1,2))