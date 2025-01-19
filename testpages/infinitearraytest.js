function doTest() {
    let array = new InfiniteArray();
    const div = document.getElementById('testDiv');
    div.style = 'font:1em monospace';
    const tabler = new Tabler();
    const table = tabler.getTable('Infinite Array Test');

    row = tabler.getRow();
    cell = tabler.getCell('set [1] =a');
    row.appendChild(cell);
    cell = tabler
    array.set([1], 'a');
    cell = tabler.getCell(array.get[1]);
    row.appendChild(cell);
    table.append (row);

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,4] =b');
    row.appendChild(cell);
    cell = tabler
    array.set([3, 1, 4], 'b');
    cell = tabler.getCell(array.get[3, 1, 4]);
    row.appendChild(cell);
    table.append (row);

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,1] =c');
    row.appendChild(cell);
    cell = tabler
    array.set([3,1,1], 'c');
    cell = tabler.getCell(array.get[3, 1, 1]);
    row.appendChild(cell);
    table.append (row);

    row = tabler.getRow();
    cell = tabler.getCell('overwrite [1,1] =d');
    row.appendChild(cell);
    cell = tabler
    array.set([1,1], 'd');
    cell = tabler.getCell(array.get[1, 1]);
    row.appendChild(cell);
    table.append (row);

    row = tabler.getRow();
    cell = tabler.getCell('overwrite [1,2] =e');
    row.appendChild(cell);
    cell = tabler
    array.set([1,2], 'e');
    cell = tabler.getCell(array.get[1, 1]);
    row.appendChild(cell);
    table.append (row);

}