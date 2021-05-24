// indexedDB: Reforzamiento

let request = window.indexedDB.open('mi-database', 2);

// se actualia cuadno se crea o se sube de version la BD
request.onupgradeneeded = event => {
    console.log('Actualización de BD');

    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    })
};

// manejo de errores
request.onerror = event => {
    console.log('DB error: ', event.target.error);
};

// insertar datos
request.onsuccess = event => {
    let db = event.target.result;

    let heroesData = [
        { id: '1111', heroe: 'Spiderman', mensaje: 'Hola Soy Spidy' },
        { id: '2222', heroe: 'Iron Man', mensaje: 'Hola Aqui Toni' },
    ];

    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log('Error guardando', event.target.error);
    };

    // Informa exito de transaccion
    heroesTransaction.oncomplete = event => {
        console.log('Transacción listo', event);
    };

    let heroesStore = heroesTransaction.objectStore('heroes');

    for (let heroe of heroesData) {
        heroesStore.add(heroe);
    }

    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregado a la BD');
    }
}