#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "ssid";
const char* password = "pass";
String base = "base/api/arduino/";
const int pinIRd1 = 14;
const int pinIRd2 = 27;
const int pinIRd3 = 5;
const int pinIRd4 = 34;

int IRvalD1 = 0;
int IRvalD2 = 0;
int IRvalD3 = 0;
int IRvalD4 = 0;

String value = "0000";

String takeInput() {
  Serial.print("Digital value1 = ");
  Serial.print(IRvalD1);
  IRvalD1 = digitalRead(pinIRd1);

  Serial.print("\tDigital value2 = ");
  Serial.print(IRvalD2);
  IRvalD2 = digitalRead(pinIRd2);


  Serial.print("\tDigital value3 = ");
  Serial.print(IRvalD3);
  IRvalD3 = digitalRead(pinIRd3);

  Serial.print("\tDigital value4 = ");
  Serial.println(IRvalD4);
  IRvalD4 = digitalRead(pinIRd4);
  String newValue = String(IRvalD1) + String(IRvalD2) + String(IRvalD3) + String(IRvalD4);
  return newValue;
}

void serverCall(String val) {
  Serial.println("Value changed " + val);
  if ((WiFi.status() == WL_CONNECTED)) { 
    String endpoint = base + val;
    Serial.println(endpoint);
    HTTPClient http;
    http.begin(endpoint); 
    int httpCode = http.GET();                                        
    if (httpCode > 0) { 
      String payload = http.getString();
      Serial.println(httpCode);
      Serial.println(payload);
    } else {
      Serial.println("Error on HTTP request");
    }
    http.end(); 
  }
}

void setup() {
  Serial.begin(115200);
  delay(4000);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
  pinMode(pinIRd1, INPUT);
  pinMode(pinIRd2, INPUT);
  pinMode(pinIRd3, INPUT);
  pinMode(pinIRd4, INPUT);
}

void loop() {
  String newValue = takeInput();
  if (!newValue.equals(value)) {
    serverCall(newValue);
  }
  value = newValue;
  delay(100);
}