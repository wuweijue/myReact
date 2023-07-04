let workInProgress = null;

function findRoot(fiber){
    let node = fiber.return;
    if(node === null && fiber.tag === 'hostFiber') return fiber
    while(node !== null){
        if(node.return === null && node.tag === 'hostFiber'){
            return node
        }
        node = node.return
    }
}

function workLoop(){
    while(workInProgress !== null){
        workInProgress = workUnit(workInProgress)
    }
}

function workUnit(){
    
}

export function workOnRoot(fiber){
    const root = findRoot(fiber);
    workInProgress = root
    workLoop()
}