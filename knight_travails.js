function adjacentsOfSquare(startingPosition){
    const relativeSquares = []
    for (let i = 1; i <= 8; i++) {
        const aboveOrBelowStart = i > 2 && i < 7 ?  -1 : 1
        const leftOfStartOrRight = i % 2 == 0 ? 2 * (i > 4 ?  -1 : 1) : 1 * (i > 4 ?  -1 : 1)
        const rowDiffrenceOneOrTwo = i % 2 == 0 ? 8 : 16
        relativeSquares.push(knightTemplate(startingPosition + aboveOrBelowStart * (leftOfStartOrRight + rowDiffrenceOneOrTwo)))
    }

    return [knightTemplate(startingPosition) ,relativeSquares.filter(node =>  !(node.pos > 64 || node.pos <= 0  || Math.abs(((startingPosition % 8) || 8) - ((node.pos % 8) || 8)) >= 3))]
}

const knightChessboardGraph = () => {
    const adjacencyList = []

    for (let i = 1; i <= 64; i++) {
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

const knightTemplate = (pos) => {
    return {
        pos,
        history:[],
        getPrevMoves(){
            return this.history
        },
        addMoveToHistory(move){
            this.history.push(move)
        }
    }
}



function getKnightMoves(knightPosition, destination){
    if(knightPosition == destination) return [knightPosition]
    const movesList = queue()
    const knightAdjacencyBoard = knightChessboardGraph()

    const rootKnight = knightTemplate(knightPosition)
    movesList.enqueue(rootKnight)

    const visitedSquares = new Set()
    visitedSquares.add(rootKnight.pos)

    while(!movesList.isEmpty()){
        const moves = knightAdjacencyBoard[movesList.queueList[0].pos - 1][1]
        for (let i = 0; i < moves.length; i++) {
            const moveInfo = knightAdjacencyBoard[movesList.queueList[0].pos - 1]
            const moveKnight = moveInfo[0]

            let move = knightAdjacencyBoard[moveKnight.pos - 1]
            const moveChild = knightAdjacencyBoard[moves[i].pos - 1][0]

            if(visitedSquares.has(moveChild.pos)) continue

            moveChild.addMoveToHistory(move[0])

            movesList.enqueue(moveChild)
            visitedSquares.add(moveChild.pos)
            if(moveChild.pos == destination){
                const history = []
                let move = moveChild
                while(move != undefined){
                    history.unshift(move.pos)
                    move = move.history[0]
                }

                return history
            }
        }
        movesList.dequeue()
    }
}

const h = getKnightMoves(64,64)
console.log(h)
