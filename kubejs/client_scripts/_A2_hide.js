JEIEvents.hideItems(event => {
    //redundant create_sa fueling tanks
    event.hide("create_sa:small_fueling_tank")
    event.hide("create_sa:large_fueling_tank")
    //we've made this redundant
    event.hide("immersive_aircraft:boiler")
    //these too
    event.hide("create_sa:heat_engine")
    event.hide("create_sa:steam_engine")
    event.hide("create_sa:hydraulic_engine")
    //replaced with polished equivalent
    event.hide("create:rose_quartz")
    //tfmg meme stones
    event.hide("tfmg:lignite")
    event.hide(/.*tfmg.*galena.*/)
    event.hide(/.*tfmg.*bauxite.*/)
    //useless entry
    event.hide("nuclearcraft:portal")
    //redundant
    event.hide("nuclearcraft:ethanol_bucket")
    event.hide("nuclearcraft:redstone_ethanol_bucket")
    //duplicate
    event.hide("jaopca:storage_blocks.sodium_chloride")
	//we redstone now
	event.hide("thermal:cinnabar_dust")
	//no recipes
	event.hide("createdeco:netherite_sheet")
})

JEIEvents.hideFluids(event => {
    //redundant
    event.hide("nuclearcraft:ethanol")
    event.hide("nuclearcraft:redstone_ethanol")
})

JEIEvents.addItems(event => {
	event.add("ae2:ender_dust")//no idea why this is needed
})