unsigned long door1time = 0;
unsigned long door2time = 0;
bool door1open = false;
bool door2open = false;

void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);
  pinMode(6, INPUT);
  pinMode(7, OUTPUT);
}

void loop() {
  if (Serial.available())
  {
    char msg = Serial.read();
    if ('a' == msg)
    {
      digitalWrite(2, LOW);
      Serial.println("1 is close");    
    }
//delay(1000);:
    else if('b' == msg)
    {
      digitalWrite(2, HIGH);
      door1time = millis();
      door1open = true;
      Serial.println("1 is open");
    }
    else if('c' == msg)
    {
      digitalWrite(3, LOW);
      Serial.println("2 is close");
    }
    else if('d' == msg)
    {
      digitalWrite(3, HIGH);
      door2time = millis();
      door2open = true;
      Serial.println("2 is open");
    }
    else if('f' == msg)
    {
      Serial.println("Done");
    }
  }
  if (digitalRead(4) == 1)
  {
    Serial.println("Door Bell Ring");
    digitalWrite(7, HIGH);
  }
  else 
  {
    digitalWrite(7, LOW);
  }
  if (door1open)
  {
    unsigned long temptime = millis() - door1time;
    if (temptime > 3000)
    {
      door1open = false;
      door1time = 0;
      digitalWrite(2, LOW);
      
    }
  }
  if (door2open)
  {
    unsigned long temptime = millis() - door2time;
    if (temptime > 3000)
    {
      door2open = false;
      door2time = 0;
      digitalWrite(3, LOW);
      
    }
  }
  if (digitalRead(5) == 1)
  {
    digitalWrite(2, HIGH);
    door1time = millis();
    door1open = true;
    Serial.println("1 is open");
  }
  if (digitalRead(5) == 1)
  {
    digitalWrite(2, HIGH);
    door1time = millis();
    door1open = true;
    Serial.println("1 is open");
  }
  if (digitalRead(6) == 1)
  {
    digitalWrite(3, HIGH);
    door2time = millis();
    door2open = true;
    Serial.println("2 is open");
  }
}
