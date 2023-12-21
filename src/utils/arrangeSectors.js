
export const arrangeSectors = (sectors) => {
    const tree = new Map()
    const roots = []
    for (const sector of sectors) {
        const {id, name, parent_id} = sector
        if (!parent_id) {
            roots.push({id, name})
            continue
        } else {
            if (!tree.has(parent_id)) {
                tree.set(parent_id,[] )
            }
            tree.get(parent_id).push({id, name})
        }
    }

    // DFS traversal to arrage the sector
    const dfs = (node) => {
        if (tree.has(node.id)) {
            node.children = tree.get(node.id)
            for (const child of node.children) {
                dfs(child)
            }
        }
    }

    for (const root of roots) {
        dfs(root)
    }
    return roots

}
 
