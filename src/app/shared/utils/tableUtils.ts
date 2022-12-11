import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TableUtils {
  collapse(array: any[], data: any, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: any, expendedKeys?): any[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};

    if (expendedKeys != undefined) {
      stack.push({ ...root, level: 0, expand: expendedKeys.some(a => a === root.id) });

    } else {
      stack.push({ ...root, level: 0, expand: false });
    }

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          if (expendedKeys != undefined) {
            stack.push({
              ...node.children[i],
              level: node.level! + 1,
              expand: expendedKeys.some(a => a === node.children[i].id),
              parent: node,
            });
          } else {
            stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
          }
        }
      }
    }

    return array;
  }

  visitNode(node: any, hashMap: { [key: string]: boolean }, array: any[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  arrToExpandedData(listOfMapData, expendedKeys?) {
    const mapOfExpandedData = [];
    listOfMapData.forEach(item => {
      mapOfExpandedData[item.id + ''] = this.convertTreeToList(item, expendedKeys);
    });

    return mapOfExpandedData;
  }
}
