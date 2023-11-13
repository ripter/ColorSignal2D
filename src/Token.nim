import strutils

type
  Direction = enum
    #North, NorthEast, SouthEast, South, SouthWest, NorthWest # Hex with flat side up.
    dEast, dEastNorth, dEastSouth, dWest, dWestNorth, dWestSouth # Hex with point side up.
    
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





# Create a Signal Token from Char and RGB hex code.
# Signal tokens have isControl and parity.
proc createSignalToken(symbol: string, rgbaHex: string, dir: Direction, isControl: bool = false): Token =
  return Token(
    symbol: symbol, 
    r: fromHex[uint8](rgbaHex[0..1]),
    g: fromHex[uint8](rgbaHex[2..3]), 
    b: fromHex[uint8](rgbaHex[4..5]), 
    a: getAlpha(dir, isControl))


# Create a Counter Token.
# Count is a number between 0-3.
proc createCounterToken(symbol: string, rgbaHex: string, dir: Direction, count: uint8): Token =
  # Ensure count is only two bits
  let sanitizedCount = count and 0b11
  # Get the direction bits (3 least significant bits)
  let direction = uint8(dir) and 0b111
  # Incorporate count into alpha
  # Shift count left by 3 bits and combine with alpha
  let alpha = direction or (sanitizedCount shl 3)
  
  return Token(
    symbol: symbol, 
    r: fromHex[uint8](rgbaHex[0..1]),
    g: fromHex[uint8](rgbaHex[2..3]), 
    b: fromHex[uint8](rgbaHex[4..5]), 
    a: alpha)




#[
let hexStr = "FF120C"
echo hexStr[2..3]

# Usage example
let myToken = Token(symbol: "M", r: 255, g: 255, b: 255, a: getAlpha(SouthWest, false))

# Call procedures on Token instance
echo myToken.getDirection()
echo myToken.isPrimary()
echo myToken.isValid()
]#

# Make Signal moving East
#let signal1 = createSignalToken("*", "FF851B", East)
#echo signal1

let generator1 = createCounterToken("⚁", "7FDBFF",  dEast, 1)
echo generator1
echo generator1.isValid() # not a valid check for Counter Tokens, it's only for signals.