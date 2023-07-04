import { workOnRoot } from './work';

function createUpdate() {
    const update = {
        tag: 'updateState',
        payload: null,
        callback: null,
        next: null
    };
    update.next = update;
    return update
}

function equeueUpdate(fiber, update){
    let updateQueue = fiber.updateQueue
    if(!updateQueue){
        return
    }
    let shared = updateQueue.shared;
    let pending = shared.pending;
    if(pending === null){
        shared.pending = update
    } else {
        shared.pending.next = update;
        pending.next = update
    }
    shared.pending = update
}

export function updateContainer(element, fiberRootNode, callback) {
    let rootFiber = fiberRootNode.current
    const update = createUpdate();
    update.payload = {
        element,
        callback: callback || null
    }
    equeueUpdate(rootFiber, update)
    workOnRoot(rootFiber)
}


