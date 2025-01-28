function buttonAction(param) {
    engine.tellTattleGrouped('button', param, '#fff')
}
function untoggleAction8() {
    engine.tellTattleGrouped('button', 'Untoggled 8', '#f0f');
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
