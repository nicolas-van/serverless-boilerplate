# Serverless Boilerplate

A serverless boilerplate

## Documentation

### Example object

A dictionary containing the following keys:

* `id`: The identifier of the example as an UUID.
* `value`: The value of the example.

### GET `/examples`

Returns a complete list of all the examples.

### POST `/examples`

Only takes JSON as input.

Creates a new example.

Returns the newly created example id.

### DELETE `/examples/:id`

Deletes an example.
