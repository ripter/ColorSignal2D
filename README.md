# ColorSignal2D
A 2D Programming language based on colored signals. Inspired by light and physics.

Signals are data in motion! Instead of creating a variable, ColorSignal2D uses a colored moving signal. The Symbol defines the signal direction, and the color provides 24 bits of data along with 8 bits of flags. Instead of functions, the languages uses Symbols on a 2D grid. When a color signal collides with another Symbol, 

The code and data are represented on a 2D grid using a symbol (UTF-8 charecter code) and a [RGBA](https://en.wikipedia.org/wiki/RGBA_color_model) Color value. This allows the entire state of the program to be stored and loaded as text or an image. A color display can display the symbols in their color, while a text or coloreless display can render `Symbol#RGBA`.


## The Grid


A ColorSignal2D program runs on a grid of infinate size. Each token on The Grid is processed each "tick".


## A Token

A Token if the foundation of the language. It represents an item in The Grid that run code. Tokens can have two functions, a Tick and a Collide function.





# Design Decisions

## Entire State can be stored as plain text.

Not all formats support color. So it must be possible to save the entire application state in something that is supported everywhere. To do this, the application state can be imported and exported as a UTF-8 encoded text file. The first UTF-8 chaacter is the Symbol, followed by an RGBA hex code.

For example: `*#FFFFFF04` is a White (#FFFFF) colored Signal (*) moving East (04).


## The Alpha Channel

Each color is a 32 bit value made up of four 8 bit values. Red, Green, Blue, and Alpha. The first 24 bits are used to hold data in the form of an RGB color. The last 8 bits, normally used for Alpha transparancy is instead used as Flags.

Using the Alpha Channel as a symbol configuration reduces the number of unique symbols required. For example, we could use the symbols `N, S, E, W` to indicate a signal moving in a specific direction. By using the Alpha channel as configuration, all four signals can be written with the symbol `*` and the Alpha value sets the direction.

This does mean symbols can not use the full 32 bit color for data. Instead they keep 24 bits for data and 8 bits for config.

What about the far more common non-signal symbols? What will they do with the 24 bits "not for config"? Do they use it for internal state? Like a counter could use R for the starting value and B for the current value. But what about symbols like split? The color can act like a colored filter, with the config acting as config.


# Architecture

## tickCode

This performs a single tick on the code grid. It returns a new code grid. This helps to ensure that the entire program state is stored in the code grid. It also makes time travel possible since each tick is atomic.

A tick is performed in phases. In the first phase, every symbol in the grid has it's `tick` rule called. The rule returns an array of symbols and the location they should appear post tick. In the second phase collisions between symbols trying to occupy the cell are resolved. This collision resolution returns an array of symbols and locations they should appear in post tick.

None of this requires an actual grid for the logic. Empty cells are skipped, so something like a Map could be more effecent. It would be easy to convert a 2D array into a Map with the x,y as the key. The Map doesn't have a built width/height values like the 2D array. One advantage of the map is that we can loop until all conflicts have been resolved.




# Symbols

## * - Signal

## Ɨ Split Symbol

When a Signal collides with the Ɨ split symbol, the signal's color is "stored" in the split symbols's color. On tick, if the split symbol has an Alpha value, it emits two signals. One with the original Alpha value, and another with the next direction alpha value.





