# What is this?

Its a library of javascript code that does a lot of tedious stuff you don't want to have to do yourself.  It consists (so far) of the following parts:

  * **main** : This will run a main loop, once you define a function for it to run. It creates a canvas, keeps it expanded to cover the entire window, and also keeps track of what the mouse has been doing.
  
  * **sprite**: This lets you define a series of colored line segments, that it will draw on an HTML canvas.
  
  * **tattler**: This will create a read-only text area on the canvas that you can use to display information. Used for debugging.
  
  * **touchable**: You can make a portion of the canvas "touchable" and it will react if clicked or hovered.

  * **button**: Create a rectangle with centered text that, if given a "touchable" will react to mouse events.
  
  * **entity**: An object that has a location, orientation, velocity, spin, mass and a shape (a sprite). It can also contain "parts"
  
  * **parts**: A shape attached to an entity defined by both its shape (a sprite) and its offset from the origin of the entity it "belongs to".
  



