
export const arrangeSectors = (sectors) => {
    const tree = new Map()
    const roots = []
    for (const sector of sectors) {
        const { id, name, parent_id } = sector
        if (!parent_id) {
            roots.push({ id, name })
            continue
        } else {
            if (!tree.has(parent_id)) {
                tree.set(parent_id, [])
            }
            tree.get(parent_id).push({ id, name })
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

    // if the sector name is Other, then put it at the end of the list for all the nested children as wel
    const rearrange = (node) => {
        if (node.children) {
            const other = node.children.find(child => child.name.includes('Other'))
            if (other) {
                node.children = node.children.filter(child => !child.name.includes('Other'))
                node.children.push(other)
            }
            for (const child of node.children) {
                rearrange(child)
            }
        }
    }

    for (const root of roots) {
        rearrange(root)
    }
    const other = roots.find(root => root.name.includes('Other'))
    if (other) {
        roots.push(other)
        roots.splice(roots.indexOf(other), 1)
    }
    return roots

}

