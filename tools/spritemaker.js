const spriteMaker = {
    vSym: false,
    hSym: false,
    snapSize: 1,
    points: new IArray(),

}
const setVSym = function () { spriteMaker.vSym = true; }
const setHSym = function () { spriteMaker.vSym = false; }
const unsetVSym = function () { spriteMaker.hSym = true; }
const unsetHSym = function () { spriteMaker.hSym = false; }
const setSnap1 = function () { spriteMaker.snapSize = 1; }
const setSnap2 = function () { spriteMaker.snapSize = 2; }
const setSnap5 = function () { spriteMaker.snapSize = 5; }
const setSnap10 = function () { spriteMaker.snapSize = 10; }
const setSnap25 = function () { spriteMaker.snapSize = 25; }
const setSnap50 = function () { spriteMaker.snapSize = 50; }

const engine = new Engine();
const buttonColors = new ButtonColors('#fff', '#0af', '#ff0', '#b0f');

const symButtons = [
    { name: 'VSym', text: 'Vertical Sym', actionFn: setVSym, untoggleFn: unsetVSym },
    { name: 'HSym', text: 'Horizonal Sym', actionFn: setHSym, untoggleFn: unsetHSym }
];
//TODO:  Change how radio group is assigned. Instead of specifiy a group name, just have it set to true
//if you want it to be a radio group, and have the panel's name be the group name- there is no reason to
//make the consumer care about how radio groups work, that should be handled for them.
const symPanel = new VerticalButtonPanel('symPanel', buttonColors, '#008', 10, 50, 158, 25, .8, 5);
symPanel.add(symButtons);
engine.addPanel(symPanel);

const snapPanel = new HorizontalButtonPanel('snapPanel', buttonColors, '#420', 10, 130, 30, 20, .8, 5, 'snapGroup');
//TODO:  It would ne NICE if we could use the same function, but specify what parameter to send it,
//perhaps should add an (optinal) actionFnParam property...
const snapButtons = [
    { name: 'snap1', text: '1', actionFn: setSnap1 },
    { name: 'snap2', text: '2', actionFn: setSnap2 },
    { name: 'snap5', text: '5', actionFn: setSnap5 },
    { name: 'snap10', text: '10', actionFn: setSnap10 },
    { name: 'snap25', text: '25', actionFn: setSnap25 },
    { name: 'snap50', text: '50', actionFn: setSnap50 },
];
snapPanel.add(snapButtons);
engine.addPanel(snapPanel);

//TODO:  Add an (optional) title/label to the panels.