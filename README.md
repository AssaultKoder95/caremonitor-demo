## Care Monitor Demo

Code demo for [Care Monitor Task](https://caremonitor.clickup.com/docs/6920800/p/h/6k6k0-4232/7c4ba0ef6019ab8)

### Installation

Simply run `npm install` or `yarn install` in the root directory to download all the dependecies.

### Running the project

To start the project, simply run this command `npm start`.
In case you wish to start it in watch mode, run this command `npm run watch`.

### Current Implementation

Currently we are picking data from `clinical_data.json` file and using it to feed our API endpoints.
There are two endpoints -

1. GET /patients/:orgId/:patientId
2. POST /patients

The POST endpoint contains pseudo code whereas GET endpoint is fully functional ( refer demo below ).

### Demo
https://user-images.githubusercontent.com/6575313/225773201-5ef067c5-2bfd-4aa4-9a2e-f5ec74644632.mov

### Postman Collection
[CodeMonitor Demo.postman_collection.txt](https://github.com/AssaultKoder95/caremonitor-demo/files/10996533/CodeMonitor.Demo.postman_collection.txt)

**Note: Please rename the file extension to `.json` from `.txt` before using it. Github doesn't allow uploading JSON files.**

### Future Tasks

1. Add validations for POST endpoint
2. Add Test Suite
3. Add Database Integration
