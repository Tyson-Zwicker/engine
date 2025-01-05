# What is this?

Its a library of javascript code that does a lot of tedious stuff you don't want to have to do yourself.  It consists (so far) of the following parts:

  * **maths** : boring math stuff like vectors and points and which way things are relative to which way other things are pointing and how far things are from each other and if a thing is inside another thing.  Math stuff.  Also the trig functions because I don't like having to type "Math." infront of everything.
  
  * **main** : This will run a main loop, once you define a function for it to run. It creates a canvas, keeps it expanded to cover the entire window, and also keeps track of what the mouse has been doing.
  
  * **sprite**: This lets you define a series of colored line segments, that it will draw on an HTML canvas.
  
  * **touchable**: You can make a portion of the canvas "touchable" and it will react if clicked or hovered.

  * **button**: Create a rectangle with centered text that, if given a "touchable" will react to mouse events.
  
  * **entity**: An object that has a location, orientation, velocity, spin, mass and a shape (a sprite). It can also contain "parts"
  
  * **parts**: A shape attached to an entity defined by both its shape (a sprite) and its offset from the origin of the entity it "belongs to".
  
  * **tabbler**:  This doesn't work with the canvas, but it will make an HTML table out of a javascript object, or an array, and it can handle objects that contain arrays and/or other objects.  Used for debugging.

  * **tattler**: This will create a read-only text area on the canvas that you can use to display information. Used for debugging.
  
 **"tag"** Next thing to be added: It will just be a convient to use text box with formatting options.  May end up replacing "button". The idea is to be able to attach them to an entity and have them move around when the entity gets next to the edge of the window, so they're always visible, and centered.  Kind of like "tabbler" but not HTML and made to show on the canvas.. with pretty colors and fonts and stuff.

