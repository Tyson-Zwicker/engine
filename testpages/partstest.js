        //name, sprites, position, angle, velocity, spin, mass
        const entity1 = new Entity(
            'Test1',
            [hull, superstructure],
            { x: 1500, y: 2500 },
            rad(45),
            { x: -50, y: -50 }
            , rad(10), 100, 150
        );
        const entity2 = new Entity(
            'Test2',
            [hull, superstructure],
            { x: -1600, y: -3100 },
            rad(325),
            { x: 20, y: 20 }
            , rad(10), 100, 150
        );

        const entity3 = new Entity(
            'Test3',
            [hull, superstructure],
            { x: 0, y: 0 },
            rad(rnd(0, 360)),
            { x: 3, y: -2 }
            , rad(25), 100, 150
        );

        /* THE CLONING THING IS BECAUSE THE PART AND THE ENTITY ARE BONDED, IF YOU 
         REUSE THE SAME PART ALL THE ENTITIES POINT TO THE SAME ONE, AND THE PART THINKS
         IT'S OWNER IS WHO EVER IT WAS _LAST_ ATTACHED TO! CLONING MAKES THEM INDEPENDENT
         INSTANCES OF THE THING BEING CLONED.*/
        const turret1 = new Part('turret1', turret, { 'x': 0, 'y': -100 }, 0);
        const turret2 = new Part('turret2', turret, { 'x': 0, 'y': 100 }, rad(180));

        entity1.addPart(turret1.clone());
        entity1.addPart(turret2.clone());
        entity2.addPart(turret1.clone());
        entity2.addPart(turret2.clone());
        entity3.addPart(turret1.clone());
        entity3.addPart(turret2.clone());