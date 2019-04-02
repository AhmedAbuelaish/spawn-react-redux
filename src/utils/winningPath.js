function highlightWinningPath(nodes) {
	// find all nodes with the key 'status' = 'win'
    const nodesByWin = nodes.filter(filterByWin)
    console.log(nodes,nodesByWin)
    // 
    // const nodesById = map through nodesByWin to get the id's
    // const collapsedWinningNodes = reduce the id's to figure out which have shared parents
    // 
    // for each ID, filter through the nodes array, each loop knocking off one digit from the end of the id.


}

function filterByWin(item) {
	if (item.status == 'win') {
		return item.id
	} else {
		return false
	}
}

function filterById(item) {
	if (item.id == 0){}
}


export default highlightWinningPath