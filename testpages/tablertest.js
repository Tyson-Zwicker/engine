
let div0 = document.getElementById ('Test0Div');
let tabler = new Tabler();
let table = tabler.getTable ('Simple Table');
let row = tabler.getRow();
let cell1 = tabler.getCell ('1');
let cell2 = tabler.getCell ('2');
row.appendChild (cell1);
row.appendChild (cell2);
table.appendChild (row);
div0.appendChild (table);

table = tabler.getTable ('multi row simple table');
row = tabler.getRow();
cell1 = tabler.getCell ('1');
cell2 = tabler.getCell ('2');
row.appendChild (cell1);
row.appendChild (cell2);
table.appendChild (row);
row = tabler.getRow('#fff','#006');
cell1 = tabler.getCell ('one');
cell2 = tabler.getCell ('two');
row.appendChild (cell1);
row.appendChild (cell2);
table.appendChild (row);
div0.appendChild (table);

let test1data = [
    { "name": "Abby", "age": 19 },
    { "name": "Breanne", "age": 32 },
    { "name": "Cindy", "age": 6 },
    { "name": "Debby", "age": 43 },
    { "name": "Emily", "age": 25 },
    { "name": "Freya", "age": 28 }
];
let test1properties = ['name', 'age'];
let test1Div = document.getElementById('test1Div');
test1Div.appendChild(tabler.objectListToHtmlTable('Test #1', test1data, test1properties));

let test2data = [
    { "name": "Abby", "age": 19, "employer": "Paper Co.", "title": "Intern", "fulltime": false },
    { "name": "Breanne", "age": 32, "employer": "Hualing Inc.", "title": "Driver", "fulltime": true },
    { "name": "Cindy", "age": 6, "employer": "BigHill Elementary", "title": "Student", "fulltime": true },
    { "name": "Debby", "age": 43, "employer": "Goverment", "title": "IT Tech", "fulltime": true },
    { "name": "Emily", "age": 25, "employer": "NFD", "title": "Fire Fighter", "fulltime": false },
    { "name": "Freya", "age": 28, "employer": "BC EMS", "title": "EMT", "fulltime": true },
    { "name": "Gina", "age": 34, "employer": "None", "title": "Cindy's Mom", "fulltime": true },
];
let test2properties = ['name', 'age', "employer", "title", "fulltime"];
let test2Div = document.getElementById('test2Div');
test2Div.appendChild(tabler.objectListToHtmlTable("Test #2", test2data, test2properties));

let test34data = [1, 2, 4, 5, 6, 7, 8, 9];
let testDiv3 = document.getElementById('test3Div');
test3Div.appendChild(tabler.arrayToHtmlTable('Test #3', test34data));
let testDiv4 = document.getElementById('test4Div');
test4Div.appendChild(tabler.arrayToHtmlTable('Test #4', test34data, 3));

let test5data = [[1, 2, 3], ['a', 'b', 'c'], ['x', 'y', 'z']];
let testDiv5 = document.getElementById('test5Div');
test5Div.appendChild(tabler.arrayToHtmlTable('Test #5', test5data));

let test6data = [
    { 'field1': 2, "field2": [1, 2, 3, 5, 7, 11, 13, 17], "field3": "hello" },
    { 'field1': 9, "field2": [2, 4, 6, 8, 9, 10, 12, 14], "field3": "world" },
    { 'field1': 5, "field2": [1, 2, 3, 4, 5, 6, 7, 8], "field3": "" }
];
let test6Div = document.getElementById('test6Div');
test6Div.appendChild (
    tabler.ObjectListWithInnerArrayToHtmlTable('Test #6',test6data,['field1','field2','field3'])
);

let test7data = [
    { "name": "Abby", "age": 19, "children": ['Alex'], "biodata": { 'w': '115', 'h': '176', 'eyes': 'brown', 'hair': 'brown' } },
    { "name": "Breanne", "age": 32, 'children': ['Bart', 'Caleb', 'Meranda'], "biodata": { 'w': '155', 'h': '151', 'eyes': 'blue', 'hair': 'brown' } },
    { "name": "Cindy", "age": 6, 'children': [], "biodata": { 'w': '39', 'h': '61', 'eyes': 'brown', 'hair': 'brown' } },
    { "name": "Debby", "age": 43, 'children': ['Nancy', 'Karen'], "biodata": { 'w': '215', 'h': '186', 'eyes': 'brown', 'hair': 'brown' } },
    { "name": "Emily", "age": 25, 'children': [], "biodata": { 'w': '126', 'h': '163', 'eyes': 'brown', 'hair': 'brown' } },
    { "name": "Freya", "age": 28, 'children': ['Cindy'], "biodata": { 'w': '215', 'h': '226', 'eyes': 'blue', 'hair': 'white' } }
];
let innerObjectMap = new Map();
innerObjectMap.set('biodata', ['w', 'h', 'eyes', 'hair']);
let test7Div = document.getElementById('test7Div');
let table7 = tabler.ComplexObjectListToHtmlTable(
    'Test #7',
    test7data,
    ['name', 'age', 'children', 'biodata'],
    innerObjectMap);
test7Div.appendChild(table7);
