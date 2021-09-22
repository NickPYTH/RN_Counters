export const removeFlat = (flatId) => {
  return {
    type: "REMOVE_FLAT",
    payload: flatId,
  };
};

export const addFlat = (flatInfo) => {
  return {
    type: "ADD_FLAT",
    payload: flatInfo,
  };
};

export const addCounterRecord = (counterInfo) => {
  return {
    type: "ADD_COUNTER_RECORD",
    payload: counterInfo,
  };
};

export const addCounter = (counterInfo) => {
  return {
    type: "ADD_COUNTER",
    payload: counterInfo,
  };
};

export const removeRecord = (record) => {
  return {
    type: "REMOVE_RECORD",
    payload: recordInfo,
  };
};

export const updateRecord = (record, value) => {
  return {
    type: "UPDATE_RECORD",
    payload: {record, value},
  };
};
