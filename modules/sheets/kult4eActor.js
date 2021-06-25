
export default class kult4eActor extends Actor {

  

  async windowSize () {
    this.data.options = {...this.data.options, width: 2000, height: 2000}
  }
  async woundEffect(){
    var i;
    let modifier = 0;
    let ctitModifier = 0;
    if (this.data.data.attributes.criticalwound && this.data.data.attributes.criticalwoundstabilized == "false") {
      ctitModifier = 1
      console.log("ping");
      
    }
    
    for (i=1; i<5; i++){
            if ( getProperty(this.data.data.attributes, `woundtext.majorwound${i}`) && (getProperty(this.data.data.attributes, `woundstabilized.majorwound${i}`) == "false")){
        
          modifier = 1
      }

    }
    modifier += ctitModifier 
      return modifier;
  }  

  
    async moveroll(movename){
    const actordata = this.data;
    let data = actordata.items.filter(function(item) {return item.name == movename} );
    const type = "active";
    const movetype = data[0].data.type;
    if (movetype == "passive")
    {alert("Ta umiejętność jest pasywna!");}
    else{
    const attr = data[0].data.attributemod;
    const successtext = data[0].data.completesuccess;
    const failuretext = data[0].data.failure;
    const partialsuccess = data[0].data.partialsuccess;
    const specialflag = data[0].data.specialflag;
    let mod = 0;
    let harm = 0;
    if (movename == "Znieś Obrażenia"){
      let boxoutput = await new Promise(resolve => {
        new Dialog({
        title: "Endure Harm",
        content: '<label>Ile punktów obrażeń otrzymała twoja postać?</label><input id="harm_value" data-type="number">',
        default: 'one',
        buttons:{
              one: {label: "Ok",
                callback: () => {
                      resolve({
                        "harm_value": document.getElementById("harm_value").value

                      })
                }
             }
            }
    
      }).render(true);
      })
      harm = boxoutput.harm_value;
    }
    
    if(attr != '') {
        mod = this.data.data.attributes[attr];
    }
    
    let stab = this.data.data.stability.value;
    let situation = 0 
    situation = parseInt(this.data.data.sitmod) + parseInt(this.data.data.forward);
    console.log(`Sitmod is ` + this.data.data.sitmod);
    let woundmod = await this.woundEffect();
    situation -= woundmod;
    if (specialflag == 1 && stab > 2)
      {situation -= 1};
    if (movetype == "disadvantage" && stab > 0)
      {situation -= 1};
    if (movetype == "disadvantage" && stab > 2)
      {situation -= 1};
    if (specialflag == 1 && stab > 5)
      {situation -= 1};
    if (movetype == "disadvantage" && stab > 5)
      {situation -=1};
    if (specialflag == 2 && stab > 5)
      {situation += 1}; 
   

    let r = new Roll(`2d10 + ${mod} + ${situation} - ${harm}`);
    r.roll()
    if(r.total){
      console.log("Roll Successful")
      const updated = this.update({"data.sitmod": 0});
      console.log(`Sitmod is ` + this.data.data.sitmod);
     
    }
    if (r.total >= 15)
    {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Sukces! </div> <div class = 'move-result'>" + successtext + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
    }
    else if (r.total < 10)
    {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Porażka! </div> <div class = 'move-result'>" + failuretext + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
    }
    else
    {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Częściowy sukces! </div> <div class = 'move-result'>" + partialsuccess + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
    }}
        
    
  }
  

}
