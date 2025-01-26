
const engine = new Engine();
const buttonColors = new ButtonColors('#00f', '#0ff', '#f00', '#ff0');
const buttonColors2 = new ButtonColors('#fff', '#0af', '#ff0', '#b0f');
const tattler = new Tattler('1em monospace', 10, 300);
engine.addTattler(1, 6, 250);

const buttonDefs = [
    { name: 'button1', text: 'One', actionFn: buttonAction1 },
    { name: 'button2', text: 'Two', actionFn: buttonAction2 },
    { name: 'button3', text: 'Three', actionFn: buttonAction3 },
    { name: 'button4', text: 'Four', actionFn: buttonAction4 }];
const vpanel = new VerticalButtonPanel(
    'panel1',
    buttonColors, '#040',
    10, 50, 100,
    25, 1, 5, 'group1');
vpanel.add(buttonDefs);
const buttonDefs2 = [
    { name: 'button5', text: '5', actionFn: buttonAction5 },
    { name: 'button6', text: '6', actionFn: buttonAction6 },
    { name: 'button7', text: '7', actionFn: buttonAction7 },
    { name: 'button8', text: '8', actionFn: buttonAction8, untoggleFn: untoggleAction8 }];
//name, colors, x, y, height, buttonWidth, fontSize, outerBorder, radioGroup
const hpanel = new HorizontalButtonPanel(
    'panel2',
    buttonColors, '#040',
    150, 5, 30,
    50, 1, 5);

hpanel.add(buttonDefs2);
engine.addPanel(hpanel);
engine.addPanel(vpanel);

engine.addButton('button9', 'Remove me.',
    200, 100, 350, 120,
    1, buttonColors2, buttonAction9);
engine.addButton('button10', 'Remove Vertical',
    360, 100, 510, 120,
    1, buttonColors2, buttonAction10);
engine.addButton('button11', 'Remove Horizontal.',
    200, 130, 350, 150,
    1, buttonColors2, buttonAction11);
engine.addButton('button12', 'Add Vertical',
    360, 130, 510, 150,
    1, buttonColors2, buttonAction12);

engine.addButton('button13', 'Add Horizontal',
    275, 160, 435, 180,
    1, buttonColors2, buttonAction13);
