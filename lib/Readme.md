# /lib

This folder holds **libraries** that are imported and used by the Read–eval–print loop.

## How do you know if something goes in /src or /lib?

Everything in /src is logic and code critical to ColorSignal2D. This is where you will find the main REPL function, along with the language symbols and logic.

Everything in /lib is not specific to ColorSignal2D and could probably live as an npm module.
