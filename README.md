# ColorSignal2D
A 2D Programming language based on colored signals.

The code and data are represented on a 2D grid using a symbol (UTF-8 charecter code) and a [RGBA](https://en.wikipedia.org/wiki/RGBA_color_model) Color value. This allows the entire state of the program to be stored and loaded as text. A color display can display the symbols in their color, while a text or coloreless display can render `Symbol#RGBA`.




# Design Decisions

## Entire State can be stored as plain text.

Not all formats support color. So it must be possible to save the entire application state in something that is supported everywhere. To do this, the application state can be imported and exported as a plain text file. Symbols remain unchanged, while the color is turned into a hex code appended to te symbol.

For example: `*#FFFFFF04` is a White colored Signal moving East.


## The Alpha Channel

Each color is a 32 bit value made up of four 8 bit values. Red, Green, Blue, and Alpha. The first 24 bits are used to hold data in the form of an RGB color. The last 8 bits, normally used for Alpha transparancy is used configuration for the Symbol. 

Using the Alpha Channel as a symbol configuration reduces the number of unique symbols required. For example, we could use the symbols `N, S, E, W` to indicate a signal moving in a specific direction. By using the Alpha channel as configuration, all four signals can be written with the symbol `*` and the Alpha value sets te direction.

This does mean symbols can not use the full 32 bit color for data. Instead they keep 24 bits for data and 8 bits for config.
