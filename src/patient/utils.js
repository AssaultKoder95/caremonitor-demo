const FIFTEEN_MINS_TIMESLOT_IN_MS = 15 * 60 * 1000;

function processPatientData(data) {
  const heartData = data?.HEART_RATE?.data;
  const processedData = [];
  let recordsInInterval = [];
  let baseTimestamp = new Date("2020-10-06T06:45:00.000000Z").getTime();

  for (let i = 0; i < heartData.length; i++) {
    const record = heartData[i];
    const recordTimestamp = new Date(record?.on_date).getTime();
    if (recordTimestamp <= baseTimestamp + FIFTEEN_MINS_TIMESLOT_IN_MS) {
      recordsInInterval.push(record);
    } else {
      const analysedRecords = analyseRecords(recordsInInterval, baseTimestamp);
      processedData.push(analysedRecords);

      baseTimestamp = baseTimestamp + FIFTEEN_MINS_TIMESLOT_IN_MS;
      recordsInInterval = [];
      --i;
      continue;
    }
  }

  return processedData;
}

function analyseRecords(records, timestamp) {
  let low = Infinity,
    high = -Infinity;

  const fromDate = new Date(timestamp).toISOString();
  const toDate = new Date(
    timestamp + FIFTEEN_MINS_TIMESLOT_IN_MS
  ).toISOString();

  records.forEach(({ measurement }) => {
    const value = parseInt(measurement, 10);

    if (low > value) {
      low = value;
    }

    if (high < value) {
      high = value;
    }
  });

  return {
    from_date: fromDate,
    to_date: toDate,
    measurement: {
      low,
      high,
    },
  };
}

function checkIfPatientIsInSystem(orgId, patientId) {
  // Check inside database whether patient exists or not
  return { exists: true };
}

function checkIfOrgIdIsValid(orgId) {
  // Check inside database whether organisation id is valid or not
  return true;
}

function createPatientRecord(orgId, clinicalData) {
  // Creates a new patient into the system and adds the clinical data to that user
}

function updatePatientRecord(patientInfo, clinicalData) {
  // Update inside database merging the current patient info and the clinical data provided in API
}

module.exports = {
  processPatientData,
  checkIfPatientIsInSystem,
  checkIfOrgIdIsValid,
  createPatientRecord,
  updatePatientRecord,
};
