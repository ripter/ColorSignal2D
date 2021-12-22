# ColorSignal2D
A 2D Programming language based on colored signals.

Signals are data in motion! In a human language you write a line that assigns data to a variable. Then you pass that variable to a function. In ColorSignals2D you add moving signals and direct them to hit the function you want. Instead of passing a variable, you collide the data in.


The code and data are represented on a 2D grid using a symbol (UTF-8 charecter code) and a [RGBA](https://en.wikipedia.org/wiki/RGBA_color_model) Color value. This allows the entire state of the program to be stored and loaded as text. A color display can display the symbols in their color, while a text or coloreless display can render `Symbol#RGBA`.




# Design Decisions

## Entire State can be stored as plain text.

Not all formats support color. So it must be possible to save the entire application state in something that is supported everywhere. To do this, the application state can be imported and exported as a plain text file. Symbols remain unchanged, while the color is turned into a hex code appended to te symbol.

For example: `*#FFFFFF04` is a White colored Signal moving East.


## The Alpha Channel

Each color is a 32 bit value made up of four 8 bit values. Red, Green, Blue, and Alpha. The first 24 bits are used to hold data in the form of an RGB color. The last 8 bits, normally used for Alpha transparancy is used configuration for the Symbol. 

Using the Alpha Channel as a symbol configuration reduces the number of unique symbols required. For example, we could use the symbols `N, S, E, W` to indicate a signal moving in a specific direction. By using the Alpha channel as configuration, all four signals can be written with the symbol `*` and the Alpha value sets the direction.

This does mean symbols can not use the full 32 bit color for data. Instead they keep 24 bits for data and 8 bits for config.

What about the far more common non-signal symbols? What will they do with the 24 bits "not for config"? Do they use it for internal state? Like a counter could use R for the starting value and B for the current value. But what about symbols like split? The color can act like a colored filter, with the config acting as config.

### Ɨ Split Symbol

When a Signal collides with the Ɨ split symbol, the signal's color is "stored" in the split symbols's color. On tick, if the split symbol has an Alpha value, it emits two signals. One with the original Alpha value, and another with the next direction alpha value.


## Order of Operations.

In theory, every cell in the grid updates at the same time. This means a south moving signal above an east or west moving signal will not collide. The horizontal travling signal will move out of the way at the same time the South signal moves into it's old position.

