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
})