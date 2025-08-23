ServerEvents.lowPriorityData(event => {
    // removeFeature(event, "minecraft:ore_redstone")
    // removeFeature(event, "minecraft:ore_redstone_lower")

    // removeFeature(event, "occultism:ore_silver")
    // removeFeature(event, "occultism:ore_silver_deepslate")
    // removeFeature(event, "occultism:ore_silver_deepslate")
    /*A2: comment out CABIN oregen for now
    // It's possible to disable these in the config, but using configs for oregen is outdated and the way Thermal addons' oregens work are very strange
    removeFeature(event, "thermal:tin_ore")
    removeFeature(event, "thermal:silver_ore")

    addOregenOverworld(event, "kubejs:ore_ruby", "thermal:ruby_ore", "minecraft:trapezoid", -144, 16, 4, 6, 0.5, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_sapphire", "thermal:sapphire_ore", "minecraft:trapezoid", -144, 16, 4, 6, 0.5, "#minecraft:is_overworld")

    // The defaults for these 2 aren't what we want.
    // We need Extra Cinnabar to turn into Redstone and Apatite doesn't even generate without Thermal Cultivation.
    removeFeature(event, "thermal:apatite_ore")
    removeFeature(event, "thermal:cinnabar_ore")

    addOregenOverworld(event, "kubejs:ore_apatite", "thermal:apatite_ore", "minecraft:trapezoid", -16, 96, 3, 9, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_cinnabar", "thermal:cinnabar_ore", "minecraft:trapezoid", -16, 48, 3, 6, 0, "#minecraft:is_overworld")
    */
    
    ////A2: remove all ore features
    let oreFeaturesArray = ["create:zinc_ore", "embers:ore_lead", "embers:ore_silver", "galosphere:ore_silver_large", "galosphere:ore_silver_small", "minecraft:ore_coal", "minecraft:ore_coal_buried", "minecraft:ore_copper_large", "minecraft:ore_copper_small", "minecraft:ore_diamond_buried", "minecraft:ore_diamond_large", "minecraft:ore_diamond_medium", "minecraft:ore_diamond_small", "minecraft:ore_emerald", "minecraft:ore_gold", "minecraft:ore_gold_buried", "minecraft:ore_iron", "minecraft:ore_iron_small", "minecraft:ore_lapis", "minecraft:ore_lapis_buried", "minecraft:ore_redstone", "mna:overworld_vinteum_ore", "nuclearcraft:boron_ore", "nuclearcraft:cobalt_ore", "nuclearcraft:lead_ore", "nuclearcraft:lithium_ore", "nuclearcraft:magnesium_ore", "nuclearcraft:platinum_ore", "nuclearcraft:silver_ore", "nuclearcraft:thorium_ore", "nuclearcraft:tin_ore", "nuclearcraft:uranium_ore", "nuclearcraft:zinc_ore", "projectred_exploration:electrotine_ore", "projectred_exploration:peridot_ore", "projectred_exploration:ruby_ore", "projectred_exploration:sapphire_ore", "projectred_exploration:silver_ore", "projectred_exploration:tin_ore", "regions_unexplored:ore_redstone_large", "scguns:anthralite_ore", "scguns:sulfur_ore", "tfmg:lead_ore", "tfmg:lithium_ore", "tfmg:nickel_ore", "thermal:apatite_ore", "thermal:cinnabar_ore", "thermal:lead_ore", "thermal:nickel_ore", "thermal:niter_ore", "thermal:silver_ore", "thermal:sulfur_ore", "thermal:tin_ore", "theurgy:sal_ammoniac_ore", "vs_clockwork:ore_wanderlite", "scguns:phosphorite", "immersiveengineering:bauxite"]
    
    oreFeaturesArray.forEach(oreFeature => {
        removeFeature(event, oreFeature)
    })
    ////Custom Ore Features
    //addOreGenOverworld(event, featureName, blockName, heightType, heightMin, heightMax, veinCount, veinSize, discardChanceOnAirExposure, biomeTag)
    //                                                                                    max:256    max:64
    //aluminum
    ////tfmg:bauxite > aluminum
    //anthralite
    //apatite
    //boron
    //cinnabar
    //coal
    addOregenOverworld(event, "kubejs:ore_coal_islands", "minecraft:coal_ore", "minecraft:uniform", 92, 400, 15, 18, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_coal_islands_big", "minecraft:coal_ore", "minecraft:uniform", 92, 400, 0.05, 64, 0, "#minecraft:is_overworld")
    ////tfmg:lignite > coal
    addOregenOverworld(event, "kubejs:ore_coal_islands_swamp_lignite", "minecraft:coal_ore", "minecraft:uniform", 92, 400, 4, 36, 0.5, "#forge:is_swamp")
    addOregenOverworld(event, "kubejs:ore_coal_islands_swamp_lignite_big", "minecraft:coal_ore", "minecraft:uniform", 92, 400, 0.5, 52, 0.5, "#forge:is_swamp")
    //copper
    addOregenOverworld(event, "kubejs:ore_copper_islands_bottom", "minecraft:copper_ore", "minecraft:trapezoid", 80, 144, 16, 10, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_copper_islands_bottom_big", "minecraft:copper_ore", "minecraft:trapezoid", 80, 144, 0.005, 64, 0, "#minecraft:is_overworld")
    //diamond
    addOregenOverworld(event, "kubejs:ore_diamond_underground_small", "minecraft:diamond_ore", "minecraft:trapezoid", -144, 16, 7, 4, 0.5, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_diamond_underground_buried", "minecraft:diamond_ore", "minecraft:trapezoid", -144, 16, 4, 8, 1, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_diamond_underground_big", "minecraft:diamond_ore", "minecraft:trapezoid", -144, 16, 0.11, 12, 0.7, "#minecraft:is_overworld")
    //electrotine
    addOregenOverworld(event, "kubejs:ore_electrotine_underground_magnetic", "projectred_exploration:electrotine_ore", "minecraft:trapezoid", -168, 40, 0.25, 32, 0, "alexscaves:magnetic_caves")
    //emerald
    addOregenOverworld(event, "kubejs:ore_emerald_islands_5_mountains", "minecraft:emerald_ore", "minecraft:trapezoid", 272, 500, 10, 4, 0, "#forge:is_mountain")
    addOregenOverworld(event, "kubejs:ore_emerald_islands_peaks", "minecraft:emerald_ore", "minecraft:trapezoid", 100, 700, 30, 4, 0, "terralith:emerald_peaks")
    //gold
    addOregenOverworld(event, "kubejs:ore_gold_islands_alluvial", "minecraft:gold_ore", "minecraft:uniform", 92, 400, 100, 3, 0, "#minecraft:is_river")
    addOregenOverworld(event, "kubejs:ore_gold_islands_alluvial_warm", "minecraft:gold_ore", "minecraft:uniform", 92, 400, 200, 3, 0, ["terralith:warm_river","regions_unexplored:tropical_river"])
    addOregenOverworld(event, "kubejs:ore_gold_islands_badlands", "minecraft:gold_ore", "minecraft:uniform", 92, 400, 25, 10, 0, "#minecraft:is_badlands")
    addOregenOverworld(event, "kubejs:ore_gold_underground_alluvial_delta", "minecraft:gold_ore", "minecraft:uniform", -64, 40, 25, 3, 0, "regions_unexplored:ancient_delta")
    //iron
    addOregenOverworld(event, "kubejs:ore_iron_islands", "minecraft:iron_ore", "minecraft:uniform", 92, 400, 10, 9, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_iron_islands_big", "minecraft:iron_ore", "minecraft:uniform", 92, 400, 0.005, 64, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_iron_underground", "minecraft:iron_ore", "minecraft:uniform", -24, 56, 20, 9, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_iron_underground_big", "minecraft:iron_ore", "minecraft:uniform", -48, 56, 0.01, 64, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_iron_underground_magnetite", "minecraft:iron_ore", "minecraft:uniform", -64, 56, 10, 9, 0, "alexscaves:magnetic_caves")
    //lapis
    addOregenOverworld(event, "kubejs:ore_lapis_islands_mystical", "minecraft:lapis_ore", "minecraft:uniform", 92, 400, 6, 10, 0, "#terralith:mystical")
    addOregenOverworld(event, "kubejs:ore_lapis_islands_mystical_big", "minecraft:lapis_ore", "minecraft:uniform", 92, 400, 0.05, 64, 0, "#terralith:mystical")
    //lead
    addOregenOverworld(event, "kubejs:ore_lead_underground", "thermal:lead_ore", "minecraft:trapezoid", -60, 40, 6, 8, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_lead_underground_big", "thermal:lead_ore", "minecraft:trapezoid", -20, 0, 0.0033, 64, 0, "#minecraft:is_overworld")
    ////tfmg:galena > lead
    //lithium
    //magnesium
    //nickel
    addOregenOverworld(event, "kubejs:ore_nickel_underground", "thermal:nickel_ore", "minecraft:trapezoid", -40, 40, 4, 8, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_nickel_underground_big", "thermal:nickel_ore", "minecraft:trapezoid", -40, 40, 0.002, 64, 0, "#minecraft:is_overworld")
    //niter
    //peridot
    addOregenOverworld(event, "kubejs:ore_peridot_underground_olivine", "projectred_exploration:peridot_ore", "minecraft:uniform", -64, -57, 5, 4, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_peridot_underground_olivine_mantle", "projectred_exploration:peridot_ore", "minecraft:trapezoid", -158, 30, 5, 4, 0, "terralith:mantle_caves")
    addOregenOverworld(event, "kubejs:ore_peridot_islands_olivine_volcanic", "projectred_exploration:peridot_ore", "minecraft:uniform", 92, 400, 5, 4, 0, "#minecraft:is_overworld")
    //phosphorite
    addOregenOverworld(event, "kubejs:ore_phosphorite_underground_big", "scguns:phosphorite", "minecraft:uniform", 0, 36, 0.01, 64, 0, "#minecraft:is_overworld")
    //rich_phosphorite - original feature not disabled because it only spawns inside phosphorite, which we want
    addOregenOverworld(event, "kubejs:ore_rich_phosphorite_guano", "scguns:rich_phosphorite", "minecraft:uniform", 62, 85, 40, 12, 0, ["regions_unexplored:rocky_reef", "regions_unexplored:tropics"])
    //platinum
    //redstone
    //ruby
    addOregenOverworld(event, "kubejs:ore_ruby_islands_hot", "thermal:ruby_ore", "minecraft:trapezoid", 92, 680, 5, 4, 0, "#forge:is_hot")
    //sal_ammoniac
    //sapphire
    addOregenOverworld(event, "kubejs:ore_sapphire_islands_cold", "thermal:sapphire_ore", "minecraft:trapezoid", 92, 680, 5, 4, 0, "#forge:is_cold")
    //silver
    addOregenOverworld(event, "kubejs:ore_silver_islands_alluvial", "thermal:silver_ore", "minecraft:uniform", 92, 400, 25, 3, 0, "#minecraft:is_river")
    addOregenOverworld(event, "kubejs:ore_silver_islands_alluvial_cold", "thermal:silver_ore", "minecraft:uniform", 92, 400, 200, 3, 0, ["minecraft:frozen_river", "regions_unexplored:cold_river"])
    addOregenOverworld(event, "kubejs:ore_silver_islands_ice", "thermal:silver_ore", "minecraft:trapezoid", 92, 700, 0.05, 6, 0, ["minecraft:ice_spikes", "terralith:glacial_chasm"])
    addOregenOverworld(event, "kubejs:ore_silver_underground_frostfire", "thermal:silver_ore", "minecraft:trapezoid", -168, 40, 0.01, 6, 0, "terralith:cave/frostfire_caves")
    //striated "ores" (stones) from tfmg (galena/lignite/bauxite): cannot be replaced by this method, found between 40-90
    //sulfur
    //thorium
    //tin
    addOregenOverworld(event, "kubejs:ore_tin_islands_mountain", "thermal:tin_ore", "minecraft:uniform", 92, 400, 6, 6, 0, "#minecraft:is_mountain")
    addOregenOverworld(event, "kubejs:ore_tin_islands_alluvial", "thermal:tin_ore", "minecraft:uniform", 92, 400, 256, 3, 0, "#minecraft:is_river")
    addOregenOverworld(event, "kubejs:ore_tin_seabed_alluvial", "thermal:tin_ore", "minecraft:trapezoid", 42, 50, 10, 6, 0.7, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_tin_seabed_alluvial_big", "thermal:tin_ore", "minecraft:trapezoid", 42, 50, 0.005, 64, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_tin_seabed_alluvial_deep", "thermal:tin_ore", "minecraft:trapezoid", 32, 42, 10, 6, 0.7, "#minecraft:is_deep_ocean")
    addOregenOverworld(event, "kubejs:ore_tin_seabed_alluvial_big_deep", "thermal:tin_ore", "minecraft:trapezoid", 32, 42, 0.005, 64, 0, "#minecraft:is_overworld")
    //uranium
    //vinteum
    //wanderlite
    //zinc
    addOregenOverworld(event, "kubejs:ore_zinc_islands_5", "create:zinc_ore", "minecraft:trapezoid", 272, 400, 8, 12, 0, "#minecraft:is_overworld")
    addOregenOverworld(event, "kubejs:ore_zinc_islands_4", "create:zinc_ore", "minecraft:trapezoid", 224, 352, 2, 12, 0, "#minecraft:is_overworld")

})
