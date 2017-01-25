//LED VAR
const int ledPin = 13;

//Read VAR
boolean nodeconnect = false;
boolean messageComplete = false;
String inputString = "";

void setup() {
  // initialize serial:
  Serial.begin(9600);
  // initialize digital pin 13 as an output.
  pinMode(ledPin, OUTPUT);
}

void loop() {
   // Recieve data from Node and write it to a String
   while (Serial.available() && messageComplete == false) {
    char inChar = (char)Serial.read();
    if(inChar == 'E'){ // end character
     messageComplete = true;
    }
    else{
     inputString += inChar;
    }
   }

  // ProcessMessage
  if(!Serial.available() && messageComplete == true)
  {
    messageComplete = false;
    if (inputString == "hello") {
      nodeconnect = true;
      Serial.print("wait");
    }else if(inputString == "close") {
      nodeconnect = false;
      Serial.print("finish");
      delay(1000);
    }else{
      int blinkTimes = inputString.toInt();
      blink(blinkTimes);
      Serial.print("blink");
    }
    inputString = "";
  }

  //CheckNodeConnect()
  if (!nodeconnect){
    Serial.print("hello");
    delay(1000);
  }
}

void blink(int x){
  for (int i = 0; i < x; i++){
    digitalWrite(ledPin,HIGH);
    delay(200);
    digitalWrite(ledPin,LOW);
    delay(200);
  }
  delay(1000);
}
