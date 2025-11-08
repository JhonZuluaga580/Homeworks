import Node from './Node';

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Método para insertar un valor
  insert(value) {
    const newNode = new Node(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      // Insertar a la izquierda
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      // Insertar a la derecha
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
    // Si es igual, no se inserta (no duplicados)
  }

  // RECORRIDO PREORDER: N-L-R (Nodo, Izquierda, Derecha)
  preOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // RECORRIDO INORDER: L-N-R (Izquierda, Nodo, Derecha)
  inOrder(node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // RECORRIDO POSTORDER: L-R-N (Izquierda, Derecha, Nodo)
  postOrder(node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Función para buscar un valor en el árbol
  search(value, node = this.root) {
    if (node === null) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    if (value < node.value) {
      return this.search(value, node.left);
    } else {
      return this.search(value, node.right);
    }
  }

  // Método para convertir el árbol al formato de react-d3-tree
  toD3Format(node = this.root) {
    if (node === null) return null;

    return {
      name: node.value.toString(),
      children: [
        node.left ? this.toD3Format(node.left) : null,
        node.right ? this.toD3Format(node.right) : null
      ].filter(child => child !== null)
    };
  }
}

export default BinaryTree;