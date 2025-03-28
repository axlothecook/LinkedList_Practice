// Linked List practice

// class that creates a node instance
class Node {
    constructor(value, next = null, previous = null){
        this.previous = previous;
        this.value = value;
        this.next = next;
    }
}

// class that creates a linked list
class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
    }
}

// linked list manager | factory funciton
const LinkedListManager = (function(){
    var linkedList =  new LinkedList();

    // append node at the end of the list
    const append = (value) => {
        const node = new Node(value);

        if(linkedList.tail) {
            var formerTail = linkedList.tail;
            formerTail.previous = linkedList.tail.previous;
            linkedList.tail = node;
            linkedList.tail.previous = formerTail;
            formerTail.next = linkedList.tail;
        } else {
            linkedList.tail = node;
            linkedList.head.next = linkedList.tail;
            linkedList.tail.previous = linkedList.head;
        };
    }

    // append node at the beginning of the list
    const prepend = (value) => {
        const node = new Node(value);
        if(linkedList.head) {
            var formerHead = linkedList.head;
            formerHead.next = linkedList.head.next;
            linkedList.head = node;
            linkedList.head.next = formerHead;
            formerHead.previous = linkedList.head;
        } else linkedList.head = node;
    }

    // return the total number of nodes in the list
    const size = (counter = 1, current = linkedList.head) => {
        if(!current) return counter = 0;
        if(current === linkedList.tail) return counter;

        if(current) {
            current = current.next;
            counter += size(counter, current);
        };

        return counter;
    }

    // return the first node
    const head = () => { return linkedList.head; }

    // return the last node
    const tail = () => { return linkedList.tail; }

    // return the node at the given index
    const at = (index) => {
        var counter = 0;
        var search = linkedList.head;
        while(search && (counter < index)) {
            search = search.next;
            counter++;
        };
        if(!search) return undefined;
        return search;
    }

    // remove the last list element
    const pop = () => {
        linkedList.tail = linkedList.tail.previous;
        linkedList.tail.next = null;
    }

    // returns true if the passed in value is in the list, otherwise returns false
    const contains = (value) => {
        var search = linkedList.head;
        while(search && (value !== search.value)) {
            search = search.next;
        };
        return (search) ? true : false;
    }

    // returns the index of the node containing value, or null if not found
    const find = (value) => {
        var search = linkedList.head;
        var counter = 0;
        while(search && (value !== search.value)) {
            search = search.next;
            counter++;
        };
        return (search) ? counter : null;
    }

    // inserts a new node with the provided value at the given index
    // has hande cases if index is of first or last node in the list
    // returns error message if index doesn't exist
    const insertAt = (value, index) => {
        var currentNode = at(index);
        if(!currentNode) return 'Invalid index';
        if(currentNode === linkedList.head) return prepend(value);
        if(currentNode === linkedList.tail) return append(value);
        var node = new Node(value);
        var currentNodePrevious = currentNode.previous;

        currentNodePrevious.next = node;
        currentNode.previous = node;
        node.previous = currentNodePrevious;
        node.next = currentNode;
    }

    // removes a node with the provided value at the given index
    // has hande cases if index is of first or last node in the list
    // returns error message if index doesn't exist
    const removeAt = (index) => {
        var currentNode = at(index);
        if(!currentNode) return 'Invalid index';
        if(currentNode === linkedList.tail) return pop();
        var currentNodeNext = currentNode.next;
        if(currentNode === linkedList.head) {
            linkedList.head = currentNodeNext;
            linkedList.head.previous = null;
        } else {
            var currentNodePrevious = currentNode.previous;
            currentNodeNext.previous = currentNodePrevious;
            currentNodePrevious.next = currentNodeNext;
        }
    }

    // displays the list in linked list object fashion
    const displayList = () => {
        console.log('list:');
        console.log(linkedList);
    }

    // prints out the list in fashion of its nodes' values
    const toString = () => {
        var item = linkedList.head;
        for(let i = 0; i < size(); i++) {
            console.log(`( ${item.value} ) -> `);
            item = item.next;
        }
        console.log('null');
    }

    return {
        append,
        prepend,
        size,
        head,
        tail,
        at,
        pop,
        contains,
        find,
        insertAt,
        removeAt,
        displayList,
        toString
    }

})();

// testing out all of the functions in the factory
LinkedListManager.prepend('1');
LinkedListManager.append('2');
LinkedListManager.append('3');
LinkedListManager.append('9');
LinkedListManager.prepend('4');
console.log('size: ' + LinkedListManager.size());
LinkedListManager.head();
LinkedListManager.tail();
console.log(LinkedListManager.at(2));
LinkedListManager.pop();
console.log(LinkedListManager.contains('2'));
console.log(LinkedListManager.contains('5'));
console.log(LinkedListManager.find('2'));
console.log(LinkedListManager.find('5'));
LinkedListManager.insertAt('6', 2);
LinkedListManager.insertAt('7', 0);
console.log(LinkedListManager.insertAt('8', 20));
LinkedListManager.removeAt(3);
LinkedListManager.removeAt(0);
console.log(LinkedListManager.removeAt(20));
LinkedListManager.toString();
LinkedListManager.displayList();