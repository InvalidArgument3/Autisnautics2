// priority: 9999

// Java imports
const Registry = Java.loadClass("net.minecraft.core.Registry"); // registries, needed for almost everything involving Java classes
// const BlockPos = Java.loadClass('net.minecraft.core.BlockPos'); //Block position. For some reason we don't need to import this?
const TagKey = Java.loadClass("net.minecraft.tags.TagKey");
const AxisDirection = Java.loadClass("net.minecraft.core.Direction$AxisDirection");

const Random = Java.loadClass("java.util.Random")
const InputItem = Java.loadClass("dev.latvian.mods.kubejs.item.InputItem")
const OutputItem = Java.loadClass("dev.latvian.mods.kubejs.item.OutputItem")
const InputFluid = Java.loadClass("dev.latvian.mods.kubejs.fluid.InputFluid")
const OutputFluid = Java.loadClass("dev.latvian.mods.kubejs.fluid.OutputFluid")
const FluidStackJS = Java.loadClass("dev.latvian.mods.kubejs.fluid.FluidStackJS")
const JsonObject = Java.loadClass("com.google.gson.JsonObject")

const Level = Java.loadClass("net.minecraft.world.level.Level") // For some reason, Kubejs requires that you load this class to create explosions that damage blocks

const colours = ["white", "orange", "magenta", "light_blue", "lime", "pink", "purple", "light_gray", "gray", "cyan", "brown", "green", "blue", "red", "black", "yellow"]
const native_metals = ["iron", "zinc", "lead", "copper", "nickel", "gold"]

const wood_types = ["minecraft:oak", "minecraft:spruce", "minecraft:birch", "minecraft:jungle", "minecraft:acacia", "minecraft:dark_oak", "minecraft:mangrove", "minecraft:cherry", "minecraft:crimson", "minecraft:warped"]

// None of the modded axes are registered for some reason
const unregistered_axes = ["ae2:certus_quartz_axe", "ae2:nether_quartz_axe", "ae2:fluix_axe", "tconstruct:hand_axe", "tconstruct:mattock", "tconstruct:broad_axe", "thermal:flux_saw"]

const donutCraft = (event, output, center, ring) => {
    return event.shaped(output, [
        "SSS",
        "SCS",
        "SSS"
    ], {
        C: center,
        S: ring
    })
}


/**
 * Used to make smithing/mechanical crafting recipes which are common in A&B.
 * If the fourth parameter is excluded, then a stonecutting recipe will be created instead.
 *
 * First parmeter is the "base" ingredient,
 * third parameter is the output,
 * fourth parameter is the secondary ingredient.
 *
 * @param {ItemStackJS|string} machineItem
 * @param {RecipeEventJS} event
 * @param {ItemStackJS|string} outputIngredient
 * @param {ItemStackJS|string} inputIngredient
 */
// event is the second parameter so that machineItem doesn't look like it's the output item
const createMachine = (machineItem, event, outputIngredient, inputIngredient) => {
    console.log(`createMachine called with: machineItem=${machineItem}, outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    
    machineItem = Ingredient.of(machineItem)
    outputIngredient = Item.of(outputIngredient)
    
    console.log(`After conversion: machineItem=${machineItem}, outputIngredient=${outputIngredient}, outputIngredient.isEmpty()=${outputIngredient.isEmpty()}`)

    event.remove({ output: outputIngredient })
    if (inputIngredient) {
        inputIngredient = Ingredient.of(inputIngredient)
        event.custom({
            "type": "create:item_application",
            "ingredients": [
                machineItem.toJson(),
                inputIngredient.toJson()
            ],

            "results": (outputIngredient.isBlock() && outputIngredient.getCount() > 1) ?
                [

                    outputIngredient.withCount(1).toJson(),
                    outputIngredient.withCount(outputIngredient.getCount() - 1).toJson()
                ]
                :
                [
                    outputIngredient.toJson()
                ]

        })
    }
    else {
        console.log(`About to call stonecutting with: output=${outputIngredient}, input=${machineItem}`)
        console.log(`outputIngredient.isEmpty(): ${outputIngredient.isEmpty()}`)
        
        if (outputIngredient.isEmpty()) {
            console.log(`ERROR: outputIngredient is empty, skipping stonecutting recipe`)
            return
        }
        
        event.stonecutting(outputIngredient, machineItem)
    }
}

const andesiteMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`andesiteMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("kubejs:andesite_machine", event, outputIngredient, inputIngredient)
}

const copperMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`copperMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("kubejs:copper_machine", event, outputIngredient, inputIngredient)
}

const goldMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`goldMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("kubejs:gold_machine", event, outputIngredient, inputIngredient)
}

const brassMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`brassMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("kubejs:brass_machine", event, outputIngredient, inputIngredient)
}

const zincMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`zincMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("kubejs:zinc_machine", event, outputIngredient, inputIngredient)
}

const leadMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`leadMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("kubejs:lead_machine", event, outputIngredient, inputIngredient)
}


const invarMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`invarMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("thermal:machine_frame", event, outputIngredient, inputIngredient)
}

const enderiumMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`enderiumMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("kubejs:enderium_machine", event, outputIngredient, inputIngredient)
}

const fluixMachine = (event, outputIngredient, inputIngredient) => {
    console.log(`fluixMachine called with: outputIngredient=${outputIngredient}, inputIngredient=${inputIngredient}`)
    return createMachine("ae2:controller", event, outputIngredient, inputIngredient)
}

const toThermalInputJson = (value) => {
    if (value instanceof InputFluid) {
        return (FluidStackJS.of(value)).toJson()
    }
    value = InputItem.of(value)
    if (value.count > 1) {
        let json = new JsonObject()
        json.add("value", value.ingredient.toJson())
        json.addProperty("count", value.count)
        return json
    } else {
        return value.ingredient.toJson();
    }
}
const toThermalOutputJson = (value) => {
    if (value instanceof OutputFluid) {
        return (FluidStackJS.of(value)).toJson();
    }
    value = OutputItem.of(value)
    let json = new JsonObject()
    json.addProperty("item", value.item.getId())
    json.addProperty("count", value.item.getCount())

    if (value.getNbt() != null) {
        json.addProperty("nbt", value.getNbt().toString())
    }

    if (value.hasChance()) {
        json.addProperty("chance", value.getChance())
    }

    if (value.rolls != null) {
        json.addProperty("minRolls", value.rolls.getMinValue())
        json.addProperty("maxRolls", value.rolls.getMaxValue())
    }

    return json;
}

const addTreeOutput = (event, trunk, leaf, fluid) => {
    return event.custom({
        type: "thermal:tree_extractor",
        trunk: {
            Name: trunk,
            Properties: {
                axis: "y"
            }
        },
        leaves: {
            Name: leaf,
            Properties: {
                persistent: "false"
            }
        },
        // sapling: "minecraft:jungle_sapling",
        // min_height: 5,
        // max_height: 10,
        // min_leaves: 8,
        // max_leaves: 12,
        result: fluid ? toThermalOutputJson(fluid) : {
            fluid: "thermal:resin",
            amount: 25
        }
    })
}

/**
 * Creates smeltery casting recipes for nuggets, ingots, blocks, etc
 * Also creates a chilling recipe for the ingot
 * This helper function requires all the items and fluids involved to be tagged correctly with the nugget/ingot/block tags
 * @param {RecipeEventJS} event recipe event
 * @param {string} metalName the name of the metal to create casting recipes (ex: "forge:ingots/{metalName}")
 * @param {number} castingTime the time it takes to cast a block in a casting table (nugget and ingot casting times will be calculated based on that)
 */
const metalCasting = (event, metalName, castingTime) => {
    console.log(`metalCasting called for: ${metalName}`)
    let fluidTag = "forge:molten_" + metalName

    let blockTag = "forge:storage_blocks/" + metalName

    // block casting
    if (Ingredient.of(`#forge:storage_blocks/${metalName}`).first != Item.empty) {
        event.custom({
            "type": "tconstruct:casting_basin",
            "fluid": {
                "tag": fluidTag,
                "amount": 810
            },
            "result": {"tag": blockTag},
            "cooling_time": castingTime
        }).id(`kubejs:smeltery/casting/metal/${metalName}/block`)
    }

    let castTypes = [
        // {name: 'coin', fluidCost: 30, cooldownMultiplier: 1/(3*Math.sqrt(3))},
        {name: "gear", fluidCost: 360, cooldownMultiplier: 2 / 3},
        {name: "ingot", fluidCost: 90, cooldownMultiplier: 1 / 3},
        {name: "nugget", fluidCost: 10, cooldownMultiplier: 1 / 9},
        {name: "plate", fluidCost: 90, cooldownMultiplier: 1 / 3},
        {name: "rod", fluidCost: 45, cooldownMultiplier: 1 / (3 * Math.SQRT2)},
        {name: "wire", fluidCost: 45, cooldownMultiplier: 1 / (3 * Math.SQRT2)}
    ]

    // casting into casts
    castTypes.forEach(cast=>{
        if (Ingredient.of(`#forge:${cast.name}s/${metalName}`).first != Item.empty) {
            console.log(`Creating casting recipe for ${metalName} ${cast.name}`)
            event.custom({
                "type": "tconstruct:casting_table",
                "cast": {
                    "tag": `tconstruct:casts/multi_use/${cast.name}`
                },
                "fluid": {
                    "tag": fluidTag,
                    "amount": cast.fluidCost
                },
                "result": {"tag": `forge:${cast.name}s/${metalName}`},
                "cooling_time": Math.round(castingTime * cast.cooldownMultiplier)
            }).id(`kubejs:smeltery/casting/metal/${metalName}/${cast.name}_gold_cast`)

            event.custom({
                "type": "tconstruct:casting_table",
                "cast": {
                    "tag": `tconstruct:casts/single_use/${cast.name}`
                },
                "cast_consumed": true,
                "fluid": {
                    "tag": fluidTag,
                    "amount": cast.fluidCost
                },
                "result": {"tag": `forge:${cast.name}s/${metalName}`},
                "cooling_time": Math.round(castingTime * cast.cooldownMultiplier)
            }).id(`kubejs:smeltery/casting/metal/${metalName}/${cast.name}_sand_cast`)
        } else {
            console.log(`Skipping ${metalName} ${cast.name} - tag is empty`)
        }
    })

    // ingot chilling
    if (Ingredient.of(`#forge:ingots/${metalName}`).first != Item.empty) {
        console.log(`Creating chilling recipe for ${metalName} ingot`)
        event.custom({
            "type": "thermal:chiller",
            "ingredients": [{
                "fluid_tag": fluidTag,
                "amount": 90
            },{
                "item": "thermal:chiller_ingot_cast"
            }],
            "result": [{
                "item": getPreferredItemFromTag("forge:ingots/" + metalName),
                "count": 1
            }],
            "energy": 5000
        }).id(`kubejs:crucible/kubejs/smeltery/casting/metal/${metalName}/ingot_gold_cast`)
    } else {
        console.log(`Skipping ${metalName} ingot chilling - no ingots found`)
    }
}
/**
 * Creates smeltery melting recipes for nuggets, ingots, blocks, etc
 * Also creates a magma crucible recipe for the ingot
 * @param {RecipeEventJS} event recipe event
 * @param {string} metalName the name of the metal to create melting recipes for
 * @param {number} meltingTime the time it takes to melt a block in the smeltery
 * @param {number} temperature the temperature required to melt a block in the smeltery
 */
