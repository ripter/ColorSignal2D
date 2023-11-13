import strutils

type
  Direction = enum
    North, NorthEast, SouthEast, South, SouthWest, NorthWest # Hex with flat side up.
    
  Token = object
    symbol: string
    r, g, b, a: uint8  # uint8 is an unsigned integer type that ranges from 0 to 255

    
# Procedures for Token type
proc getDirection(self: Token): Direction =
  return Direction(self.a and 0b111)  # Extract the 3 least significant bits for direction


proc isPrimary(self: Token): bool =
  return ((self.a shr 3) and 0b1) == 0b1


proc isValid(self: Token): bool =
  # Check even parity of the first 7 bits
  var count = 0
  for i in 0..6:
    if ((self.a shr i) and 0b1) == 0b1:
      inc(count)
  return count mod 2 == 0  # Even parity if count of 1s is even



proc getAlpha(direction: Direction, isPrimary: bool): uint8 =
  var alpha: uint8 = 0

  # Encode the direction in the 3 least significant bits
  alpha = uint8(direction) and 0b111

  # Set the 4th bit for isPrimary
  if isPrimary:
    alpha = alpha or 0b1000

  # Calculate and set even parity for the first 7 bits
  var count = 0
  for i in 0..6:
    if ((alpha shr i) and 0b1) == 0b1:
      inc(count)
  if count mod 2 != 0:
    alpha = alpha xor 0b1000000  # Toggle the 7th bit to achieve even parity

  return alpha
  




#
# Language functions run on Tokens
#

proc didCollide(self, other: Token): bool =
  return self.symbol != other.symbol





# Create a Token from Char and RGB hex code.
proc createToken(symbol: string, rgbaHex: string, dir: Direction, isControl: bool = false): Token =
  return Token(
    symbol: symbol, 
    r: parseInt(parseHexStr(rgbaHex[0..1])).uint8, 
    g: parseInt(parseHexStr(rgbaHex[2..3])).uint8, 
    b: parseInt(parseHexStr(rgbaHex[4..5])).uint8, 
    a: getAlpha(dir, isControl))




echo toHex("FF")

# Usage example
let myToken = Token(symbol: "M", r: 255, g: 255, b: 255, a: getAlpha(SouthWest, false))

# Call procedures on Token instance
echo myToken.getDirection()
echo myToken.isPrimary()
echo myToken.isValid()


# Make Signal moving East
let signal1 = createToken("*", "FF0000", NorthEast)
echo signal1

