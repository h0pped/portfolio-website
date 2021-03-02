const TypeWritter = function(txtElement,words,wait=3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex=0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;

}

// Type method
TypeWritter.prototype.type=function(){
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // full text of the word
    const fulltxt = this.words[current];

    //Check if deleting
    if(this.isDeleting){
        // Remove a charachter
        this.txt = fulltxt.substring(0,this.txt.length-1);
    }else{
        // Add a charachter
        this.txt = fulltxt.substring(0,this.txt.length+1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt" id="txt-id">${this.txt}</span>`

    // Initial Type speed
    let typespeed = 150;

    if(this.isDeleting){
        typespeed /=2;
    }

    // IfComplete
    if(!this.isDeleting && this.txt===fulltxt){
        // Make a pause at the and
        typespeed = this.wait;

        // Set delete to true
        this.isDeleting=true;

    }
    else if(this.isDeleting&& this.txt===''){
        this.isDeleting=false;

        // Move to next word
        this.wordIndex++;
        // Pause before start typing;
        typespeed=500;
    }
    setTimeout(()=>this.type(),typespeed);

}

// Init on DOM Load
document.addEventListener('DOMContentLoaded',init);

// Init app

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWritter(txtElement,words,wait);

}