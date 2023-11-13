from "../Token" import Token

#[
  Signal
]#


proc tick*(token: Token) =
  echo "Tick Signal " .. token

proc moveToken*(token: Token) =
  echo "Moving the Token"
  case token.symbol
    of "→":
      echo "move right"
      token.xPos = token.xPos + 1
    of "←":
      echo "move left"
    of "↑":
      echo "move up"
    of "↓":
      echo "move down"
    of "↗":
      echo "up right"
    of "↖":
      echo "up left"
    of "↘":
      echo "down right"
    of "↙":
      echo "down left"
