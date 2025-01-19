
const tabler = new Tabler();
const body = document.getElementsByTagName('body')[0];
function newRow(text) {
    let row = tabler.getRow();
    let cell = tabler.getCell();
    row.appendChild(cell);
    return row;
}
function showJSONTables (){
    const sprite1 = new Sprite([
        new SpriteLine(0, -150, 100, 100, '#ff0', 3),
        new SpriteLine(100, 100, -100, 100, '#ff0', 3),
        new SpriteLine(-100, 100, 0, -150, '#ff0', 3)
    ]);

    let spriteDiv = document.getElementById('spriteDiv');
    let table = tabler.getTable('Sprite JSON');
    let row = tabler.getRow();
    let cell = tabler.getCell();
    cell.innerText = JSON.stringify(hull);
    row.appendChild(cell);
    table.appendChild(row);
    spriteDiv.appendChild(table);

    const entity = new Entity(
        'sampleEntity',
        [hull, superstructure],
        { x: 0, y: 0 },
        rad(rnd(0, 360)),
        { x: 3, y: -2 }
        , rad(25), 100, 150
    );
    let entityDiv = document.getElementById('entityDiv');
    table = tabler.getTable('Entity JSON');
    row = tabler.getRow();
    cell = tabler.getCell();
    cell.innerText = JSON.stringify(entity);
    row.appendChild(cell);
    table.appendChild(row);
    spriteDiv.appendChild(table);
    const button = new Button(
        'sampleButton',
        'Look a Button!',
        30, 40, 180, 70, 1.4,
        '#700', '#aa0',
        '#00f', '#0ff',
        () => { return 'function result' }
    );
    let buttonDiv = document.getElementById('buttonDiv');
    table = tabler.getTable('Button JSON');
    row = tabler.getRow();
    cell = tabler.getCell();
    cell.innerText = JSON.stringify(button);
    row.appendChild(cell);
    table.appendChild(row);
    buttonDiv.appendChild(table);
}