const metalMelting = (event, metalName, outputFluid, meltingTime, temperature) => {
    console.log(`metalMelting called for: ${metalName}, outputFluid: ${outputFluid}`)
    let fluidTag = "forge:molten_" + metalName

    let blockTag = "forge:storage_blocks/" + metalName

    // block melting
    if (Ingredient.of(`#forge:storage_blocks/${metalName}`).first != Item.empty) {
        console.log(`Creating melting recipe for ${metalName} block`)
        event.custom({
            "type": "tconstruct:melting",
            "ingredient": {"tag": `forge:storage_blocks/${metalName}`},
            "result": {
                "fluid": outputFluid,
                "amount": 810
            },
            "temperature": temperature,
            "time": meltingTime
        }).id(`kubejs:smeltery/melting/metal/${metalName}/block`)
    } else {
        console.log(`Skipping ${metalName} block melting - no blocks found`)
    }

    let castTypes = [
        {name: "coin", fluidAmount: 30, timeMultiplier: 1 / (3 * Math.sqrt(3))},
        {name: "gear", fluidAmount: 360, timeMultiplier: 2 / 3},
        {name: "ingot", fluidAmount: 90, timeMultiplier: 1 / 3},
        {name: "nugget", fluidAmount: 10, timeMultiplier: 1 / 9},
        {name: "plate", fluidAmount: 90, timeMultiplier: 1 / 3},
        {name: "rod", fluidAmount: 45, timeMultiplier: 1 / (3 * Math.SQRT2)},
        {name: "wire", fluidAmount: 45, timeMultiplier: 1 / (3 * Math.SQRT2)}
    ]

    // melting cast shapes
    castTypes.forEach(cast=>{
        if (Ingredient.of(`#forge:${cast.name}s/${metalName}`).first != Item.empty) {
            console.log(`Creating melting recipe for ${metalName} ${cast.name}`)
            event.custom({
                "type": "tconstruct:melting",
                "ingredient": {"tag": `forge:${cast.name}s/${metalName}`},
                "result": {
                    "fluid": outputFluid,
                    "amount": cast.fluidAmount
                },
                "temperature": temperature,
                "time": meltingTime * cast.timeMultiplier
            }).id(`kubejs:smeltery/melting/metal/${metalName}/${cast.name}`)
        } else {
            console.log(`Skipping ${metalName} ${cast.name} melting - tag is empty`)
        }
    })

    // ingot crucible melting
    if (Ingredient.of(`#forge:ingots/${metalName}`).first != Item.empty) {
        console.log(`Creating crucible melting recipe for ${metalName} ingot`)
        event.custom({
            type:"thermal:crucible",
            ingredient: {
                "tag": `forge:ingots/${metalName}`
            },
            result:[{
                fluid: outputFluid,
                amount:90
            }],
            energy:Math.round(meltingTime / 3) * 50
        }).id(`kubejs:crucible/kubejs/smeltery/melting/metal/${metalName}/ingot`)
    } else {
        console.log(`Skipping ${metalName} ingot crucible melting - no ingots found`)
    }
}

