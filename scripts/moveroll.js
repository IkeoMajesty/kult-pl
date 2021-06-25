function moveroll(movename, moveattribute, attributevalue, sitmod, forward, stability, woundmod)
{
    console.log(movename, moveattribute, attributevalue,"Sitmod:", sitmod, "Woundmod:", woundmod);
    if (movename == "Keep It Together" && stability > 3)
      {sitmod -= 1};
    if (movename == "Keep It Together" && stability > 6)
      {sitmod -= 1};
    if (movename == "See Through the Illusion" && stability > 6)
      {sitmod += 1}; 
    if (movename == "Endure Harm")
        {getAttribute()};

    let situation = sitmod + forward + woundmod;
    console.log(`TTTTTUUUUUUUUU =>>> ${situation}`);
    let r = new Roll(`2d10 + ${attributevalue} + ${situation}`);
    r.roll()
    if (r.total >= 15)
    {ChatMessage.create({ content: "<p>" + item.name + "</p>" + r.result + "<p>" + r.total + "</p>" + item.data.data.completesuccess, speaker: ChatMessage.getSpeaker({alias: this.actor.name})});
    }
    else if (r.total <= 10)
    {ChatMessage.create({content: "<p>" + item.name + "</p>" + r.result + "<p>" + r.total + "</p>" + item.data.data.failure, speaker: ChatMessage.getSpeaker({alias: this.actor.name}) });
    }
    else
    {ChatMessage.create({content: "<p>" + item.name + "</p>" + r.result + "<p>" + r.total + "</p>" + item.data.data.partialsuccess, speaker: ChatMessage.getSpeaker({alias: this.actor.name})});
    }
};
