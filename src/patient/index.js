const express = require("express");
const router = express.Router();
const data = require("../../data/clinical_metrics.json");

const {
  processPatientData,
  checkIfPatientIsInSystem,
  checkIfOrgIdIsValid,
  createPatientRecord,
  updatePatientRecord,
} = require("./utils");

router.get("/:orgId/:patientId", (req, res) => {
  const { orgId, patientId } = req.params;

  if (patientId !== data.patient_id || orgId !== data.orgId) {
    res.statusCode = 400;
    return res.json({
      error: {
        type: "NON_EXISTENT_PATIENT",
        message: "No data available for this patient.",
      },
    });
  }

  const aggregatedPatientData = processPatientData(data.clinical_data);

  return res.json({
    patientId,
    orgId,
    weight: data.clinical_data.WEIGHT,
    height: data.clinical_data.HEIGHT,
    bloodPressure: data.clinical_data.BP,
    bloodGlucoseLevels: data.clinical_data.BLOOD_GLUCOSE_LEVELS,
    steps: data.clinical_data.STEPS,
    aggregatedHeartData: aggregatedPatientData,
  });
});

router.post("/", (req, res) => {
  const { clinicalData, patientId, orgId } = req.body;
  const isOrgIdValid = checkIfOrgIdIsValid(orgId);

  if (!isOrgIdValid) {
    res.statusCode = 400;
    res.json({
      error: {
        type: "ORG_CHECK_FAILED",
        message: "OrgId is invalid/missing.",
      },
    });
  }

  // Case: when a new patient is onboarded
  if (!patientId) {
    createPatientRecord();
  }

  // Case: to check whether a patient exists or not, if exists, update the clinical data values
  const patientInfo = checkIfPatientIsInSystem(orgId, patientId);
  let updatedPatientInfo = [];

  if (patientInfo.exists) {
    updatedPatientInfo = updatePatientRecord(patientInfo, clinicalData);
  } else {
    res.statusCode = 400;
    return res.json({
      error: {
        type: "NON_EXISTENT_PATIENT",
        message: "No data available for this patient.",
      },
    });
  }

  return res.json({ data: updatedPatientInfo, patientId, orgId });
});

module.exports = router;