/** Used in datapack events instead of recipe events */
const addChiselingRecipe = (event, id, items, overwrite) => {
    const json = {
        type: "rechiseled:chiseling",
        entries: [],
        overwrite: !!overwrite
    }
    items.forEach(item=>{
        json.entries.push({
            item: item
        })
    })
    event.addJson(id, json)
}

/** Used in a datapack event to remove a configured feature by its resource location */
const removeFeature = function(event, featureName) {
    featureName = featureName.split(":")
    let namespace = featureName[0]
    let identifier = featureName[1]
    event.addJson(`${namespace}:worldgen/configured_feature/${identifier}`, {
        "type": "minecraft:no_op",
        "config": {}
    })
}

/** Used in a datapack event to add ore generation for an ore to the overworld
 * This function only works for ores with both a stone and deepslate variant
*/
const addOregenOverworld = function(event, featureName, blockName, heightType, heightMin, heightMax, veinCount, veinSize, discardChanceOnAirExposure) {
    featureName = featureName.split(":")
    let namespace = featureName[0]
    let identifier = featureName[1]

    blockName = blockName.split(":")
    let blockNamespace = blockName[0]
    let blockIdentifier = blockName[1]

    event.addJson(`${namespace}:worldgen/configured_feature/${identifier}`, {
        "type": "minecraft:ore",
        "config": {
            "discard_chance_on_air_exposure": discardChanceOnAirExposure,
            "size": veinSize,
            "targets": [
                {
                    "state": {"Name": `${blockNamespace}:${blockIdentifier}`},
                    "target": {"predicate_type": "minecraft:tag_match", "tag": "minecraft:stone_ore_replaceables"}
                },
                {
                    "state": {"Name": `${blockNamespace}:deepslate_${blockIdentifier}`},
                    "target": {"predicate_type": "minecraft:tag_match", "tag": "minecraft:deepslate_ore_replaceables"}
                }
            ]
        }
    })
    let minInclusive = {"absolute": heightMin}
    let maxInclusive = {"absolute": heightMax}
    // EMI Oregen will display more useful information if we change to using Above Bottom where it makes sense to
    if (heightMin < -64) {
        minInclusive = {"above_bottom": heightMin + 64}
        maxInclusive = {"above_bottom": heightMax + 64}
    } else if (heightMax > 320) {
        minInclusive = {"below_top": -(heightMin - 320)}
        maxInclusive = {"below_top": -(heightMax - 320)}
    }

    event.addJson(`${namespace}:worldgen/placed_feature/${identifier}`, {
        "feature": `${namespace}:${identifier}`,
        "placement": [
            {"type": "minecraft:count", "count": veinCount},
            {"type": "minecraft:in_square"},
            {
                "type": "minecraft:height_range",
                "height": {
                    "type": heightType,
                    "min_inclusive": minInclusive,
                    "max_inclusive": maxInclusive
                }
            },
            {"type": "minecraft:biome"}
        ]
    })

    event.addJson(`${namespace}:forge/biome_modifier/${identifier}`, {
        "type": "forge:add_features",
        "biomes": "#minecraft:is_overworld",
        "features": `${namespace}:${identifier}`,
        "step": "underground_ores"
    })
}

