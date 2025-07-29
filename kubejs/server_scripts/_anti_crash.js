////hooking create_sa:grapplin_whisk to/from shipyard coordinates
const unHookWhisk = function (event, whisk) {
    let newStack = whisk.copy()
    let data = newStack.nbt
    data.tagHooked = false
    newStack.setNbt(data)
    
    event.player.drop(newStack, true, true)
    whisk.setCount(0)
    event.player.tell(Text.red(`Your Grapplin Whisk is repulsed by the ship's Gellar Field and falls out of your hand.`))
}

//prevent hooking the shipyard
ItemEvents.firstRightClicked(event => {
    let jsItem = Item.of(event.item)
    
    let targetX = event.player.rayTrace(255).block.getX()//no need to check further than whisk range but I dunno what it is
    if (jsItem.getId() == "create_sa:grapplin_whisk") {
        if ( Math.abs(targetX) > 1000000 ) {
            unHookWhisk(event, jsItem)
        }
    }
})


//unhooking create_sa:grapplin_whisk for a player that crashed out
PlayerEvents.loggedIn(event => {
    let jsMainItem = Item.of(event.player.getMainHandItem())
    let jsOffItem = Item.of(event.player.getOffhandItem())
    
    if (jsMainItem.getId() == "create_sa:grapplin_whisk") {
        let origData = jsMainItem.nbt
        if (origData.tagHooked == true && origData.xPostion) {
            if (Math.abs(origData.xPostion) > 1000000) {
                unHookWhisk(event, jsMainItem)
            }
        }
    }
    if (jsOffItem.getId() == "create_sa:grapplin_whisk") {
        let origData = jsOffItem.nbt
        if (origData.tagHooked == true && origData.xPostion) {
            if (Math.abs(origData.xPostion) > 1000000) {
                unHookWhisk(event, jsOffItem)
            }
        }
    }
})