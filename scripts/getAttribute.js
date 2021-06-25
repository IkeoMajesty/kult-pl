function getAttribute(){

    let d=new Dialog({
        title: "Znieś Obrażenia",
        content: 'Ta funkcja nie jest jeszcze dostępna, upewnij sie proszę, że wartość obrażeń jest odwzorowana w polu modyfikatory i rzuć na Zniesienie obrażeń raz jeszcze!',
        default: 'one',
        buttons:{
              one: {label: "Ok",
                callback: () => console.log("OK")
                   }
            },
    
      });
      d.render(true);
}