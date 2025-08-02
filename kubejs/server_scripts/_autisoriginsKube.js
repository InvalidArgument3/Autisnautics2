////Alchemist potion duping
var allocatedPotion = Item.of("minecraft:potion", 1)//default value should never appear

const saveAllocatedPotion = function (event, potion) {
    let potionCopy = potion.copy()
    let data = potionCopy.getNbt()
    data.putBoolean("alchemicalAllocated", true)
    potionCopy.setNbt(data)
    allocatedPotion = potionCopy
    //event.player.tell(Text.green(`allocatedPotion saved: ` + allocatedPotion.getId().toString() + `, nbt: ` + allocatedPotion.nbt.toString()))
}

//run by autisorigins:alchemical_allocation/allocatestart
ServerEvents.customCommand('allocate_get', event => {
    let jsMainItem = Item.of(event.player.getMainHandItem())
    let jsOffItem = Item.of(event.player.getOffhandItem())
    
    if (jsMainItem.getId() == "minecraft:potion") {
        saveAllocatedPotion(event, jsMainItem)
    }
    else if (jsOffItem.getId() == "minecraft:potion") {
        saveAllocatedPotion(event, jsOffItem)
    }
})


//run by autisorigins:alchemical_allocation/allocatefinish
ServerEvents.customCommand('allocate_give', event => {
    function callback (e) {
    	event.server.scheduleInTicks(1, callback => {//if we don't delay this it deletes the original potion instead of the bottle
            let oldVial = e.player.inventory.getSelected()
            oldVial.shrink(1)
            e.player.give(allocatedPotion)
    	})
    }
    callback(event)
})