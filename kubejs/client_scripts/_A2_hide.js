const hiddenNCMetals = ["platinum", "tin", "zinc", "bronze", "silver", "uranium", "steel", "cobalt", "aluminum", "electrum", "lead"]
const hiddenEmbersMetals = ["iron", "zinc", "lead", "copper", "nickel", "gold", "tin", "aluminum", "boron", "calorite", "cobalt", "desh", "lithium", "magnesium", "ostrum", "platinum", "silver", "thorium", "anthralite", "uranium", "bronze", "electrum", "constantan", "invar", "brass"]

JEIEvents.hideItems(event => {
    // redundant create_sa fueling tanks
    // event.hide("create_sa:small_fueling_tank")
    // event.hide("create_sa:large_fueling_tank")
    // we've made this redundant
    event.hide("immersive_aircraft:boiler")
    // these too
    // event.hide("create_sa:heat_engine")
    // event.hide("create_sa:steam_engine")
    // event.hide("create_sa:hydraulic_engine")
    // replaced with polished equivalent
    event.hide("create:rose_quartz")
    // tfmg meme stones
    // event.hide("tfmg:lignite")
    // event.hide(/.*tfmg.*galena.*/)
    // event.hide(/.*tfmg.*bauxite.*/)
    // useless entry
    event.hide("nuclearcraft:portal")
    // redundant
    event.hide("nuclearcraft:ethanol_bucket")
    event.hide("nuclearcraft:redstone_ethanol_bucket")
    // duplicate
    event.hide("jaopca:storage_blocks.sodium_chloride")
    // we redstone now
    event.hide("thermal:cinnabar_dust")
    // no recipes
    event.hide("createdeco:netherite_sheet")
    // fluid unification (buckets)
    event.hide(/embers:molten_(?!dawnstone).*/)
    hiddenNCMetals.forEach(metal => { event.hide("nuclearcraft:" + metal + "_bucket") })
    event.hide("createbigcannons:molten_steel_bucket")
    event.hide("createbigcannons:molten_bronze_bucket")
    // event.hide("tfmg:molten_steel_bucket")
    // crimes against humanity
    // event.hide("tfmg:casting_basin")
    // event.hide("tfmg:casting_spout")
    // event.hide("tfmg:block_mold")
    // event.hide("tfmg:ingot_mold")
    // removed
    event.hide("jaopca:create_crushed.netherite_scrap")
    event.hide("jaopca:dusts.netherite_scrap")
    event.hide("jaopca:molten.netherite_scrap")
    event.hide("jaopca:molten.coal")
    // coal coke unification - thermal
    // event.hide("tfmg:coal_coke")
    event.hide("immersiveengineering:coal_coke")
    // creosote unification - IE
    event.hide("thermal:creosote_bucket")
    // event.hide("tfmg:creosote_bucket")

    // removed in favor of powergrid
    event.hide("createaddition:electric_motor")
    event.hide("createaddition:alternator")
    
    // pointless clone of basalt
    event.hide(/chisel:diabase.*/)
})

JEIEvents.hideFluids(event => {
    // redundant
    event.hide("nuclearcraft:ethanol")
    event.hide("nuclearcraft:redstone_ethanol")
    // metal fluid unification
    hiddenEmbersMetals.forEach(metal => { event.hide("embers:molten_" + metal) })
    hiddenNCMetals.forEach(metal => { event.hide("nuclearcraft:" + metal) })
    event.hide("createbigcannons:molten_steel")
    event.hide("createbigcannons:molten_bronze")
    // event.hide("tfmg:molten_steel")
    // coal dupe
    event.hide("jaopca:molten.coal")
    // creosote unification - IE
    event.hide("thermal:creosote")
    // event.hide("tfmg:creosote")
})

JEIEvents.addItems(event => {
    event.add("ae2:ender_dust")// no idea why this is needed
})
