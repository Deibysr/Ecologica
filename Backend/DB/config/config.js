import knex from "knex"


function createUserTable(knex) {
    return knex.schema.createTable('Deiby', function (table) {
        table.increments('id').primary();
        table.string('Name');
        table.string('Email').unique();
        table.integer('Age');
        table.boolean('IsAdmin');
        table.string('Password');
        // Agrega cualquier otra columna necesaria
    });
};



export const db = knex(
    {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: "../packsage-lockf.db",
        },
    });

// createUserTable(db)