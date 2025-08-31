//Wasteland portal
let frameBlock = "kubejs:lead_casing"
let rodBlock = "alexscaves:uranium_rod"

BlockEvents.placed(event => {
    let placedBlock = event.getBlock()
    if (placedBlock.getId() == "supplementaries:globe_sepia") {
        let nuclearBomb = placedBlock.getDown()
        let frameCount = 0
        let rodCount = 0
        
        if (nuclearBomb.getId() == "alexscaves:nuclear_bomb") {
            let donutBlocks = [nuclearBomb.getNorth(), nuclearBomb.getSouth(), nuclearBomb.getEast(), nuclearBomb.getWest(), nuclearBomb.getNorth().getEast(), nuclearBomb.getNorth().getWest(), nuclearBomb.getSouth().getEast(), nuclearBomb.getSouth().getWest()]
            donutBlocks.forEach(b => {
                if (b.getId() == frameBlock) {
                    frameCount++
                }
            })
        }
        
        if (frameCount == 8) {
            let rodBlocks = [placedBlock.getNorth().getWest(), placedBlock.getNorth().getEast(), placedBlock.getSouth().getWest(), placedBlock.getSouth().getEast()]
            rodBlocks.forEach(b => {
                if (b.getId() == rodBlock) {
                    rodCount++
                }
            })
        }
        
        if (rodCount == 4) {
            if (event.getEntity()) {
                let worldEnder = event.getEntity()
                let server = event.getLevel().getServer()
                server.runCommandSilent(`/particle alexscaves:mushroom_cloud ${placedBlock.getX()} ${placedBlock.getY()} ${placedBlock.getZ()}`)
                server.runCommandSilent(`/execute at ${worldEnder.stringUUID} run playsound nuclearcraft:geiger_6 master @a ~ ~ ~ 1 1`)
                server.scheduleInTicks(150, callback => {
                    server.runCommandSilent(`/execute at ${worldEnder.stringUUID} run playsound nuclearcraft:geiger_5 master @a ~ ~ ~ 1 1`)
                })
                server.scheduleInTicks(300, callback => {
                    server.runCommandSilent(`/execute at ${worldEnder.stringUUID} run playsound nuclearcraft:geiger_3 master @a ~ ~ ~ 1 1`)
                })
                server.scheduleInTicks(340, callback => {
                    server.runCommandSilent(`/execute at ${worldEnder.stringUUID} run playsound nuclearcraft:music.end_of_the_world master @a ~ ~ ~ 1 1`)
                })
            }
            placedBlock.set("minecraft:air")
            nuclearBomb.set("nuclearcraft:portal")
        }
    }
})