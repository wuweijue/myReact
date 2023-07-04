import { updateContainer } from '../renconciler/update'

export let fiberRootNode; // 整个应用的根节点

function isValidContainer(container) {
    return typeof container == 'object' && container instanceof HTMLElement && document.body.contains(container)
}

class fiberRoot {
    constructor(props) {
        this.stateNode = props
    }
    alternate
    child
    ref
    return
    sibling
    stateNode
    type
    key
    tag = 'hostRoot'
    effectTag
    elementType
    memoizedProps
    memoizedState
    firstEffect
    lastEffect
    nextEffect
    updateQueue = {
        shared: {
            pending: null
        }
    }
}

function createFiberRoot(container) {
    if (container.lastChild) { // 如果容器有子节点，则移除
        container.remove()
    }
    const root = {
        current: null,
    }
    root.container = new fiberRoot(root);
    return root
}

export function render(element, container, callback) {
    if (!isValidContainer(container)) {
        throw new Error('Target container is not a DOM element')
    }
    let root = container.reactRootContainer;
    if (!root) {
        fiberRootNode = root = createFiberRoot(container);
    }
    if (typeof callback == 'function') {
        const containerUpdateCallback = () => {
            callback.call(root.current.child)
        }
        updateContainer(element, fiberRootNode, containerUpdateCallback)
    } else {
        updateContainer(element, fiberRootNode)
    }
}

