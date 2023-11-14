import strutils

# 4 bits to hold the Bit Operation value.
type BitOperation = enum
  boOff, boOn,
  boLeftShift, boRightShift,
  boAndBoth, boAndGreen, boAndBlue,
  boOrBoth, boOrGreen, boOrBlue,
  boXorBoth, boXorGreen, boXorBlue,
  boNotBoth, boNotGreen, boNotBlue,


type Direction = enum
  #North, NorthEast, SouthEast, South, SouthWest, NorthWest # Hex with flat side up.
  dEast, dEastNorth, dEastSouth, dWest, dWestNorth, dWestSouth # Hex with point side up.

type RGBA = object
  r, g, b, a: uint8

type AxialCoordinate = object
  q, r, s: uint8

type Token = object
  symbol: string
  color: RGBA
  position: AxialCoordinate
    

    

proc toHexCode(self: Token): string =
  # Convert each RGBA component to a hexadecimal string
  let rHex = toHex(self.color.r, 2)  # Ensuring 2 characters for each component
  let gHex = toHex(self.color.g, 2)
  let bHex = toHex(self.color.b, 2)
  let aHex = toHex(self.color.a, 2)
  return rHex & gHex & bHex & aHex

    
proc toString(self: Token): string =
  # Concatenate the symbol and the hex values
  return self.symbol & "#" & self.toHexCode()




# Procedures for Token type
proc getDirection(self: Token): Direction =
  return Direction(self.color.a and 0b111)  # Extract the 3 least significant bits for direction


proc isPrimary(self: Token): bool =
  return ((self.color.a shr 3) and 0b1) == 0b1


proc isValid(self: Token): bool =
  # Check even parity of the first 7 bits
  var count = 0
  for i in 0..6:
    if ((self.color.a shr i) and 0b1) == 0b1:
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


# Creates a Token with the Symbol and Color
# Color is an RGBA hex string like "FFFFFF00"
# Position defaults to 0
proc createToken(symbol: string, color: string): Token =
  return Token(
    symbol: symbol,
    color: RGBA(
      r: fromHex[uint8](color[0..1]),
      g: fromHex[uint8](color[2..3]), 
      b: fromHex[uint8](color[4..5]),
      a: fromHex[uint8](color[6..7]),
    ),
    position: AxialCoordinate(q:0, r:0, s:0)
  )


# Create a Signal Token from Char and RGB hex code.
# Signal tokens have isControl and parity.
proc createSignalToken(color: string, dir: Direction, isControl: bool = false): Token =
  # First, compute the alpha value
  let alphaValue = getAlpha(dir, isControl)
  # Convert alphaValue to a hexadecimal string and append it to the color string
  let rgba = color[0..5] & toHex(alphaValue)
  # Now, pass this new rgba string to createToken
  return createToken("*", rgba)


proc createControlSignalToken(color: string, op: BitOperation, dir: Direction): Token =
  var token = createSignalToken(color, dir, true)
  token.color.r = uint8(op) and 0x0F
  return token




# Create a Counter Token.
# Count is a number between 0-3.
proc createCounterToken(symbol: string, color: string, dir: Direction, count: uint8): Token =
  # Ensure count is only two bits
  let sanitizedCount = count and 0b11
  # Get the direction bits (3 least significant bits)
  let direction = uint8(dir) and 0b111
  # Incorporate count into alpha
  # Shift count left by 3 bits and combine with alpha
  let alphaValue = direction or (sanitizedCount shl 3)
  # Convert alphaValue to a hexadecimal string and append it to the color string
  let rgba = color[0..5] & toHex(alphaValue)
  return createToken(symbol, rgba)







    
# Make Signal
let signal1 = createSignalToken("FF851B", dWest)
echo "signal: " & signal1.toString()

let signal2 = createControlSignalToken("000000", boOff, dWest)
echo "control: " & signal2.toString()


let generator1 = createCounterToken("⚁", "7FDBFF",  dEast, 1)
echo generator1