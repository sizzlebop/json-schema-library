#!/usr/bin/env node

const fs = require('fs');
const jsl = require('../dist/jsonSchemaLibrary');
const compileSchema = jsl.compileSchema;

if (process.argv.length < 4) {
    console.error('Usage: json-schema-library <schema.json> <data.json>');
    process.exit(1);
}

const schemaPath = process.argv[2];
const dataPath = process.argv[3];
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const node = compileSchema(schema);
const { valid, errors } = node.validate(data);

if (valid) {
    console.log('Valid!');
    process.exit(0);
} else {
    console.error('Invalid:');
    console.error(JSON.stringify(errors, null, 2));
    process.exit(2);
}
