function buttonAction1() {
    tattler.tellGroup(
        new Tale('Button', '1')
    )
};
function buttonAction2() {
    tattler.tellGroup(
        new Tale('Button', '2')
    )
};
function buttonAction3() {
    tattler.tellGroup(
        new Tale('Button', '3')
    )
};
function buttonAction4() {
    tattler.tellGroup(
        new Tale('Button', '4')
    )
};
function buttonAction5() {
    tattler.tellGroup(
        new Tale('Button', '5')
    )
};
function buttonAction6() {
    tattler.tellGroup(
        new Tale('Button', '6')
    )
};
function buttonAction7() {
    tattler.tellGroup(
        new Tale('Button', '7')
    )
};
function buttonAction8() {
    tattler.tellGroup(
        new Tale('Button', '8')
    )
};
function buttonAction9() { //remove self
    engine.removeButton (button9);
}
function buttonAction10() { //remove vert
    engine.removePanel ('panel1');
}
function buttonAction11() { //remove horz
    engine.removePanel ('panel2');
}
function buttonAction12() { //add vert
    engine.addPanel (vpanel);
}
function buttonAction13() { //add horz
    engine.addPanel (hpanel);s
}
