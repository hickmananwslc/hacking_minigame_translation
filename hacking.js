//let lineInterval
let headerPrinted = false
let passwordsPrinted = false

function setup() {
  createCanvas(600, 500);
  background('black');
  textFont('Courier New');
  textSize(17)
  stroke(2, 216, 24);
  strokeWeight(1);
  fill(2, 216, 24);
  passwordList = new Passwords();
}

function draw(){
  noLoop()
  playGame();
}

function playGame(){
  var attemptsLeft = 4
  var location = [10, 20]
  var textOffset = textSize() * 1.25
  
  printGameText(attemptsLeft, location, textOffset)
  
}

function printGameText(attemptsLeft, location, textOffset){
  if(headerPrinted === false){
    displayHeader(attemptsLeft, location, textOffset);
  }
}

function displayHeader(attemptsLeft, location, textOffset){
  header = ['DEBUG MODE', attemptsLeft + ' ATTEMPTS LEFT', ''];
  header.forEach((item, index) => setTimeout(() => {
    displayLine(item, location, textOffset);
    if(index >= (header.length - 1)){
      headerPrinted = true
      displayPasswordList(attemptsLeft, location, textOffset)
    }
  }, index * 500))
  //displayLine(header, location, textOffset)
}

function displayLine(string, location, textOffset){
  console.log(string) 
  
    text(string, location[0], location[1])
    location[1] += textOffset
  
}

function displayPasswordList(attemptsLeft, location, textOffset){
  let newPasswordList = passwordList.generatePasswordList()
  newPasswordList = passwordList.embeddedPasswords
  if(headerPrinted){
    newPasswordList.forEach((item, index) => setTimeout(() => {
      displayLine(item, location, textOffset);
      if(index >= (newPasswordList.length - 1)){
        passwordsPrinted = true
        getGuesses(attemptsLeft, location, textOffset)
      }

    }, index * 500))
  }
}

function getGuesses(attemptsLeft, location, textOffset){
  let userGuesses = [];
  let guess;
  let guessPrompt = ['ENTER PASSWORD >'];
  if(passwordsPrinted === true && attemptsLeft > 0){
    displayLine(guessPrompt, location, textOffset);
      //this.displayLine(this.guessPrompt)
    let inp = createInput('');
    inp.position(location[0] + 175, location[1] - (textOffset * 1.82));
    
  }
}

function keyPressed(attemptsLeft, inp, guess, userGuesses){
  if(keyIsPressed){
    if(keyCode === ENTER && attemptsLeft > 0){
      guess = inp.value()
      console.log(guess)
    }
  }
}


class Passwords{
  constructor(){
    this.passwordsGenerated = []
    this.samplePasswords = []
    this.embeddedPasswords = []
  }
  generatePasswordList(){
    this.samplePasswords.push('PROVIDE', 'SETTING', 'CANTINA', 'CUTTING', 'HUNTERS', 'SURVIVE',  'HEARING', 'HUNTING', 'REALIZE', 'NOTHING', 'OVERLAP', 'FINDING', 'PUTTING', 'NURTURE', 'RELIEVE', 'DESTROY', 'HABITAT', 'ICEBERG', 'VACCINE', 'VACANCY', 'ABIDING', 'ABILITY');
    for(; this.passwordsGenerated.length < 13;){
      this.selection = random(this.samplePasswords);
      while(this.passwordsGenerated.includes(this.selection)){
        this.selection = random(this.samplePasswords)
      }
      this.passwordsGenerated.push(this.selection);
    
      this.embedSelection = this.embedPasswordList(this.selection, 20);
      this.embeddedPasswords.push(this.embedSelection)
      
    }
    this.embeddedPasswords.push('');
    var correctPassword = random(this.passwordsGenerated)
    console.log(correctPassword)
    

  }
  
  embedPasswordList(word, size){
    this.filler = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '~', '[', ']', '{', '}'];
    this.embedding = [];
    this.wordLength = word.length;
    this.splitIndex = floor(random(0, size - this.wordLength));
    for(let i = 0; i < this.splitIndex + 1; i++){
      this.embedding.push(random(this.filler));
    }
    
    this.embedding = this.embedding.concat(word);
    
    for(let i = this.wordLength + this.splitIndex; i < size - 1; i++){
      this.embedding.push(random(this.filler));
    }
  
    this.embeddedPassword = this.embedding.join('');
    return this.embeddedPassword

  }
  
}

/*function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}*/
