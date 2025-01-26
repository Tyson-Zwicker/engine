function buttonAction1() {
    engine.tellTattleGrouped('button', '1', '#fff')
}
function buttonAction2() {
    engine.tellTattleGrouped('button', '2', '#fff');
}
function buttonAction3() {
    engine.tellTattleGrouped('button', '3', '#fff');
}
function buttonAction4() {
    engine.tellTattleGrouped('button', '4', '#fff');
}
function buttonAction5() {
    engine.tellTattleGrouped('button', '5', '#fff');
}
function buttonAction6() {
    engine.tellTattleGrouped('button', '6', '#fff');
}
function buttonAction7() {
    engine.tellTattleGrouped('button', '7', '#fff');
}
function buttonAction8() {
    engine.tellTattleGrouped('button', '8', '#fff');
}
function untoggleAction8() {
    engine.tellTattleGrouped('button', 'NOT 8!', '#fff');
}
function buttonAction9() { //remove self
    engine.removeButton('button9');
}
function buttonAction10() { //remove vert
    engine.removePanel('panel1');
}
function buttonAction11() { //remove horz
    engine.removePanel('panel2');
}
function buttonAction12() { //add vert
    engine.addPanel(vpanel);
}
function buttonAction13() { //add horz
    engine.addPanel(hpanel);
}
