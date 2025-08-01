ServerEvents.recipes(event => {
    ////create stuff & additions wrangling
    //replace create_sa clown mechanisms with a&b mechanisms
    event.replaceInput({}, "create_sa:heat_engine", "kubejs:infernal_mechanism")//flamethrower and grapplin whisk
    event.replaceInput({}, "create_sa:hydraulic_engine", "kubejs:sealed_mechanism")
    event.replaceInput({}, "create_sa:steam_engine", "create:precision_mechanism")
    //redundant create_sa fuel tanks
    event.remove({ output: "create_sa:small_fueling_tank" })
    event.remove({ output: "create_sa:large_fueling_tank" })
    //make create_sa andesite exoskeleton andesite tier
    event.remove({ output: "create_sa:andesite_exoskeleton_chestplate" })
    event.shaped("create_sa:andesite_exoskeleton_chestplate", [
        "SBS",
        "AKA",
        "ZAZ"
    ], {
        A: "create:andesite_alloy",
        B: "create:belt_connector",
        S: "create:shaft",
        K: "kubejs:kinetic_mechanism",
        Z: "create:zinc_block"
    })
    
    ////sturdy sheet replacements
    event.remove({ output: "create_sa:medium_fueling_tank" })
    event.shaped("create_sa:medium_fueling_tank", [
        " P ",
        "PTP",
        " P "
    ], {
        T: "create:fluid_tank",
        P: "create:iron_sheet"
    })
    event.replaceInput({ output: "vs_clockwork:wing" }, "create:sturdy_sheet", "create:golden_sheet")
    event.replaceInput({ output: "railways:fuel_tank" }, "create:sturdy_sheet", "create:golden_sheet")
    event.replaceInput({ output: "create_sa:flamethrower" }, "create:sturdy_sheet", "minecraft:netherite_ingot")
    event.remove({ output: "immersive_aircraft:nether_engine" })
    event.remove({ output: "immersive_aircraft:eco_engine" })
    zincMachine(event, Item.of("immersive_aircraft:nether_engine", 1), "immersive_aircraft:engine")
    leadMachine(event, Item.of("immersive_aircraft:eco_engine", 1), "immersive_aircraft:engine")
    
    ////aircraft/jetpack tiers
    //andesite: gyrodyne, andesite jetpack
    event.replaceInput({ output: "immersive_aircraft:gyrodyne" }, "create:precision_mechanism", "kubejs:kinetic_mechanism")
    event.remove({ output: "create_sa:andesite_jetpack_chestplate" })
    event.shaped("create_sa:andesite_jetpack_chestplate", [
        "CBC",
        "AKA",
        "FAF"
    ], {
        A: "create:andesite_alloy",
        B: "create:belt_connector",
        C: "create:cogwheel",
        K: "kubejs:kinetic_mechanism",
        F: "create:encased_fan"
    })
    //copper: copper jetpack - mechanism already replaced
    //gold: airships, quadrocopter, VS clockwork
    event.remove({ output: "vs_clockwork:physics_infuser" })
    goldMachine(event, Item.of("vs_clockwork:physics_infuser", 1), "vs_clockwork:wanderlite_matrix")
    event.replaceInput({ output: "immersive_aircraft:quadrocopter" }, "immersive_aircraft:boiler", "kubejs:gold_machine")
    event.remove({ output: "immersive_aircraft:airship" })
    event.shaped("immersive_aircraft:airship", [
        "SSS",
        "R R",
        "HGP"
    ], {
        S: "immersive_aircraft:sail",
        R: "vs_sails:rope",
        P: "create:propeller",
        H: "immersive_aircraft:hull",
        G: "kubejs:gold_machine"
    })
    
    //brass: engine, warship, planes, brass jetpack
    event.remove({ output: "immersive_aircraft:engine" })
    brassMachine(event, Item.of("immersive_aircraft:engine", 1), "minecraft:blast_furnace")
    
})