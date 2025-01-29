function doTest() {
    const tabler = new Tabler();
    const div = document.getElementById('testDiv');
    let array = new IArray();
    let table = tabler.getTable('Infinite Array Test');
    let row = tabler.getRow();
    let cell = tabler.getCell('set [9] ="nine"');
    div.style = 'font:1.2em monospace';

    row.appendChild(cell);
    array.set([9], 'nine');
    cell = tabler.getCell(array.get([9]));
    row.appendChild(cell);
    table.append(row);

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,4] ="pie"');
    row.appendChild(cell);
    array.set([3, 1, 4], 'pie');
    cell = tabler.getCell(array.get([3, 1, 4]));
    row.appendChild(cell);
    table.append(row);

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,1] ="311!"');
    row.appendChild(cell);
    array.set([3, 1, 1], '311!');
    cell = tabler.getCell(array.get([3, 1, 1]));
    row.appendChild(cell);
    table.append(row);

    row = tabler.getRow();
    cell = tabler.getCell('set [3,1,1] ="new value"');
    row.appendChild(cell);
    cell = tabler.getCell(array.get([3, 1, 1]));
    row.appendChild(cell);
    table.append(row);

    row = tabler.getRow();
    cell = tabler.getCell('set [1,2,3,4,5] ="12345"');
    row.appendChild(cell);
    array.set([1, 2, 3, 4, 5], '12345');
    cell = tabler.getCell(array.get([1, 2, 3, 4, 5]));
    row.appendChild(cell);
    table.append(row);

    row = tabler.getRow();
    cell = tabler.getCell('set [1,2] ="12"');
    row.appendChild(cell);
    array.set([1, 2], '12');
    cell = tabler.getCell(array.get([1, 2]));
    row.appendChild(cell);
    table.append(row);

    row = tabler.getRow();
    cell = tabler.getCell('1,2,3,4,5 should be gone"');
    row.appendChild(cell);
    cell = tabler.getCell(array.get([1, 2, 3, 4, 5]));
    row.appendChild(cell);
    table.append(row);

    row = tabler.getRow();
    cell = tabler.getCell('get[3,1]');
    row.appendChild(cell);
    cell = tabler.getCell(array.get([3, 1]));
    row.appendChild(cell);
    table.append(row);

    div.appendChild(table);

    array = new IArray();
    table = tabler.getTable('Infinite Array Test- using string as indexes..');
    ///    --------------1 -------
    row = tabler.getRow();
    cell = tabler.getCell(`set ['backpack food', 'apple'] = 'good idea.'`);
    row.appendChild(cell);
    array.set(['backpack food', 'apple'], 'good idea.');

    cell = tabler.getCell(array.get(['backpack food', 'apple']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------2 -------
    row = tabler.getRow('#000', '#ddd');
    cell = tabler.getCell(`set ['backpack food', 'orange'] = 'bring a napkin.'`);
    row.appendChild(cell);
    array.set(['backpack food', 'orange'], 'bring a napkin');

    cell = tabler.getCell(array.get(['backpack food', 'orange']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------3 -------
    row = tabler.getRow();
    cell = tabler.getCell(`get ['backpack food']`);
    row.appendChild(cell);

    cell = tabler.getCell(array.get(['backpack food']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------4 -------
    row = tabler.getRow('#000', '#ddd');
    cell = tabler.getCell(`get ['backpack food','apple']`);
    row.appendChild(cell);

    cell = tabler.getCell(array.get(['backpack food', 'apple']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------5 -------
    row = tabler.getRow();
    cell = tabler.getCell(`set['backback food','apple', 'comment']= 'easy to eat.'`);
    row.appendChild(cell);
    array.set(['backback food', 'apple', 'comment'], 'easy to eat.');
    cell = tabler.getCell(array.get(['backback food', 'apple', 'comment']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------6 -------
    row = tabler.getRow('#000', '#ddd');
    cell = tabler.getCell(`get['backback food']`);
    row.appendChild(cell);

    cell = tabler.getCell(array.get(['backback food']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------7 -------
    row = tabler.getRow();
    cell = tabler.getCell(`get['backback food','apple']`);
    row.appendChild(cell);

    cell = tabler.getCell(array.get(['backback food', 'apple']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------8 -------
    row = tabler.getRow('#000', '#ddd');
    cell = tabler.getCell(`set['backback food','orange', 'comment']= 'bring a napkin.'`);
    row.appendChild(cell);
    array.set(['backback food', 'orange', 'comment'], 'bring a napkin.');
    cell = tabler.getCell(array.get(['backback food', 'orange', 'comment']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------9 -------
    row = tabler.getRow();
    cell = tabler.getCell(`get['backback food']`);
    row.appendChild(cell);

    cell = tabler.getCell(array.get(['backback food']));
    row.appendChild(cell);
    table.append(row);
    ///    --------------10 -------
    row = tabler.getRow('#000', '#ddd');
    cell = tabler.getCell(`set['backback food','nuts', 'comment']= 'keep in smaller bag'`);
    row.appendChild(cell);
    array.set(['backback food', 'nuts', 'comment'], 'keep in smaller bag');
    cell = tabler.getCell(array.get(['backback food', 'nuts', 'comment']));
    row.appendChild(cell);
    table.append(row);
    ///    -------------11 -------
    row = tabler.getRow();
    cell = tabler.getCell(`get['backback food']`);
    row.appendChild(cell);

    cell = tabler.getCell(array.get(['backback food']));
    row.appendChild(cell);
    table.append(row);
    ///    -------------12 -------
    row = tabler.getRow('#000', '#ddd');
    cell = tabler.getCell(`get['backback food','orange','comment]`);
    row.appendChild(cell);

    cell = tabler.getCell(array.get(['backback food', 'orange', 'comment']));
    row.appendChild(cell);
    table.append(row);

    div.appendChild(table);

    //============================== simple x,y =====================
    array = new IArray();
    table = tabler.getTable('Simple x,y');

    row = tabler.getRow();
    cell = tabler.getCell(`set[0,0]= true`);
    row.appendChild(cell);
    array.set([0,0], true);
    cell = tabler.getCell(array.get([0,0]));
    row.appendChild(cell);
    table.append(row);
    
    row = tabler.getRow();
    cell = tabler.getCell(`set[1,0]= true`);
    row.appendChild(cell);
    array.set([1,0], true);
    cell = tabler.getCell(array.get([1,0]));
    row.appendChild(cell);
    table.append(row);
    
    row = tabler.getRow();
    cell = tabler.getCell(`set[0,1]= true`);
    row.appendChild(cell);
    array.set([0,1], true);
    cell = tabler.getCell(array.get([0,1]));
    row.appendChild(cell);
    table.append(row);
    
    row = tabler.getRow();
    cell = tabler.getCell(`set[1,1]= true`);
    row.appendChild(cell);
    array.set([1,1], true);
    cell = tabler.getCell(array.get([1,1]));
    row.appendChild(cell);
    table.append(row);
    div.appendChild (table);

    table = tabler.getTable ();
    row  = tabler.getRow();
    cell = tabler.getCell (array.get([0,0]));
    row.append (cell);
    cell = tabler.getCell (array.get([1,0]));
    row.append (cell);
    table.append (row);
    row  = tabler.getRow();
    cell = tabler.getCell (array.get([0,1]));
    row.append (cell);
    cell = tabler.getCell (array.get([1,1]));
    row.append (cell);
    table.append (row);
    div.append (table);

    
    /*
        row  = tabler.getRow();
        cell = tabler.getCell (`set['backback food','apple', 'comment']= 'easy to eat.'`);
        row.appendChild(cell);
        array.set(['backback food', 'apple', 'comment'], '');
        cell = tabler.getCell(array.get(['backback food', 'apple','comment']));
        row.appendChild(cell);
        table.append(row);
    
        row  = tabler.getRow();
        cell = tabler.getCell (`set['backback food','orange', 'comment']= 'bring a napkin.'`);
        row.appendChild(cell);
        array.set(['backback food', 'orange', 'comment'], 'bring a napkin.');
        cell = tabler.getCell(array.get(['backback food', 'orange','comment']));
        row.appendChild(cell);
        table.append(row);
    
        row  = tabler.getRow();
        cell = tabler.getCell (`set['backback food','nuts', 'comment']= 'keep in smaller bag'`);
        row.appendChild(cell);
        array.set(['backback food', 'nuts', 'comment'], 'keep in smaller bag');
        cell = tabler.getCell(array.get(['backback food', 'nuts','comment']));
        row.appendChild(cell);
        table.append(row);
    */

    console.log(array);
    div.appendChild(table);

}