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
    
    ////tfmg/IE integration
    //thermal rockwool and IE slag glass conflict: rockwool is now blasting only, slag glass is smelting only
    event.remove({ type: "minecraft:smelting", output: "thermal:white_rockwool"})
    event.remove({ type: "create:fan_blasting", output: "immersiveengineering:slag_glass"})
    
    //conflict with thermal:slag_block: slag brick is now stonecutting only
    event.remove({ type: "minecraft:crafting_shaped", output: "immersiveengineering:slag_brick"})
    
    //get all our slags in one place
    event.replaceInput({}, "thermal:slag", "#forge:slag")
    event.replaceInput({}, "tfmg:slag", "#forge:slag")
    event.replaceInput({}, "immersiveengineering:slag", "#forge:slag")
    event.replaceOutput({}, "thermal:slag", "tfmg:slag")
    event.replaceOutput({}, "immersiveengineering:slag", "tfmg:slag")//IE might still give IE slag
    //isn't almostunified supposed to do this?
    
    event.remove({ output: "immersiveengineering:sawdust"})//sawdust floor conflicts with JAOPCA storage block
    event.shaped("immersiveengineering:sawdust", [
        "   ",
        "   ",
        "SSS"
    ], {
        S: "#forge:dusts/wood"
    })
    
    //unify sawdusts
    event.remove({output: "jaopca:storage_blocks.wood"})
    event.remove({input: "jaopca:storage_blocks.wood"})
    event.replaceInput({}, "thermal:sawdust", "#forge:dusts/wood")
    event.replaceInput({}, "immersiveengineering:dust_wood", "#forge:dusts/wood")
    event.replaceInput({}, "nuclearcraft:sawdust", "#forge:dusts/wood")
    event.replaceOutput({}, "immersiveengineering:dust_wood", "thermal:sawdust")//IE might still give IE sawdust
    event.replaceOutput({}, "nuclearcraft:sawdust", "thermal:sawdust")
    
    //remove vanilla blast furnace -> steel (lol?)
    event.remove({type:"minecraft:blasting", input: "minecraft:iron_ingot"})//done by input in case of steel unification changes
    //chainmail no longer meltable (it gave steel and chainmail can be crafted)
    event.remove({type:"tconstruct:damagable_melting", input: "minecraft:chainmail_helmet"})
    event.remove({type:"tconstruct:damagable_melting", input: "minecraft:chainmail_chestplate"})
    event.remove({type:"tconstruct:damagable_melting", input: "minecraft:chainmail_leggings"})
    event.remove({type:"tconstruct:damagable_melting", input: "minecraft:chainmail_boots"})
    
    
    //Create Addition: disable rotational force/energy conversion because tfmg does it better
    event.remove({output: "createaddition:electric_motor"})
    event.remove({input: "createaddition:electric_motor"})
    event.remove({output: "createaddition:alternator"})
    
    //nuclearcraft: charcoal dust was useless?
    event.replaceOutput({}, "nuclearcraft:charcoal_dust", "nuclearcraft:coal_dust")
    
    //melting every mob in the game shouldn't give liquid soul
    event.remove({type:"tconstruct:entity_melting", output: "#tconstruct:liquid_soul"})
    //might not work, unsure why
    
})