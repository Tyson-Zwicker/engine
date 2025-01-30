const spriteMaker = {
    vSym: false,
    hSym: false,
    snapSize: 1,
    points: [],
    action: 'add' //valid values are 'add' and 'remove'
}
const setVSym = function () { spriteMaker.vSym = true; }
const setHSym = function () { spriteMaker.vSym = false; }
const unsetVSym = function () { spriteMaker.hSym = true; }
const unsetHSym = function () { spriteMaker.hSym = false; }
const setSnap = function (param) { spriteMaker.snapSize = param; }
const setActionAdd = function (){ spriteMaker.action ='add'}
const setActionRemoveLast = function (){
    spriteMaker.points.pop();
}
const setActionRemoveFirst = function (){
    spriteMaker.points.splice(0,1);
}
const setActionClearAll = function (){
    spriteMaker.points = [];
}
const engine = new Engine();
const buttonColors = new ButtonColors('#fff', '#0af', '#ff0', '#b0f');

const symButtons = [
    { name: 'VSym', text: 'Vertical Sym', actionFn: setVSym, untoggleFn: unsetVSym },
    { name: 'HSym', text: 'Horizonal Sym', actionFn: setHSym, untoggleFn: unsetHSym }
];

const symPanel = new VerticalButtonPanel('symPanel', buttonColors, '#008', 10, 50, 158, 25, .8, 5);
symPanel.add(symButtons);
engine.addPanel(symPanel);

const snapLevelPanel = new HorizontalButtonPanel('snapPanel', buttonColors, '#420', 10, 130, 30, 20, .8, 5, true);
const snapLevelButtons = [
    { name: 'snap1', text: '1', actionFn: setSnap, actionParam:1 },
    { name: 'snap2', text: '2', actionFn: setSnap, actionParam:2 },
    { name: 'snap5', text: '5', actionFn: setSnap, actionParam:5 },
    { name: 'snap10', text: '10', actionFn: setSnap, actionParam:10 },
    { name: 'snap25', text: '25', actionFn: setSnap, actionParam:25 },
    { name: 'snap50', text: '50', actionFn: setSnap, actionParam:50 },
];
snapLevelPanel.add(snapLevelButtons);
engine.addPanel(snapLevelPanel);

const actionPanel = new VerticalButtonPanel('actionPanel', buttonColors, '#008',10,175,158,25,.8,5,true);
const actionButtons = [
    { name: 'addpoint', text: 'Add', actionFn: setActionAdd },
    { name: 'rmlast', text: 'Remove Last', actionFn: setActionRemoveLast },
    { name: 'rmfirst', text: 'Remove First', actionFn: setActionRemoveFirst },
    { name: 'clear', text: 'Clear All', actionFn: setActionClearAll },
]
actionPanel.add (actionButtons);
engine.addPanel (actionPanel);
