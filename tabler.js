//Makes things into lists (see: "tabler manual.txt")
const Tabler = function () {
}
//innerObjectMap:
//If you find one of the properties is a object I SHOULD also contain it.  The property name
//will be the Key and the Value is the list of properties you should show of that object.
Tabler.prototype.ComplexObjectListToHtmlTable = function (title, objects, properties, innerObjectMap) {
    let tableElement = this.getTable(title);
    let rowElement = this.getRow();
    properties.forEach(propertyName => {
        let dataElement = this.getCell(true, true, true);
        dataElement.innerText = propertyName;
        rowElement.appendChild(dataElement);
    });
    tableElement.appendChild(rowElement);
    objects.forEach(object => {
        let rowElement = this.getRow();
        properties.forEach(property => {
            let dataElement = this.getCell();
            if (Array.isArray(object[property])) {
                //Its an array..            
                dataElement.appendChild(this.arrayToHtmlTable(undefined, object[property]));
            } else if (
                typeof object[property] == 'string' ||
                typeof object[property] == 'number' ||
                typeof object[property] == 'boolean') {
                let value = object[property];
                dataElement.innerText = value;
            } else if (typeof object[property] == 'object') {
                //It's an object..
                //so it SHOULD be a key in here..
                let innerTablePropertyList = innerObjectMap.get(property);
                if (!innerTablePropertyList) throw new Error('property missing corresponding innerObjectMap entry.');
                let innerTable = this.objectListToHtmlTable('', [object[property]], innerTablePropertyList);
                let innerTableElement = innerTable;
                dataElement = this.getCell();
                dataElement.appendChild(innerTableElement);
            } else {
                //Its indecipherable.
                dataElement.innerText = 'unknown?';
            }
            //Add it to the outer table row..
            rowElement.appendChild(dataElement);
        });
        tableElement.appendChild(rowElement);
    });
    return tableElement;
}



//If one of the properties is an array.
Tabler.prototype.ObjectListWithInnerArrayToHtmlTable = function (title, objectList, propertyNames) {
    let table = this.getTable(title);
    let rowElement = this.getRow();
    propertyNames.forEach(property => {
        let dataElement = this.getCell(true, true, true);
        dataElement.innerText = property;
        rowElement.appendChild(dataElement);
    });
    table.appendChild(rowElement);
    
    objectList.forEach(row => {
        let rowElement = this.getRow();
        propertyNames.forEach(property => {
            if (Array.isArray(row[property])) {
                dataElement = this.getCell();
                dataElement.appendChild(this.arrayToHtmlTable(null, row[property]));
                rowElement.appendChild(dataElement);
            } else {
                dataElement = this.getCell();
                dataElement.innerText = row[property];
                rowElement.appendChild(dataElement);
            };
        });
        table.append(rowElement);
    });
    return table;
}
//"columns" if defined, will treat the array as 1 dimensional and 
//break up the table into a grid with specified # of columns.
//two dimensional arrays will automatically by shown in row & column
Tabler.prototype.arrayToHtmlTable = function (title, array, columns, horizontal) {
    let table = this.getTable(title);
    if (!Array.isArray[array[0]] && columns) {
        //one dimensional AND wants to be split into rows..
        let rowElement = this.getRow();
        let column = 0;
        for (let i = 0; i < array.length; i++) {
            if (column === columns) {
                table.appendChild(rowElement);
                rowElement = this.getRow();
                column = 0;
            }
            let dataElement = this.getCell();
            dataElement.innerText = array[i];
            rowElement.appendChild(dataElement);
            column++;
        }
        if (column > 0) {
            table.appendChild(rowElement);
        }
        return table;
    } else {
        if (!Array.isArray[array[0]]) {
            //Simple 1 dimension..
            let rowElement = this.getRow();
            for (let i = 0; i < array.length; i++) {
                let dataElement = this.getCell();
                dataElement.innerText = array[i];
                rowElement.appendChild(dataElement);
                table.appendChild(rowElement);
                rowElement = this.getRow();
            }
        } else {
            //2 dimensional..
            for (let i = 0; i < array.length; i++) {
                let rowElement = this.getRow();
                for (let j = 0; j < array[i].length; j++) {
                    let dataElement = this.getCell();
                    dataElement.innerText = array[i];
                    rowElement.appendChild(dataElement);
                }
                table.appendChild(row);
            }

        }
        return table;
    }
    throw Error('Cannot draw more than two dimensions');
}

Tabler.prototype.objectListToHtmlTable = function (title, objectList, propertyNames) {
    let table = this.getTable(title);
    let rowElement = this.getRow();
    propertyNames.forEach(property => {
        let dataElement = this.getCell(true, true, true)
        dataElement.innerText = property;
        rowElement.appendChild(dataElement);
    });
    table.appendChild(rowElement);
    objectList.forEach(row => {
        let rowElement = this.getRow();
        propertyNames.forEach(property => {
            dataElement = this.getCell();
            dataElement.innerText = row[property];
            rowElement.appendChild(dataElement);
        });
        table.append(rowElement);
    });
    return table;
}

Tabler.prototype.getTable = function (title) {
    let table = document.createElement('table');
    table.style.border = '2px solid black';
    table.style.borderCollapse = 'collapse';
    if (title) {
        caption = document.createElement('caption');
        caption.style = 'font-weight:bold';
        caption.innerText = title;
        table.appendChild(caption);
    }
    return table;
};
Tabler.prototype.getRow = function (textColor, bgColor) {
    let rowElement = document.createElement('tr');

    if (textColor) {
        rowElement.style.color = textColor;
    }
    if (bgColor) {
        rowElement.style.backgroundColor = bgColor;
    }
    return rowElement;
}
Tabler.prototype.getCell = function (text, bold, centered, borderSolid, textColor, bgColor) {
    let dataElement = document.createElement('td');
    if (bold) dataElement.style.fontWeight = 'bold';
    if (centered) dataElement.style.textAlign = 'center';
    if (borderSolid) {
        dataElement.style.border = '1px solid black';
    } else {
        dataElement.style.border = '1px dotted black';
    }
    if (text) dataElement.innerText = text;
    if (textColor) {
        dataElement.style.color = textColor;
    }
    if (bgColor) {
        dataElement.style.backgroundColor = bgColor;
    }
    return dataElement;
}