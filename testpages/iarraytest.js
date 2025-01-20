function doTest() {
    let array = new IArray();
    /*
        let coords = [9,8];
        console.log (`setting ${coords} to "nine at eight"`);
        array.set ([9,8],'nine at eight');
    
        console.log (`getting ${coords}..`);
        let val = array.get([9,8]);
        console.log (`got:`);
        console.log(val);
        console.log ();
        console.log('test 1 complete');
        console.log();
    */

    const div = document.getElementById('testDiv');
    div.style = 'font:1em monospace';
    const tabler = new Tabler();
    const table = tabler.getTable('Infinite Array Test');

    row = tabler.getRow();
    cell = tabler.getCell('set [9] ="nine"');
    row.appendChild(cell);
    array.set([9], 'nine');
    cell = tabler.getCell(array.get([9]));
    row.appendChild(cell);
    table.append(row);
    console.log('test 1 completed');
    console.log();

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,4] ="pie"');
    row.appendChild(cell);
    array.set([3, 1, 4], 'pie');
    cell = tabler.getCell(array.get([3, 1, 4]));
    row.appendChild(cell);
    table.append(row);
    console.log('test 3 completed');
    console.log();

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,1] ="311!"');
    row.appendChild(cell);
    array.set([3, 1, 1], '311!');
    cell = tabler.getCell(array.get([3, 1, 1]));
    row.appendChild(cell);
    table.append(row);
    console.log('test 3 complete');
    console.log();

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,1] ="new value"');
    row.appendChild(cell);
    cell = tabler.getCell(array.get([3, 1, 1]));
    row.appendChild(cell);
    table.append(row);
    console.log('test 4');
    console.log();

    row = tabler.getRow();
    cell = tabler.getCell('set [1,2,3,4,5] ="12345"');
    row.appendChild(cell);
    array.set([1, 2, 3, 4, 5], '12345');
    cell = tabler.getCell(array.get([1, 2, 3, 4, 5]));
    row.appendChild(cell);
    table.append(row);
    console.log('test 5');
    console.log();

    row = tabler.getRow();
    cell = tabler.getCell('set [1,5] ="12"');
    row.appendChild(cell);
    array.set([1, 2], '12');
    cell = tabler.getCell(array.get([1, 2]));
    row.appendChild(cell);
    table.append(row);
    console.log('test 6');
    console.log();

    row = tabler.getRow();
    cell = tabler.getCell('1,2,3,4,5 should be gone"');
    row.appendChild(cell);    
    cell = tabler.getCell(array.get([1,2,3,4,5]));
    row.appendChild(cell);
    table.append(row);
    console.log('test 7');
    console.log();

    div.appendChild(table);

    console.log(array);
}