/**
 * Gets the prefered item from a tag. Useful for porting Mantle recipes that use tags as outputs.
 * @param {string} tag Don't include a hashtag in the tag name
 */
// const ItemOutput = Java.loadClass('slimeknights.mantle.recipe.helper.ItemOutput');
const getPreferredItemFromTag = (tag) => {
    console.log(`getPreferredItemFromTag called with: ${tag}`)
    /* Tried using mantle for this and it didn't work on first launch unfortunately */
    // return Item.of(ItemOutput.fromTag(TagKey.create(Registry.ITEM_REGISTRY, tag), 1).get()).getId();
    /* Create a copy of the mantle preferred mods list */
    const preferredMods = ["minecraft", "create", "alloyed", "createdeco", "createaddition", "createbigcannons", "create_dd", "thermal", "tconstruct", "tmechworks"];
    const tagItems = Ingredient.of("#" + tag).itemIds;
    console.log(`Tag ${tag} contains items: ${tagItems}`)
    for (let i = 0;i < preferredMods.length;++i) { let modId = preferredMods[i];
        for (let j = 0;j < tagItems.length;++j) { let itemId = tagItems[j];
            if (itemId.split(":")[0] === modId) {
                console.log(`Found preferred item for ${tag}: ${itemId}`)
                return itemId;
            }
        }
    }
    if (tagItems.length > 0) {
        console.log(`No preferred mod found for ${tag}, using first item: ${tagItems[0]}`)
        return tagItems[0];
    }
    console.log(`No items found for tag ${tag}, returning air`)
    return "minecraft:air";
}