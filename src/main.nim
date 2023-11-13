from  "./Token" import Token
from "./symbols/Signal" import moveToken

echo "Hello World"

var test = Token(xPos: 20, yPos: 30, symbol: "→")

test.moveToken()
echo test
