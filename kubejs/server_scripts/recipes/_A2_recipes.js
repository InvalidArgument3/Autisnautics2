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
    //re-add blasting mixture recipe as metallurgy.js removes all input:#create:crushed_raw_materials
    event.recipes.create.mixing("tfmg:blasting_mixture", [Item.of("#forge:dusts/iron", 3), "tfmg:limesand"])
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
    
    ////using thermal:device_fisher in place of the water strainer mod
    //use canvas in slot to get sand and/or clay
    event.recipes.thermal.fisher_boost('farmersdelight:canvas', 2, 0.02, 'autisnautics2datapack:gameplay/straining')
    //add a few more sources of straw for canvas
    event.custom({//wheat
        "type": "farmersdelight:cutting",
        "ingredients": [{ "item": "minecraft:wheat" }],
        "result": [
            { "item": "farmersdelight:straw" },
            { "chance": 0.25, "item": "minecraft:wheat_seeds" }
        ],
        "tool": { "tag": "forge:tools/knives" }
    })
    event.custom({//flax
        "type": "farmersdelight:cutting",
        "ingredients": [{ "item": "supplementaries:flax" }],
        "result": [
            { "item": "farmersdelight:straw" },
            { "item": "minecraft:string" }
        ],
        "tool": { "tag": "forge:tools/knives" }
    })
    //modify aquatic entangler recipe so it's easier to get
    event.replaceInput({output: "thermal:device_fisher"}, "thermal:redstone_servo", "minecraft:barrel")
    //make junk net more expensive (it's unbreakable and surprisingly useful)
    event.replaceInput({output: "thermal:junk_net"}, "minecraft:iron_nugget", "#forge:ingots/lead")
    event.replaceInput({output: "thermal:junk_net"}, "minecraft:stick", "rats:garbage_pile")
    
    //tfmg/ie synthetic leathers and strings support
    event.replaceInput({}, "minecraft:leather", "#forge:leathers")
    event.replaceInput({}, "minecraft:string", "#forge:string")
    //fix synethetic leather recipe collision with immersiveengineering:plate_duroplast
    event.remove({output: "tfmg:synthetic_leather"})
    event.recipes.create.deploying("tfmg:synthetic_leather", ["#forge:ingots/plastic", "minecraft:paper"])
    
    //make tome of alkahestry an endgame item
    event.remove({type: "minecraft:crafting_shapeless", input:"reliquary:witch_hat", output:"reliquary:alkahestry_tome"})
    event.recipes.create.mechanical_crafting("reliquary:alkahestry_tome", [
        " HTE ",
        "  A  ",
        "SXADW",
        "PGMRP",
        "OOCOO"
    ],{
        T: "enigmaticlegacy:withered_tome",
        E: "reliquary:eye_of_the_storm",
        G: "kubejs:accelerator_glowstone",
        R: "kubejs:accelerator_redstone",
        M: "kubejs:missingno",
        C: "botania:conjuration_catalyst",
        H: "dungeonnowloading:chaotic_hexahedron",
        O: "minecraft:crying_obsidian",
        P: "embers:alchemy_pedestal",
        X: "enigmaticlegacy:forbidden_axe",
        S: "minecraft:player_head",
        D: "reliquary:phoenix_down",
        A: "reliquary:alkahestry_altar",
        W: "minecraft:wither_skeleton_skull",
        
    })
    
    ////chapter fixes
    //unfuck wood plank cutting
    event.remove({output: "cuisinedelight:plate"})
    event.remove({output: "tfmg:formwork_block"})
    let handrailTypes = ["oak","birch","spruce","jungle","dark_oak","acacia","crimson","warped","mangrove","cherry","bamboo"]
    let removeHandrails = (wood) => {
        let originalHandrail = "youkaishomecoming:" + wood + "_handrail"
        if (Item.exists(originalHandrail)) {
            event.remove({output: originalHandrail})
        }
    }
    handrailTypes.forEach(removeHandrails)
    
    //another step of sawing turns a wooden slab into 8 plates
    event.recipes.create.cutting(Item.of("cuisinedelight:plate", 8), "#minecraft:wooden_slabs").processingTime(150).id(`kubejs:cutting/wooden_slab_to_plates`)
    //formwork blocks are stonecut from hollow logs
    event.stonecutting(Item.of("tfmg:formwork_block", 8), "#quark:hollow_logs")
    //handrails get a shaped recipe
    let addHandrails = (wood) => {
        let resultingHandrail = "youkaishomecoming:" + wood + "_handrail"
        let woodItem = "minecraft:" + wood + "_slab"
        if (Item.exists(resultingHandrail)) {
            event.shaped(Item.of(resultingHandrail, 4), [
                "SSS",
                "T T"
            ], {
            S: woodItem,
            T: "minecraft:stick"
            })
        }
    }
    handrailTypes.forEach(addHandrails)
    
    //replace create big cannons mould recipes which are all the exact same recipe because the modder is a twisted psychopath
    let mouldTypes = ["very_small","small","medium","large","very_large","cannon_end","sliding_breech","screw_breech","autocannon_breech","autocannon_recoil_spring","autocannon_barrel"]
    let removeMould = (type) => {
        let originalMould = "createbigcannons:" + type + "_cast_mould"
        if (Item.exists(originalMould)) {
            event.remove({output: originalMould})
        }
    }
    mouldTypes.forEach(removeMould)
    //all moulds now start from the very large cast mould, by deploying a saw on any log
    event.recipes.create.deploying("createbigcannons:very_large_cast_mould", ["#minecraft:logs", "#kubejs:saws"])
    //smaller moulds are made by sawing the very large mould down smaller and smaller
    event.recipes.create.deploying("createbigcannons:large_cast_mould", ["createbigcannons:very_large_cast_mould", "#kubejs:saws"])
    event.recipes.create.deploying("createbigcannons:medium_cast_mould", ["createbigcannons:large_cast_mould", "#kubejs:saws"])
    event.recipes.create.deploying("createbigcannons:small_cast_mould", ["createbigcannons:medium_cast_mould", "#kubejs:saws"])
    event.recipes.create.deploying("createbigcannons:very_small_cast_mould", ["createbigcannons:small_cast_mould", "#kubejs:saws"])
    event.recipes.create.deploying("createbigcannons:autocannon_breech_cast_mould", ["createbigcannons:very_small_cast_mould", "#kubejs:saws"])
    event.recipes.create.deploying("createbigcannons:autocannon_recoil_spring_cast_mould", ["createbigcannons:autocannon_breech_cast_mould", "#kubejs:saws"])
    event.recipes.create.deploying("createbigcannons:autocannon_barrel_cast_mould", ["createbigcannons:autocannon_recoil_spring_cast_mould", "#kubejs:saws"])
    //the other moulds branch off from the generic ones by chiseling or sawing
    event.recipes.create.deploying("createbigcannons:sliding_breech_cast_mould", ["createbigcannons:large_cast_mould", "#chiselsandbits:chisel"])
    event.recipes.create.deploying("createbigcannons:cannon_end_cast_mould", ["createbigcannons:medium_cast_mould", "#chiselsandbits:chisel"])
    event.recipes.create.deploying("createbigcannons:screw_breech_cast_mould", ["createbigcannons:cannon_end_cast_mould", "#kubejs:saws"])
    
    //might as well fix this createbigcannons shit while i'm at it
    event.remove({id: "createbigcannons/cutting/autocannon_cartridge_sheet_copper"})//duplicate
    event.replaceInput({output: "createbigcannons:spring_wire"}, "#forge:plates/iron", "#forge:plates/lead")//another ingredient+type with multiple outputs
    
    ////Chapter 2B: Lead Machines replacement
    //replacing the chassis with the lead machine
    event.remove({output: "nuclearcraft:chassis"})
    event.replaceInput({output: "nuclearcraft:turbine_casing"}, "nuclearcraft:chassis", "kubejs:lead_casing")//exception
    event.replaceInput({}, "nuclearcraft:chassis", "kubejs:lead_machine")
    //gate manufactory and alloy smelter behind lead machine as well
    event.replaceInput({output: "nuclearcraft:manufactory"}, "minecraft:piston", "kubejs:lead_machine")
    event.replaceInput({output: "nuclearcraft:alloy_smelter"}, "minecraft:blast_furnace", "kubejs:lead_machine")
   
    ////atomic mechanisms
    //Logistic Mechanism and kubejs pulp recipes removed in chapters.js
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": "create:precision_mechanism" },
        "results": [
            { "item": "kubejs:logistic_mechanism" }
        ],
        "loops": 1,
        "sequence": [
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_logistic_mechanism" },
                    { "fluid": "tfmg:molten_steel", "amount": 90 }//can't use tags for fluids
                ],
                "results": [
                    { "item": "kubejs:incomplete_logistic_mechanism" }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_logistic_mechanism" },
                    { "fluid": "tconstruct:molten_uranium", "amount": 10 }
                ],
                "results": [
                    { "item": "kubejs:incomplete_logistic_mechanism" }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_logistic_mechanism" },
                    { "fluid": "tconstruct:molten_lead", "amount": 90 }
                ],
                "results": [
                    { "item": "kubejs:incomplete_logistic_mechanism" }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_logistic_mechanism" },
                    { "fluid": "nuclearcraft:radaway", "amount": 250 }
                ],
                "results": [
                    { "item": "kubejs:incomplete_logistic_mechanism" }
                ]
            }
        ],
        "transitionalItem": { "item": "kubejs:incomplete_logistic_mechanism" }
    }).id("kubejs:logistic_mechanism")
    //Radaway: 3x glowing mushroom and 1 bottle of milk, heated mixing
    event.recipes.create.mixing([Fluid.of("nuclearcraft:radaway", 250)], [Item.of("nuclearcraft:glowing_mushroom", 3), Fluid.of("minecraft:milk", 250)]).heated()
    //original NC recipe: replace Ethanol with Milk
    event.remove({output: Fluid.of("nuclearcraft:radaway")})
    event.remove({output: Fluid.of("nuclearcraft:radaway_slow")})
    //remove NC ethanol while we're at it, other mods do it better
    event.remove({output: Fluid.of("nuclearcraft:ethanol")})
    event.remove({output: Fluid.of("nuclearcraft:redstone_ethanol")})
    event.remove({output: "nuclearcraft:ethanol_bucket"})
    event.remove({output: "nuclearcraft:redstone_ethanol_bucket"})
    
    event.custom({
        "type": "nuclearcraft:fluid_enricher",
        "input": [
            {
            "count": 3,
            "item": "nuclearcraft:glowing_mushroom"
            }
        ],
        "inputFluids": [
            {
            "amount": 250,
            "tag": "kubejs:milk"
            }
        ],
        "outputFluids": [
            {
            "amount": 250,
            "tag": "forge:radaway"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    event.custom({
        "type": "nuclearcraft:fluid_enricher",
        "input": [
            {
            "count": 1,
            "item": "minecraft:redstone"
            }
        ],
        "inputFluids": [
            {
            "amount": 250,
            "tag": "forge:radaway"
            }
        ],
        "outputFluids": [
            {
            "amount": 250,
            "tag": "forge:radaway_slow"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    //synthetic glowing mushroom recipe: 50mb of Potion of Glowing on a brown mushroom
    event.recipes.create.filling("nuclearcraft:glowing_mushroom", ["minecraft:brown_mushroom", Fluid.of("create:potion", 50, '{Potion:"alexscaves:glowing"}')])
    //potion of glowing recipe in startup_scripts
    
    
    ////just one word: PLASTICS
    //tag/integrate nuclearcraft:bioplastic and rats:raw_plastic
    //remove rats:raw_plastic, replace with plastic sheet
    event.remove({output: "rats:raw_plastic"})
    event.replaceInput({}, "rats:raw_plastic", "tfmg:plastic_sheet")
    //loot removal below
    event.remove({input: "rats:plastic_waste"})//just in case?
    
    //converting plastic waste to liquid plastic by "recycling"
    event.recipes.create.mixing([Fluid.of("tfmg:liquid_plastic", 200), "quark:dirty_shard"], [Item.of("rats:plastic_waste", 9), Fluid.of("minecraft:water", 1000)]).heated()
    //glass shard gives em an extra step to process plus it's a glass source I guess
    //alt recipe: nuclearcraft melter, 1 plastic waste -> 25mb liquid plastic (8:1 and no waste product)
    event.custom({
        "type": "nuclearcraft:melter",
        "input": [
            {
            "count": 1,
            "item": "rats:plastic_waste"
            }
        ],
        "outputFluids": [
            {
            "amount": 25,
            "tag": "kubejs:liquid_plastic"//might have to tag this too?
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    event.custom({
        "type": "nuclearcraft:melter",
        "input": [
            {
            "count": 1,
            "tag": "forge:ingots/plastic"
            }
        ],
        "outputFluids": [
            {
            "amount": 200,
            "tag": "kubejs:liquid_plastic"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    //same as above but for "raw plastic" (found as loot only since i couldn't remove it with kube i guess)
    event.recipes.create.mixing([Fluid.of("tfmg:liquid_plastic", 25)], [Item.of("rats:raw_plastic", 1), Fluid.of("minecraft:water", 250)]).heated()
    event.custom({
        "type": "nuclearcraft:melter",
        "input": [
            {
            "count": 1,
            "item": "rats:raw_plastic"
            }
        ],
        "outputFluids": [
            {
            "amount": 25,
            "tag": "kubejs:liquid_plastic"//might have to tag this too?
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    //replace sugarcane for bioplastic with biomass
    event.remove({output: "nuclearcraft:bioplastic"})
    event.custom({
        "type": "nuclearcraft:manufactory",
        "input": [
            {
            "count": 2,
            "item": "createaddition:biomass"
            }
        ],
        "output": [
            {
            "amount": 1,
            "item": "nuclearcraft:bioplastic"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    //oredict the plastics
    event.replaceInput({}, "tfmg:plastic_sheet", "#forge:ingots/plastic")
    event.replaceInput({}, "nuclearcraft:bioplastic", "#forge:ingots/plastic")
    
    //fix broken radaway item recipes
    event.remove({output: Item.of("nuclearcraft:radaway")})
    event.remove({output: Item.of("nuclearcraft:radaway_slow")})
    event.recipes.create.filling("nuclearcraft:radaway", ["#forge:ingots/plastic", Fluid.of("nuclearcraft:radaway", 250)])
    event.recipes.create.filling("nuclearcraft:radaway_slow", ["#forge:ingots/plastic", Fluid.of("nuclearcraft:radaway_slow", 250)])
    event.custom({
        "type": "nuclearcraft:fluid_infuser",
        "inputFluids": [
            {
            "amount": 250,
            "tag": "forge:radaway"
            }
        ],
        "input": [
            {
            "count": 1,
            "tag": "forge:ingots/plastic"
            }
        ],
        "output": [
            {
            "amount": 1,
            "item": "nuclearcraft:radaway"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    event.custom({
        "type": "nuclearcraft:fluid_infuser",
        "inputFluids": [
            {
            "amount": 250,
            "tag": "forge:radaway_slow"
            }
        ],
        "input": [
            {
            "count": 1,
            "tag": "forge:ingots/plastic"
            }
        ],
        "output": [
            {
            "amount": 1,
            "item": "nuclearcraft:radaway_slow"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    
    //remove redundant "rose quartz" for polished rose quartz
    event.replaceOutput({}, "create:rose_quartz", "create:polished_rose_quartz")//jaopca only
    event.replaceInput({}, "create:rose_quartz", "create:polished_rose_quartz")//jaopca, cosmetic stonecutting block, rock candy
    
    //remove bugged melting recipe for "raw tungsten" which doesn't exist
    event.remove({id: "tconstruct:smeltery/melting/metal/tungsten/raw"})
    event.remove({id: "tconstruct:smeltery/melting/metal/tungsten/raw_block"})
    
    //tfmg meme stones
    event.remove({input: /.*tfmg.*galena.*/})
    event.remove({input: /.*tfmg.*bauxite.*/})
    event.remove({input: "tfmg:lignite"})
    event.remove({output: /.*tfmg.*galena.*/})
    event.remove({output: /.*tfmg.*bauxite.*/})
    event.remove({output: "tfmg:lignite"})
    
    //alexscaves limestone integration
    event.replaceInput({}, "alexscaves:limestone", "#create:stone_types/limestone")
    event.replaceInput({}, "create:limestone", "#create:stone_types/limestone")
    
    //alexscaves galena to lead
    event.recipes.create.crushing([
        Item.of("thermal:lead_dust", 1).withChance(.05),
        Item.of("create:crushed_raw_lead", 1).withChance(.01),
        Item.of("thermal:raw_lead", 1).withChance(.001)],//concentrated
    "alexscaves:galena").processingTime(500)
    
    //alexscaves scrap metal gacha
    event.recipes.create.crushing([
        Item.of("minecraft:iron_nugget", 1).withChance(.5),
        
        Item.of("create:copper_nugget", 1).withChance(.03),
        Item.of("create:zinc_nugget", 1).withChance(.03),
        Item.of("thermal:tin_nugget", 1).withChance(.03),
        Item.of("thermal:lead_nugget", 1).withChance(.03),
        
        Item.of("createbigcannons:cast_iron_nugget", 1).withChance(.025),
        Item.of("createdeco:industrial_iron_nugget", 1).withChance(.025),
        
        Item.of("thermal:nickel_nugget", 1).withChance(.0125),
        Item.of("thermal:bronze_nugget", 1).withChance(.0125),
        Item.of("nuclearcraft:lithium_nugget", 1).withChance(.0125),
        Item.of("scguns:anthralite_nugget", 1).withChance(.0125),
        
        Item.of("tconstruct:rose_gold_nugget", 1).withChance(.004),
        Item.of("tconstruct:pig_iron_nugget", 1).withChance(.004),
        Item.of("tconstruct:amethyst_bronze_nugget", 1).withChance(.004),
        
        
        Item.of("tconstruct:steel_nugget", 1).withChance(.0025),
        
        Item.of("createaddition:electrum_nugget", 1).withChance(.001),
        Item.of("thermal:silver_nugget", 1).withChance(.0005),
        
        Item.of("rats:plastic_waste", 1).withChance(.0125),
        Item.of("youkaishomecoming:can", 1).withChance(.025),
        
        Item.of("tconstruct:debris_nugget", 1).withChance(.000001)
    ],
    "alexscaves:scrap_metal").processingTime(1)
    
    //synthesize alexscaves neodymium using nuclearcraft neodymium dust which is otherwise useless
    event.custom({
        "type": "nuclearcraft:assembler",
        "input": [
            {
            "count": 1,
            "tag": "forge:dusts/neodymium"
            },
            {
            "count": 1,
            "tag": "forge:gems/cinnabar"
            }
        ],
        "output": [
            {
            "amount": 1,
            "item": "alexscaves:raw_scarlet_neodymium"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    event.custom({
        "type": "nuclearcraft:assembler",
        "input": [
            {
            "count": 1,
            "tag": "forge:dusts/neodymium"
            },
            {
            "count": 1,
            "tag": "forge:gems/lapis"
            }
        ],
        "output": [
            {
            "amount": 1,
            "item": "alexscaves:raw_azure_neodymium"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 1.0
    })
    
    //globes for the wasteland
    event.remove({output: "supplementaries:globe"})
    event.remove({output: "supplementaries:globe_sepia"})
    //sepia globe: globe in NC nuclear furnace
    event.custom({
        "type": "nuclearcraft:alloy_smelter",
        "input": [
            {
            "count": 1,
            "item": "supplementaries:globe"
            },
            {
            "count": 1,
            "item": "minecraft:clock"
            }
        ],
        "output": [
            {
            "amount": 1,
            "item": "supplementaries:globe_sepia"
            }
        ],
        "powerModifier": 1.0,
        "radiation": 1.0,
        "timeModifier": 30.0
    })
    //todo add globe recipe?
})